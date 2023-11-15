import { PredictionResult } from '@/actions/actions';
import { GetPredicationsParams } from '@/lib/replicate';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const Status = {
  loading: 'loading',
  error: 'error',
  unset: 'unset',
} as const;

type Status = (typeof Status)[keyof typeof Status];

export const useReplicate = () => {
  const [status, setStatus] = useState<Status>(Status.unset);
  const [error, setError] = useState<Error | null>(null);
  const [predictions, setPredictions] = useState<PredictionResult[] | null>([]);
  const prediction = predictions?.[predictions.length - 1];
  const previousPrediction = predictions?.[predictions.length - 2];
  const predictionOutput = prediction?.output?.[0];

  const fetchPredictions = useCallback(async (data: GetPredicationsParams) => {
    try {
      const response = await fetch('/api/predictions', {
        method: 'POST',
        body: JSON.stringify(data),
        cache: 'no-store',
      });

      const _prediction = (await response.json()) as PredictionResult;
      if (![200, 201].includes(response.status)) {
        throw new Error('Error fetching prediction');
      }
      setPredictions((prev) => (prev ? [...prev, _prediction] : [_prediction]));
      return _prediction;
    } catch (e: unknown) {
      throw e;
    }
  }, []);

  const fetchPredictionId = useCallback(async (id: string) => {
    try {
      const response = await fetch('/api/predictions/' + id, {
        cache: 'no-store',
      });
      const _prediction = (await response.json()) as PredictionResult;
      if (![200, 201].includes(response.status)) {
        throw new Error('Error fetching prediction');
      }
      setPredictions((prev) => (prev ? [...prev, _prediction] : [_prediction]));
      return _prediction;
    } catch (e: unknown) {
      throw e;
    }
  }, []);

  const handleSubmit = useCallback(
    async (data: GetPredicationsParams) => {
      try {
        setStatus(Status.loading);
        const _prediction = await fetchPredictions(data);
        if (!_prediction) {
          setStatus(Status.unset);
          return;
        }

        const { status, id } = _prediction;
        const shouldPoll = status !== 'succeeded' && status !== 'failed';

        while (shouldPoll) {
          await sleep(7000);
          const res = await fetchPredictionId(id);
          if (res.status === 'succeeded' || res.status === 'failed') {
            break;
          }
        }

        setStatus(Status.unset);
      } catch (error) {
        toast.error('Error fetching prediction');
        setStatus(Status.error);
      }
    },
    [fetchPredictionId, fetchPredictions]
  );

  const reset = useCallback(() => {
    setPredictions([]);
    setError(null);
    setStatus(Status.unset);
  }, []);

  return useMemo(
    () => ({
      prediction,
      predictionOutput,
      previousPrediction,
      handleSubmit,
      status,
      error,
      reset,
    }),
    [
      prediction,
      predictionOutput,
      previousPrediction,
      handleSubmit,
      status,
      error,
      reset,
    ]
  );
};

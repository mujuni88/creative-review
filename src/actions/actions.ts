'use server';

import { addBackgroundToPNG } from '@/lib/utils';

export type PredictionResult = {
  completed_at: string;
  created_at: string;
  error: null | string;
  id: string;
  input: {
    mask: string;
    image: string;
    prompt: string;
    num_outputs: number;
    guidance_scale: number;
    prompt_strength: number;
    num_inference_steps: number;
  };
  logs: string;
  metrics: {
    predict_time: number;
  };
  output: string[];
  started_at: string;
  status: string;
  urls: {
    get: string;
    cancel: string;
  };
  version: string;
};

// write type for output
export type GetImageParams = {
  prompt: string;
  mask: string;
  image: string;
  width?: number;
  height?: number;
};
export async function getImage(
  prevState: Partial<PredictionResult>,
  data: FormData
) {
  if (prevState.id) {
    return prevState;
  }

  const prompt = data.get('prompt') as string;
  const image = data.get('image') as string;
  const _mask = data.get('mask') as string;
  const mask = addBackgroundToPNG(_mask);

  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version:
        'c11bac58203367db93a3c552bd49a25a5418458ddffb7e90dae55780765e26d6',
      input: {
        mask,
        image,
        width: 512,
        height: 512,
        prompt,
        scheduler: 'DPMSolverMultistep',
        num_outputs: 1,
        guidance_scale: 7.5,
        num_inference_steps: 25,
      },
    }),
  });

  if (response.status !== 201) {
    let error = await response.json();
    return { error } as PredictionResult;
  }

  const prediction = await response.json();
  console.log(prediction);

  return prediction as PredictionResult;
}

export async function pollPredictionResult(queryId: string, data: FormData) {
  const response = await fetch(
    'https://api.replicate.com/v1/predictions/' + queryId,
    {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );
  if (response.status !== 200) {
    let error = await response.json();
    console.error(error);
    return { error } as PredictionResult;
  }

  const prediction = await response.json();

  console.log(prediction);

  return prediction as PredictionResult;
}

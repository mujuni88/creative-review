'use client';
import {
  PredictionResult,
  getImage,
  pollPredictionResult,
} from '@/actions/actions';
import { Canvas } from '@/components/canvas';
import { Dropzone } from '@/components/dropzone';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Skeleton,
} from '@nextui-org/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

export default function Home() {
  const [state, formAction] = useFormState(getImage, {});
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [maskImage, setMaskImage] = useState<string | null>(null);
  const [userUploadedImage, setUserUploadedImage] = useState<string | null>(
    null
  );

  const result = predictions[predictions.length - 1];
  const error = result?.error ?? 'Error fetching results';

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (!state?.id) return;

    intervalId = setInterval(() => {
      if (!state?.id) return;

      pollPredictionResult(state.id, new FormData()).then((result) => {
        setPredictions((prev) => [...prev, result]);
      });
    }, 7000);

    if (result?.status === 'succeeded' || result?.status === 'failed') {
      clearInterval(intervalId);
    }

    () => clearInterval(intervalId);
  }, [result?.status, state?.id]);

  const startOver = () => {
    setPredictions([]);
    setUserUploadedImage(null);
    setMaskImage(null);
  };

  return (
    <main className='grid grid-cols-2 gap-4 bg-slate-300'>
      <div className='grid place-content-center bg-slate-100'>
        <Card className=''>
          <CardBody className='min-h-[512px] min-w-[512px] overflow-visible bg-gray-100'>
            <Canvas uploadedImage={userUploadedImage} onDraw={setMaskImage} />
            {!userUploadedImage ? (
              <Dropzone
                onDrop={setUserUploadedImage}
                className='absolute inset-0 grid h-full w-full place-content-center text-gray-500'
              />
            ) : null}
          </CardBody>
          <CardFooter className='grid'>
            <form className='grid gap-3 p-10' action={formAction}>
              <Input
                className='hidden'
                type='hidden'
                name='image'
                value={userUploadedImage ?? ''}
                hidden
              />
              <Input
                type='hidden'
                name='mask'
                value={maskImage ?? ''}
                hidden
                className='hidden'
              />
              <Input
                type='text'
                name='prompt'
                placeholder='prompt'
                variant='bordered'
              />
              <div className='grid grid-cols-2 gap-4'>
                <Button onClick={startOver}>Start Over</Button>
                <Button type='submit' color='primary'>
                  Fetch
                </Button>
              </div>
            </form>
          </CardFooter>
        </Card>
      </div>
      <div className='grid place-content-center bg-slate-100'>
        <Card className=''>
          <CardBody className='min-h-[512px] min-w-[512px] overflow-visible bg-gray-100'>
            {result?.status && result.status !== 'succeeded' ? (
              <Skeleton className='h-full'>
                <div className='bg-default-300 h-full'></div>
              </Skeleton>
            ) : null}
            {result?.status && result.status === 'failed' ? (
              <div className='absolute inset-0 grid place-content-center text-gray-500'>
                Failed To Process
              </div>
            ) : null}
            {!result?.status ? (
              <div className='absolute inset-0 grid place-content-center text-gray-500'>
                No Image Uploaded Yet
              </div>
            ) : null}
            {result?.status === 'succeeded' && result.output.length ? (
              <Image
                alt='Output'
                src={result.output[0]}
                layout='full'
                width='512'
                height='512'
              />
            ) : null}
          </CardBody>
        </Card>
      </div>
    </main>
  );
}

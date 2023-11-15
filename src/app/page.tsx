'use client';
import { Canvas } from '@/components/canvas';
import { Dropzone } from '@/components/dropzone';
import {
  IconDelete,
  IconErase,
  IconLeftArrow,
  IconRedo,
  IconUndo,
} from '@/components/icons';
import { Status, useReplicate } from '@/hooks/useReplicate';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Skeleton,
} from '@nextui-org/react';
import Image from 'next/image';
import { FormEvent, useCallback, useRef, useState } from 'react';
import {
  ReactSketchCanvasProps,
  ReactSketchCanvasRef,
} from 'react-sketch-canvas';

export default function Home() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [maskImage, setMaskImage] = useState<string | null>(null);
  const [userUploadedImage, setUserUploadedImage] = useState<string | null>(
    null
  );
  const [prompt, setPrompt] = useState<string>('');
  const { status, reset, handleSubmit, predictionOutput } = useReplicate();

  const loading = status === Status.loading;
  const error = status === Status.error;

  const startOver = useCallback(() => {
    reset();
    setUserUploadedImage(null);
    setMaskImage(null);
  }, [reset]);

  const handleExport = useCallback(() => {
    if (!predictionOutput) return;

    setUserUploadedImage(predictionOutput);
    canvasRef.current?.clearCanvas();
    setMaskImage(null);
  }, [predictionOutput]);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setPrompt('');
      if (!userUploadedImage || !maskImage || !prompt) return;

      handleSubmit({
        image: userUploadedImage,
        mask: maskImage,
        prompt,
      });
    },
    [handleSubmit, maskImage, prompt, userUploadedImage]
  );

  const handleOnChange = useCallback<
    NonNullable<ReactSketchCanvasProps['onChange']>
  >(async (paths) => {
    if (!paths.length) return;

    const maskImg = await canvasRef.current?.exportImage('png');
    if (!maskImg) return;
    setMaskImage(maskImg);
  }, []);

  const undo = useCallback(() => {
    canvasRef.current?.undo();
  }, []);

  const redo = useCallback(() => {
    canvasRef.current?.redo();
  }, []);

  const erase = useCallback(() => {
    canvasRef.current?.clearCanvas();
  }, []);

  const clear = useCallback(() => {
    canvasRef.current?.clearCanvas();
    reset();
    setUserUploadedImage(null);
    setMaskImage(null);
  }, [reset]);

  return (
    <main className='grid grid-cols-2 gap-4 bg-slate-300'>
      <div className='grid place-content-center bg-slate-100'>
        <Card className='grid'>
          <CardHeader className='flex gap-2'>
            <Button
              variant='flat'
              size='sm'
              onClick={undo}
              startContent={<IconUndo />}
            >
              Undo
            </Button>
            <Button
              variant='flat'
              size='sm'
              onClick={redo}
              startContent={<IconRedo />}
            >
              Redo
            </Button>
            <Button
              variant='flat'
              size='sm'
              onClick={erase}
              startContent={<IconErase />}
            >
              Erase
            </Button>
            <Button
              className='ml-auto'
              variant='flat'
              color='danger'
              size='sm'
              onClick={clear}
              startContent={<IconDelete />}
            >
              Clear
            </Button>
          </CardHeader>
          <CardBody className='min-h-[512px] min-w-[512px] overflow-visible bg-gray-100'>
            <Canvas
              uploadedImage={userUploadedImage}
              onChange={handleOnChange}
              canvasRef={canvasRef}
            />
            {!userUploadedImage ? (
              <Dropzone
                onDrop={setUserUploadedImage}
                className='absolute inset-0 grid h-full w-full place-content-center text-gray-500'
              />
            ) : null}
          </CardBody>
          <CardFooter className='grid'>
            <form className='grid gap-2 p-4' onSubmit={onSubmit}>
              <Input
                value={prompt}
                type='text'
                name='prompt'
                required
                placeholder='Enter prompt'
                variant='flat'
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button
                type='submit'
                color='primary'
                isLoading={loading}
                disabled={!prompt || !userUploadedImage}
              >
                Process
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
      <div className='grid place-content-center bg-slate-100'>
        <Card className='grid'>
          <CardHeader className='flex justify-center'>
            <Button
              className='flex items-center space-x-2'
              variant='flat'
              onClick={handleExport}
            >
              <IconLeftArrow />
              <span>Export</span>
            </Button>
          </CardHeader>
          <CardBody className='min-h-[512px] min-w-[512px] overflow-visible bg-gray-100'>
            {loading ? (
              <Skeleton className='h-full'>
                <div className='h-full bg-default-300'></div>
              </Skeleton>
            ) : null}
            {predictionOutput ? (
              <Image
                alt='Output'
                src={predictionOutput}
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

const Steps = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-6'>
      <div className='w-80 space-y-4 rounded-lg p-6 dark:border-zinc-800'>
        <h2 className='text-center text-2xl font-bold'>Follow these steps</h2>
        <div className='flex items-start space-x-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full font-bold'>
            1
          </div>
          <div className='space-y-1'>
            <h3 className='font-semibold'>Upload Image</h3>
            <p className='text-zinc-500 dark:text-zinc-400'>
              Select the image file you want to upload from your device.
            </p>
          </div>
        </div>
        <div className='flex items-start space-x-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full font-bold '>
            2
          </div>
          <div className='space-y-1'>
            <h3 className='font-semibold'>Draw on the Image</h3>
            <p className='text-zinc-500 dark:text-zinc-400'>
              Use the drawing tool to highlight the areas you want to change on
              the image.
            </p>
          </div>
        </div>
        <Button className='w-full'>Get Started</Button>
      </div>
    </div>
  );
};

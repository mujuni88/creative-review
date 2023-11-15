'use client';
import { Canvas } from '@/components/canvas';
import ComparisonModal from '@/components/comparison-modal';
import { Dropzone } from '@/components/dropzone';
import {
  IconCompare,
  IconDelete,
  IconErase,
  IconRedo,
  IconReplace,
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
  cn,
  useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';
import { FormEvent, useCallback, useRef, useState } from 'react';
import {
  ReactSketchCanvasProps,
  ReactSketchCanvasRef,
} from 'react-sketch-canvas';
import { toast } from 'sonner';
import { Instructions } from '../components/instructions';

export default function Home() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [maskImage, setMaskImage] = useState<string | null>(null);
  const [userUploadedImage, setUserUploadedImage] = useState<string | null>(
    null
  );
  const [prompt, setPrompt] = useState<string>('');
  const { status, reset, handleSubmit, predictionOutput } = useReplicate();
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  const loading = status === Status.loading;

  const handleExport = useCallback(() => {
    if (!predictionOutput) return;

    setUserUploadedImage(predictionOutput);
    canvasRef.current?.clearCanvas();
    setMaskImage(null);
    reset();
    toast.success('Exported successfully');
  }, [predictionOutput, reset]);

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
    setMaskImage(null);
  }, []);

  const clear = useCallback(() => {
    canvasRef.current?.clearCanvas();
    reset();
    setUserUploadedImage(null);
    setMaskImage(null);
  }, [reset]);

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

  return (
    <>
      <main className='grid grid-cols-[1fr_auto_1fr] gap-4'>
        <div className='grid place-content-center'>
          <Card className='grid'>
            <CardHeader className='flex gap-2'>
              <Button
                variant='flat'
                size='sm'
                onClick={undo}
                startContent={<IconUndo />}
                isDisabled={loading}
              >
                Undo
              </Button>
              <Button
                variant='flat'
                size='sm'
                onClick={redo}
                startContent={<IconRedo />}
                isDisabled={loading}
              >
                Redo
              </Button>
              <Button
                variant='flat'
                size='sm'
                onClick={erase}
                startContent={<IconErase />}
                isDisabled={loading}
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
                isDisabled={loading}
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
                  isDisabled={!prompt || !userUploadedImage || !maskImage}
                >
                  Process
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
        <div className='grid place-content-center'>
          <Button
            className={cn('ml-auto flex items-center space-x-2', {
              invisible: !predictionOutput,
            })}
            variant='flat'
            color='primary'
            onClick={onOpen}
            startContent={<IconCompare />}
            size='sm'
          >
            Compare
          </Button>
        </div>
        <div className='grid place-content-center'>
          {!loading && !predictionOutput ? (
            <Instructions
              step1Completed={!!userUploadedImage}
              step2Completed={!!maskImage}
              step3Completed={!!prompt}
            />
          ) : (
            <Card className='grid'>
              {predictionOutput ? (
                <CardHeader className='flex gap-2'>
                  <Button
                    className='flex items-center space-x-2'
                    variant='flat'
                    onClick={handleExport}
                    startContent={<IconReplace />}
                    size='sm'
                  >
                    Replace
                  </Button>
                </CardHeader>
              ) : null}
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
          )}
        </div>
      </main>

      {isOpen ? (
        <ComparisonModal
          userUploadedImage={userUploadedImage ?? ''}
          predictionOutput={predictionOutput ?? ''}
          onOpenChange={onOpenChange}
          isOpen={isOpen}
        />
      ) : null}
    </>
  );
}

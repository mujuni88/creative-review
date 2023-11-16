'use client';

import { ImageProps } from '@nextui-org/react';
import Image from 'next/image';
import React, { useCallback } from 'react';
import {
  ReactSketchCanvas,
  ReactSketchCanvasProps,
  ReactSketchCanvasRef,
} from 'react-sketch-canvas';

export interface CanvasProps extends ReactSketchCanvasProps {
  uploadedImage: string | null;
  canvasRef: React.RefObject<ReactSketchCanvasRef>;
}
export const Canvas: React.FC<CanvasProps> = ({
  uploadedImage,
  canvasRef,
  ...rest
}) => {
  const [canvasSize, setCanvasSize] = React.useState<{
    width: string;
    height: string;
  }>({ width: '512px', height: '512px' }); // [width, height]

  const handleOnImageLoaded = useCallback<NonNullable<ImageProps['onLoad']>>(
    (e) => {
      const target = e.target as HTMLImageElement;
      setCanvasSize({
        width: `${target.width}px`,
        height: `${target.height}px`,
      });
    },
    []
  );

  if (!uploadedImage) return null;

  return (
    <div className='relative aspect-square w-full border border-dashed'>
      <Image
        src={uploadedImage}
        layout='fill'
        className='absolute left-0 top-0 z-0 object-cover'
        onLoad={handleOnImageLoaded}
        alt='Uploaded Image'
      />
      <ReactSketchCanvas
        width={canvasSize.width}
        height={canvasSize.height}
        strokeWidth={60}
        strokeColor='white'
        canvasColor='transparent'
        className='absolute left-0 top-0 z-10 border border-dashed'
        {...rest}
        ref={canvasRef}
      />
    </div>
  );
};

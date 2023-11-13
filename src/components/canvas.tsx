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
  onDraw: (imgUrl: string) => void;
  uploadedImage: string | null;
}
export const Canvas: React.FC<CanvasProps> = ({
  onDraw,
  uploadedImage,
  ...rest
}) => {
  const [canvasSize, setCanvasSize] = React.useState<{
    width: string;
    height: string;
  }>({ width: '512px', height: '512px' }); // [width, height]
  const canvasRef = React.useRef<ReactSketchCanvasRef>(null);
  const handleOnChange = useCallback<
    NonNullable<ReactSketchCanvasProps['onChange']>
  >(
    async (paths) => {
      if (!paths.length) return;

      const maskImg = await canvasRef.current?.exportImage('png');
      maskImg && onDraw(maskImg);
    },
    [onDraw]
  );

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
    <div className='relative aspect-square w-full border border-dashed border-purple-400'>
      <Image
        src={uploadedImage}
        layout='fill'
        className='absolute left-0 top-0 z-0'
        onLoad={handleOnImageLoaded}
        alt='Uploaded Image'
      />
      <ReactSketchCanvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        strokeWidth={80}
        strokeColor='white'
        canvasColor='transparent'
        onChange={handleOnChange}
        className='absolute left-0 top-0 z-50 border border-dashed border-red-300'
        {...rest}
      />
    </div>
  );
};

'use client';
import { readAsDataURL } from '@/lib/utils';
import { useCallback } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

export type DropzoneProps = {
  onDrop: (fileUrl: string) => void;
  className?: string;
};
export const Dropzone: React.FC<React.PropsWithChildren<DropzoneProps>> = ({
  onDrop: _onDrop,
  className,
}) => {
  const onDrop = useCallback<NonNullable<DropzoneOptions['onDrop']>>(
    async (acceptedFiles) => {
      const fileUrl = await readAsDataURL(acceptedFiles[0]);
      _onDrop(fileUrl);
    },
    [_onDrop]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={className}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </div>
  );
};

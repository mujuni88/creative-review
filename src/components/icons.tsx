import { cn } from '@nextui-org/react';

interface IconProps {
  className?: string;
}

export const IconUndo: React.FC<IconProps> = ({ className }) => (
  <svg
    className={cn('h-5 w-5', className)}
    fill='none'
    height='24'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M3 7v6h6' />
    <path d='M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13' />
  </svg>
);

export const IconRedo: React.FC<IconProps> = ({ className }) => (
  <svg
    className={cn('h-5 w-5', className)}
    fill='none'
    height='24'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M21 7v6h-6' />
    <path d='M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7' />
  </svg>
);

export const IconErase: React.FC<IconProps> = ({ className }) => (
  <svg
    className={cn('h-5 w-5', className)}
    fill='none'
    height='24'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21' />
    <path d='M22 21H7' />
    <path d='m5 11 9 9' />
  </svg>
);

export const IconDelete: React.FC<IconProps> = ({ className }) => (
  <svg
    className={cn('h-5 w-5', className)}
    fill='none'
    height='24'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M3 6h18' />
    <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
    <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
  </svg>
);

export const IconLeftArrow: React.FC<IconProps> = ({ className }) => (
  <svg
    className={cn('h-5 w-5', className)}
    fill='none'
    height='24'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='m12 19-7-7 7-7' />
    <path d='M19 12H5' />
  </svg>
);

export const IconUpload: React.FC<IconProps> = ({ className }) => (
  <svg
    className={cn('h-6 w-6', className)}
    fill='none'
    height='24'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
    <polyline points='17 8 12 3 7 8' />
    <line x1='12' x2='12' y1='3' y2='15' />
  </svg>
);

export const IconEdit: React.FC<IconProps> = ({ className }) => (
  <svg
    className={cn('h-6 w-6', className)}
    fill='none'
    height='24'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5' />
    <polyline points='14 2 14 8 20 8' />
    <path d='M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z' />
  </svg>
);

export const IconPrompt: React.FC<IconProps> = ({ className }) => (
  <svg
    className={cn('h-6 w-6', className)}
    fill='none'
    height='24'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M17 6.1H3' />
    <path d='M21 12.1H3' />
    <path d='M15.1 18H3' />
  </svg>
);

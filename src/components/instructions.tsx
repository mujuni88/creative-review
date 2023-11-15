import { cn } from '@nextui-org/react';
import { IconEdit, IconPrompt, IconUpload } from './icons';

interface StepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  isCompleted?: boolean;
}

function Step({ number, icon, title, description, isCompleted }: StepProps) {
  return (
    <div className={'flex items-center space-x-4'}>
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 text-gray-500',
          { 'bg-green-500 text-white': isCompleted }
        )}
      >
        <h1 className='text-3xl font-bold'>{number}</h1>
      </div>
      <div className='space-y-2'>
        <div className='flex items-center'>
          {icon}
          <h2
            className={cn('text-2xl font-bold text-gray-700', {
              'line-through': isCompleted,
            })}
          >
            {title}
          </h2>
        </div>
        <p className='text-gray-600'>{description}</p>
      </div>
    </div>
  );
}

interface InstructionsProps {
  step1Completed?: boolean;
  step2Completed?: boolean;
  step3Completed?: boolean;
}

export function Instructions({
  step1Completed,
  step2Completed,
  step3Completed,
}: InstructionsProps) {
  return (
    <div className='mx-auto w-full max-w-2xl space-y-8 p-8 text-gray-700'>
      <Step
        number={1}
        icon={
          <IconUpload
            className={cn('mr-2 h-6 w-6 text-gray-700', {
              'text-green-500': step1Completed,
            })}
          />
        }
        title='Upload Image'
        description='Select an image from your device.'
        isCompleted={step1Completed}
      />
      <Step
        number={2}
        icon={
          <IconEdit
            className={cn('mr-2 h-6 w-6 text-gray-700', {
              'text-green-500': step2Completed,
            })}
          />
        }
        title='Edit Image'
        description='Draw on the areas you want to change on the image'
        isCompleted={step2Completed}
      />
      <Step
        number={3}
        icon={
          <IconPrompt
            className={cn('mr-2 h-6 w-6 text-gray-700', {
              'text-green-500': step3Completed,
            })}
          />
        }
        title='Enter Prompt'
        description='Describe the alterations you envision'
        isCompleted={step3Completed}
      />
    </div>
  );
}

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from '@nextui-org/react';
import Image from 'next/image';

interface ComparisonModalProps extends Omit<ModalProps, 'children'> {
  userUploadedImage: string;
  predictionOutputs: string[];
}
const ComparisonModal = ({
  userUploadedImage,
  predictionOutputs,
  isOpen,
  onOpenChange,
  ...rest
}: ComparisonModalProps) => {
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} {...rest} size='5xl'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Image Comparison</ModalHeader>
              <ModalBody className='grid min-h-[512px] w-full min-w-[512px] grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <p className='text-center text-gray-700'>Original Image</p>

                  <Image
                    alt='User Uploaded Image'
                    src={userUploadedImage}
                    className='object-cover'
                    width={512}
                    height={512}
                  />
                </div>
                <div className='grid gap-2'>
                  <p className='text-center text-gray-700'>Prediction Output</p>
                  {predictionOutputs.map((output, i) => {
                    return (
                      <Image
                        key={i}
                        alt='Prediction Output'
                        src={output}
                        width={512}
                        height={512}
                        className='object-cover'
                      />
                    );
                  })}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ComparisonModal;

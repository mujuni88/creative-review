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
  const outputs = predictionOutputs.map((output, i) => {
    return (
      <Image
        key={i}
        alt='Prediction Output'
        src={output}
        layout='fill'
        className='object-cover'
      />
    );
  });

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} {...rest} size='5xl'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Image Comparison</ModalHeader>
              <ModalBody className='grid auto-cols-min grid-flow-col overflow-x-scroll'>
                <Image
                  alt='User Uploaded Image'
                  src={userUploadedImage}
                  layout='fill'
                  className='object-cover'
                />
                {outputs}
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

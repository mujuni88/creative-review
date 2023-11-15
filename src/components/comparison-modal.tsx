import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from '@nextui-org/react';

interface ComparisonModalProps extends Omit<ModalProps, 'children'> {
  userUploadedImage: string;
  predictionOutput: string;
}
const ComparisonModal = ({
  userUploadedImage,
  predictionOutput,
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
              <ModalBody className='grid grid-cols-2 gap-4'>
                <Image
                  alt='User Uploaded Image'
                  src={userUploadedImage}
                  width={512}
                  height={512}
                  className='object-cover'
                />
                <Image
                  alt='Prediction Output'
                  src={predictionOutput}
                  width={512}
                  height={512}
                  className='object-cover'
                />
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

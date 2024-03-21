import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';

export default function CustomModal({ isOpen, onClose, title, bodyContent }) {
  console.log('CustomModal -> isOpen', isOpen);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{bodyContent}</ModalBody>

          <ModalFooter>
            <Button bg="primaryRed" color="white" onClick={onClose} mr={3} _hover={{ background: 'blackAlpha.600' }}>
              Cancel
            </Button>
            <Button variant="ghost">Reset</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

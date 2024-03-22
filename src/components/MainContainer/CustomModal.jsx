import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';

export default function CustomModal({ isOpen, onClose, title, bodyContent, buttons }) {
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
            {buttons.map((button, index) => (
              <Button key={index} onClick={button.onClick} variant="ghost" colorScheme={button.colorScheme}>
                {button.label}
              </Button>
            ))}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

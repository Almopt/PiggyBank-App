import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Flex,
  Box,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Input,
  Select,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useState } from 'react';

export default function AddNewExpenseModal({ isOpen, onClose, onHandleAddNewExpense, monthlyIncome }) {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    date: '',
  });

  const [addExpenseError, setAddExpenseError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetFormData = () => {
    setFormData({
      amount: '',
      description: '',
      category: '',
      date: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);
    // Checks if the amount entered is valid
    if (+formData.amount > monthlyIncome) {
      setAddExpenseError((prevValue) => !prevValue);
      return;
    }

    if (addExpenseError === true) {
      setAddExpenseError((prevValue) => !prevValue);
    }

    onHandleAddNewExpense(formData);
    resetFormData();
    // Close the modal after form submission
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        {/* <ModalHeader>Add New Expense</ModalHeader> */}
        <ModalHeader>{'Add New Expense'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Flex flexDirection="column" gap="1rem">
              <Box>
                <FormControl isRequired>
                  <FormLabel>Amount</FormLabel>
                  <NumberInput min={1} variant="filled" value={formData.amount}>
                    <NumberInputField name="amount" placeholder="Enter the amount" onChange={handleInputChange} />
                  </NumberInput>
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Input name="description" variant="filled" type="text" placeholder="Enter a detail description" value={formData.description} onChange={handleInputChange} />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select name="category" variant="filled" placeholder="Select a Category" value={formData.category} onChange={handleInputChange}>
                    <option value="housing">Housing</option>
                    <option value="transportation">Transportation</option>
                    <option value="food">Food</option>
                    <option value="utilities">Utilities</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="debt-payments">Debt Payments</option>
                    <option value="saving-investments">Savings and Investments</option>
                    <option value="insurance">Insurance</option>
                    <option value="entertainment">Entertainment</option>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Date</FormLabel>
                  {/* <Input variant="filled" type="date" value={`${year}-${month}-${day}`} /> */}
                  <Input name="date" variant="filled" type="date" value={formData.date} onChange={handleInputChange} />
                </FormControl>
              </Box>
              <Button
                mt="2rem"
                mb="1rem"
                leftIcon={<AddIcon />}
                bg="primaryRed"
                variant="solid"
                alignSelf="center"
                size="lg"
                width="100%"
                color="white"
                _hover={{ background: 'blackAlpha.500' }}
                _active={{ background: 'blackAlpha.800' }}
                type="submit"
              >
                {'Add Expense'}
              </Button>
              {addExpenseError && (
                <Alert status="error" mb="1.5rem">
                  <AlertIcon />
                  The amount entered is greater than the current balance available!
                </Alert>
              )}
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

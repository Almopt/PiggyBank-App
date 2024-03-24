import { useState } from 'react';

import {
  Box,
  Flex,
  Button,
  HStack,
  Text,
  Input,
  useBreakpointValue,
  useDisclosure,
  Heading,
  Divider,
  Select,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
// import { FaCheck } from 'react-icons/fa';
import { AddIcon } from '@chakra-ui/icons';
import Stats from './Stats.jsx';
import CustomModal from './CustomModal.jsx';
import Expense from './Expense.jsx';
import MonthlyIncomeForm from './MonthlyIncomeForm.jsx';

export default function MainContainer() {
  // const [amount, setamount] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('$0');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalBodyContent, setModalBodyContent] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Create a new Date object
  const currentDate = new Date();

  console.log('Entou a dar render');
  console.log(monthlyIncome);

  // Get the current date in YYYY-MM-DD format
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding zero padding if needed
  const day = String(currentDate.getDate()).padStart(2, '0'); // Adding zero padding if needed

  const customOnClose = () => {
    console.log('Custom onClose');
    console.trace();
    onClose();
  };

  // Dynamically get flex direction based on breakpoints
  const monthlyIncomeContainerflexDirection = useBreakpointValue({
    base: 'column',
    sm: 'column',
    md: 'column',
    lg: 'row',
    xl: 'row',
    '2xl': 'row',
  });

  // Dynamically get width based on breakpoints
  const monthlyIncomeContainerWidth = useBreakpointValue({ base: '100%', md: '100%', lg: '100%', xl: '50%', '2xl': '50%' });

  const resetAndUpdateButtons = [
    { label: 'Reset', colorScheme: 'orange', onClick: handleResetMonthlyIncome },
    { label: 'Update', colorScheme: 'orange', onClick: handleUpdateMonthlyIncome },
  ];

  const expensesContainerFlexDirection = useBreakpointValue({
    base: 'column',
    sm: 'column',
    md: 'column',
    lg: 'column',
    xl: 'row',
    '2xl': 'row',
  });

  const options = {
    style: 'decimal',
    useGrouping: true, // Enables thousands separator
  };

  // const handleInputChange = (event) => {
  //   setamount(event.target.value);
  // };

  function isMonthlyInputFilled() {
    if (parseInt(monthlyIncome.substring(1)) > 0) {
      setModalTitle('Edit / Reset Montlhy Income');
      setModalBodyContent(`Would you like to reset your monthly income or just add it
      to the current one?`);
      onOpen();
      return true;
    }
    return false;
  }

  function handleConfirmMonthlyIncome(amount) {
    // event.preventDefault();
    // Checks if the input is empty
    if (amount.trim() === '') {
      setErrorMessage('Input cannot be empty');

      // Checks if input isn't a number
    } else if (isNaN(amount)) {
      setErrorMessage('Input must be a number');
      // setamount('');
    } else {
      // Checks if we already have a current Montlhy Income
      if (isMonthlyInputFilled()) {
        return;
      }
      // Clear any previous error message if input is valid
      setErrorMessage('');
      setMonthlyIncome(`$${parseInt(amount).toLocaleString('en-US', options)}`);
      // setamount('');
    }
  }

  function handleResetMonthlyIncome() {
    setMonthlyIncome(`$0`);
    // setamount('');
    onClose();
  }

  function handleUpdateMonthlyIncome(amount) {
    const newMontlhyIncome = parseInt(amount) + parseInt(monthlyIncome.substring(1));
    setMonthlyIncome(`$${newMontlhyIncome.toLocaleString('en-US', options)}`);
    // setamount('');
    onClose();
  }

  return (
    // Wrapper
    <Flex bg="#f1f3f4" grow="1" flexDirection="column">
      {/* Main Container */}
      <Flex mt="2.5rem" mx="4rem" flexDirection="column">
        <CustomModal
          isOpen={isOpen}
          onClose={customOnClose}
          title={modalTitle}
          bodyContent={modalBodyContent}
          buttons={resetAndUpdateButtons}
          buttonsHandles={handleResetMonthlyIncome}
        />
        {/* Monthly Income Container */}
        <Flex
          gap="1rem"
          bg="white"
          p="1rem"
          // border="1px"
          borderRadius="0.6rem"
          width={monthlyIncomeContainerWidth}
          justifyContent="space-between"
          boxShadow="base"
          flexDirection={monthlyIncomeContainerflexDirection}
        >
          <Flex flexDirection="column">
            <Text fontSize="2xl">Montly Income</Text>
            <Text fontSize="3xl" fontWeight="bold">
              {monthlyIncome}
            </Text>
          </Flex>
          <MonthlyIncomeForm income={monthlyIncome} onConfirmIncome={handleConfirmMonthlyIncome} errorMessage={errorMessage} />
          {/* <Flex flexDirection="column" gap="0.5rem" alignSelf="center">
            <form onSubmit={handleConfirmMonthlyIncome}>
              <Flex gap="1rem">
                <InputGroup alignSelf="center" size="lg">
                  <InputLeftElement pointerEvents="none" color="black" fontSize="1.2em">
                    $
                  </InputLeftElement>
                  <Input
                    variant="filled"
                    focusBorderColor="black"
                    placeholder="Enter amount"
                    _placeholder={{ color: 'black' }}
                    value={amount}
                    onChange={handleInputChange}
                  />
                </InputGroup>
                <Button
                  leftIcon={<FaCheck />}
                  bg="primaryRed"
                  variant="solid"
                  alignSelf="center"
                  size="lg"
                  color="white"
                  _hover={{ background: 'blackAlpha.500' }}
                  _active={{ background: 'blackAlpha.800' }}
                  type="submit"
                >
                  {monthlyIncome !== '$0' ? 'Edit' : 'Confirm'}
                </Button>
              </Flex>
            </form>
            {errorMessage ? (
              <Alert status="error">
                <AlertIcon />
                {errorMessage}
              </Alert>
            ) : null}
          </Flex> */}
        </Flex>
        {/* Stats Container */}
        <HStack spacing="2rem" mt="2.5rem" flexWrap="wrap">
          <Stats title="Total Saved Balance" amount="$0" percentage="0%" />
          <Stats title="Total Expenses Amount" amount="$0" percentage="0%" />
          <Stats title="Current Month Balance" amount={monthlyIncome} percentage="0%" />
          <Stats title="Current Month Expenses" amount="$0" percentage="0%" />
          <Stats title="(%) Montlhy Expenses" amount="0%" percentage="0%" />
        </HStack>
        {/* Expenses Container */}
        <Flex flexDirection={expensesContainerFlexDirection} gap="2rem">
          {/* Check Expenses Container */}
          <Flex mt="2.5rem" gap="1rem" bg="white" p="1rem" borderRadius="0.6rem" boxShadow="base" flexDirection="column" width="60%">
            {/* Title */}
            <Flex justifyContent="space-between">
              <Heading as="h2" size="lg" alignSelf="center">
                Expenses
              </Heading>
              <Box>
                <Select variant="filled">
                  <option value="option1">01/2024</option>
                  <option value="option2">02/2024</option>
                  <option value="option3">03/2024</option>
                </Select>
              </Box>
            </Flex>
            <Divider size="2xl" />
            {/* Expenses */}
            <Expense></Expense>
          </Flex>
          {/* Add/Update Expenses Container */}
          <Flex mt="2.5rem" gap="1rem" bg="white" p="1rem" borderRadius="0.6rem" justifyContent="space-between" boxShadow="base" flexDirection="column" width="40%">
            {/* Title */}
            <Flex flexDirection="column" gap="0.5rem">
              <Heading as="h2" size="lg">
                Add Expense
              </Heading>
              <Text color="blackAlpha.600">Enter the details of your expensive to help you track your spending</Text>
            </Flex>
            <Divider size="2xl" />
            {/* Expenses */}
            <FormControl>
              <Flex flexDirection="column" gap="1rem">
                <Box>
                  <FormLabel>Amount</FormLabel>
                  <NumberInput min={1} variant="filled">
                    <NumberInputField placeholder="Enter the amount " />
                  </NumberInput>
                </Box>
                <Box>
                  <FormLabel>Description</FormLabel>
                  <Input variant="filled" type="text" placeholder="Enter a detail description" />
                </Box>
                <Box>
                  <FormLabel>Category</FormLabel>
                  <Select variant="filled" placeholder="Select a Category">
                    <option value="groceries">Groceries</option>
                    <option value="house-bills">House Bills</option>
                    <option value="car-insurance">Car Insurance</option>
                    <option value="investments">Investments</option>
                  </Select>
                </Box>
                <Box>
                  <FormLabel>Date</FormLabel>
                  {/* <Input variant="filled" type="date" value={`${year}-${month}-${day}`} /> */}
                  <Input variant="filled" type="date" />
                </Box>
                <Button
                  mt="2rem"
                  leftIcon={<AddIcon />}
                  bg="primaryRed"
                  variant="solid"
                  alignSelf="center"
                  size="lg"
                  width="100%"
                  color="white"
                  _hover={{ background: 'blackAlpha.500' }}
                  _active={{ background: 'blackAlpha.800' }}
                >
                  Add Expense
                </Button>
              </Flex>
            </FormControl>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

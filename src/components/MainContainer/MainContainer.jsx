import { useState } from 'react';

import { Flex, Button, HStack, Text, InputLeftElement, InputGroup, Input, Alert, AlertIcon, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';
import Stats from './Stats.jsx';
import CustomModal from './CustomModal.jsx';

export default function MainContainer() {
  const [monthlyIncomeInputValue, setMonthlyIncomeInputValue] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('$0');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalBodyContent, setModalBodyContent] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const customOnClose = () => {
    console.log('Custom onClose');
    console.trace();
    onClose();
  };
  console.log(`Re-rendered: isOpen -> ${isOpen}`);

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

  const options = {
    style: 'decimal',
    useGrouping: true, // Enables thousands separator
  };

  const handleInputChange = (event) => {
    setMonthlyIncomeInputValue(event.target.value);
  };

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

  function handleConfirmMonthlyIncome(event) {
    event.preventDefault()
    // Checks if the input is empty
    if (monthlyIncomeInputValue.trim() === '') {
      console.log(monthlyIncomeInputValue);
      setErrorMessage('Input cannot be empty');

      // Checks if input isn't a number
    } else if (isNaN(monthlyIncomeInputValue)) {
      setErrorMessage('Input must be a number');
      setMonthlyIncomeInputValue('');
    } else {
      // Checks if we already have a current Montlhy Income
      if (isMonthlyInputFilled()) {
        return;
      }
      // Clear any previous error message if input is valid
      setErrorMessage('');
      setMonthlyIncome(`$${parseInt(monthlyIncomeInputValue).toLocaleString('en-US', options)}`);
      setMonthlyIncomeInputValue('');
    }
  }

  function handleEnterKeyPressMonthlyIncome(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      // Perform your action here when Enter is pressed
      handleConfirmMonthlyIncome();
    }
  }

  return (
    // Wrapper
    <Flex bg="#f1f3f4" grow="1" flexDirection="column">
      {/* Main Container */}
      <Flex mt="2.5rem" mx="4rem" flexDirection="column">
        {isOpen === true ? <p>Modal is going to open</p> : <p>modal is not going to open</p>}
        <CustomModal isOpen={isOpen} onClose={customOnClose} title={modalTitle} bodyContent={modalBodyContent} />
        {/* Monthly Income Container */}
        <Flex
          gap="1rem"
          bg="white"
          p="1rem"
          border="1px"
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
          <Flex flexDirection="column" gap="0.5rem" alignSelf="center">
            <Flex gap="1rem">
              <form onSubmit={handleConfirmMonthlyIncome}>
                <InputGroup alignSelf="center" size="lg">
                  <InputLeftElement pointerEvents="none" color="black" fontSize="1.2em">
                    $
                  </InputLeftElement>
                  <Input
                    focusBorderColor="black"
                    placeholder="Enter amount"
                    _placeholder={{ color: 'black' }}
                    value={monthlyIncomeInputValue}
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
                  type='submit'
                >
                  {monthlyIncome !== '$0' ? 'Edit' : 'Confirm'}
                </Button>
              </form>
            </Flex>
            {errorMessage ? (
              <Alert status="error">
                <AlertIcon />
                {errorMessage}
              </Alert>
            ) : null}
          </Flex>
        </Flex>
        {/* Stats Container */}
        <HStack spacing="2rem" mt="2.5rem" flexWrap="wrap">
          <Stats title="Total Saved Balance" amount="$0" percentage="0%" />
          <Stats title="Total Expenses Amount" amount="$0" percentage="0%" />
          <Stats title="Current Month Balance" amount={monthlyIncome} percentage="0%" />
          <Stats title="Current Month Expenses" amount="$0" percentage="0%" />
          <Stats title="(%) Montlhy Expenses" amount="0%" percentage="0%" />
        </HStack>
      </Flex>
    </Flex>
  );
}

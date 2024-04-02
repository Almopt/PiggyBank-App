import { useState } from 'react';

import { Flex, InputGroup, InputLeftElement, Input, Button, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';

export default function MonthlyIncomeFormV2({ monthlyIncome, onConfirmMonthlyIncome }) {
  const [incomeInputValue, setincomeInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorMessageTitle, setErrorMessageTitle] = useState('');

  const checkInputErrors = () => {
    if (incomeInputValue.trim() === '') {
      setErrorMessageTitle('Input cannot be empty');
      setErrorMessage((prevValue) => !prevValue);
      return true;
    } else if (isNaN(incomeInputValue)) {
      setErrorMessageTitle('Input must be a number');
      setErrorMessage((prevValue) => !prevValue);
      return true;
    } else {
      // hide previous error message
      if (errorMessage === true) {
        setErrorMessage((prevValue) => !prevValue);
      }
      return false;
    }
  };

  const handleInputChange = (event) => {
    setincomeInputValue(event.target.value);
  };

  const prepareSubmit = () => {
    if (!checkInputErrors()) {
      onConfirmMonthlyIncome(incomeInputValue);
    }
  };

  return (
    <Flex flexDirection="column" gap="1rem" alignSelf="center">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          prepareSubmit();
          setincomeInputValue('');
        }}
      >
        <Flex gap="0.8rem">
          <InputGroup alignSelf="center" size="lg" maxW="14rem">
            <InputLeftElement pointerEvents="none" color="black" fontSize="1.2em">
              $
            </InputLeftElement>
            <Input variant="filled" focusBorderColor="black" placeholder="Enter amount" _placeholder={{ color: 'black' }} value={incomeInputValue} onChange={handleInputChange} />
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
            {monthlyIncome !== 0 ? 'Edit' : 'Confirm'}
          </Button>
        </Flex>
      </form>
      {errorMessage && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{errorMessageTitle}</AlertTitle>
        </Alert>
      )}
    </Flex>
  );
}

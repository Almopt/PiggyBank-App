import { useState } from 'react';

import { Flex, InputLeftElement, InputGroup, Alert, AlertIcon, Button, Input } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';

export default function MonthlyIncomeForm({ income, onConfirmIncome, errorMessage }) {
  const [incomeInputValue, setincomeInputValue] = useState('');

  const handleInputChange = (event) => {
    setincomeInputValue(event.target.value);
  };

  return (
    <Flex flexDirection="column" gap="0.5rem" alignSelf="center">
      <form onSubmit={() => onConfirmIncome(incomeInputValue)}>
        <Flex gap="1rem">
          <InputGroup alignSelf="center" size="lg">
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
            {income !== '$0' ? 'Edit' : 'Confirm'}
          </Button>
        </Flex>
      </form>
      {errorMessage ? (
        <Alert status="error">
          <AlertIcon />
          {errorMessage}
        </Alert>
      ) : null}
    </Flex>
  );
}

import { Flex, Box, Text, Icon, Tooltip } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

import { TbPigMoney } from 'react-icons/tb';

export default function Expense({ id, description, category, date, expenseAmount, handleButtons }) {
  // Convert the string to a Date object
  const dateObject = new Date(date);
  // Format date into DD/MM/YYYY
  const formatedDate = ('0' + dateObject.getDate()).slice(-2) + '/' + ('0' + (dateObject.getMonth() + 1)).slice(-2) + '/' + dateObject.getFullYear();

  return (
    // Expense Main Container
    <Box borderRadius="0.5rem" boxShadow="md" bg="#f1f3f4">
      <Flex justifyContent="space-between" px="1rem" py="1rem">
        {/* Expense Details */}
        <Flex gap="0.8rem">
          {/* Money Icon */}
          <Icon as={TbPigMoney} alignSelf="center" boxSize={8} />
          <Box></Box>
          {/* Expense Details */}
          <Flex flexDirection="column">
            {/* Description */}
            <Flex gap="0.5rem">
              <Text as="b">Description:</Text>
              <Text>{description}</Text>
            </Flex>
            <Flex gap="0.8rem">
              {/* Category */}
              <Flex gap="0.5rem">
                <Text as="b">Category:</Text>
                <Text>{category}</Text>
              </Flex>
              <Flex gap="0.5rem">
                <Text as="b">Date:</Text>
                <Text>{formatedDate}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        {/* Expense Amount and Action Button/Icons */}
        <Flex justifyContent="space-between" alignItems="center" gap="1rem">
          <Text fontSize="xl" as="b">
            {`$${expenseAmount}`}
          </Text>
          <Flex gap="0.5rem">
            <Tooltip label="Edit Expense" fontSize="md">
              <EditIcon boxSize={5} cursor="pointer" _hover={{ color: 'primaryRed' }} onClick={() => handleButtons[0](id)} />
            </Tooltip>
            <Tooltip label="Delete Expense" fontSize="md">
              <DeleteIcon boxSize={5} cursor="pointer" _hover={{ color: 'primaryRed' }} onClick={() => handleButtons[1](id)} />
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

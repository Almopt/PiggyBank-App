import { Flex, Box, Text, Icon, Tooltip } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

import { TbPigMoney } from 'react-icons/tb';

export default function Expense() {
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
            <Text>Expense Description</Text>
            <Flex gap="0.8rem">
              <Text>Category</Text>
              <Text>Date</Text>
            </Flex>
          </Flex>
        </Flex>
        {/* Expense Amount and Action Button/Icons */}
        <Flex justifyContent="space-between" alignItems="center" gap="1rem">
          <Text fontSize="xl" as="b">
            $200
          </Text>
          <Flex gap="0.5rem">
            <Tooltip label="Edit Expense" fontSize="md">
              <EditIcon boxSize={5} cursor="pointer" _hover={{ color: 'primaryRed' }} />
            </Tooltip>
            <Tooltip label="Delete Expense" fontSize="md">
              <DeleteIcon boxSize={5} cursor="pointer" _hover={{ color: 'primaryRed' }} />
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

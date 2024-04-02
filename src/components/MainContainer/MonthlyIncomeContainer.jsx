import { Flex, Text } from '@chakra-ui/react';

export default function MonthlyIncomeContainer({ containerWidth, flexDirection, monthlyIncome, errorMessage }) {
  return (
    <Flex gap="1rem" bg="white" p="1rem" borderRadius="0.6rem" width={containerWidth} justifyContent="space-between" boxShadow="base" flexDirection={flexDirection}>
      <Flex flexDirection="column">
        <Text fontSize="2xl">Montly Income</Text>
        <Text fontSize="3xl" fontWeight="bold">
          {monthlyIncome}
        </Text>
      </Flex>
      <MonthlyIncomeForm income={monthlyIncome} onConfirmIncome={handleConfirmMonthlyIncome} errorMessage={errorMessage} />
    </Flex>
  );
}

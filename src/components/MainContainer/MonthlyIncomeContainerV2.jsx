import { Flex, Heading, Text, useBreakpointValue } from '@chakra-ui/react';
import MonthlyIncomeFormV2 from './MonthlyIncomeFormV2';

export default function MonthlyIncomeContainerV2({ monthlyIncomeValue, onChangeMonthlyIncome }) {
  const flexDirectionBreakPoints = useBreakpointValue({ base: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', '2xl': 'row' });
  const gapBetweenMontlyIncomeAndForm = useBreakpointValue({ base: '1rem', sm: '1rem', md: '2rem', lg: '2rem', xl: '4rem', '2xl': '4rem' });

  const options = {
    style: 'decimal',
    useGrouping: true, // Enables thousands separator
    currency: 'USD',
  };

  return (
    <Flex>
      {/* Heading and Monthly Income Value */}
      <Flex bg="white" p="1rem" borderRadius="0.6rem" boxShadow="base" gap={gapBetweenMontlyIncomeAndForm} flexDirection={flexDirectionBreakPoints}>
        <Flex flexDirection="column">
          <Heading as="h2" size="lg">
            Monthly Income
          </Heading>
          <Text fontSize="3xl" as="b">
            {`$${monthlyIncomeValue.toLocaleString('en-US', options)}`}
          </Text>
        </Flex>
        <MonthlyIncomeFormV2 monthlyIncome={monthlyIncomeValue} onConfirmMonthlyIncome={onChangeMonthlyIncome} />
      </Flex>
    </Flex>
  );
}

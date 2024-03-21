import { Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup, Box } from '@chakra-ui/react';

export default function Stats({ title, amount, percentage }) {
  return (
    <Box bg="white" p="1rem" minW="15rem" border="1px" borderRadius="0.6rem" boxShadow="base">
      <Stat>
        <StatLabel fontSize="lg">{title}</StatLabel>
        <StatNumber>{amount}</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          {percentage}
        </StatHelpText>
      </Stat>
    </Box>
  );
}

import { Button, Flex, Heading, Select, Tooltip, VStack, StackDivider, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Expense from './Expense';

export default function ExpensesContainer({
  expensesArray,
  onAddNewExpense,
  expensesMonthsAndYearsArray,
  expenseMothAndYearSelected,
  monthlyIncome,
  onChangeMonthAndYearKey,
  onDeleteExpense,
  onEditExpense,
}) {
  return (
    <Flex bg="white" px="1rem" py="1rem" borderRadius="0.6rem" boxShadow="base" flexDirection="column" gap="1.5rem">
      {/* Header */}
      <Flex justifyContent="space-between">
        <Heading>Expenses</Heading>
        {/* Expenses Months and Add New Expense Button */}
        <Flex gap="1rem">
          {expensesMonthsAndYearsArray.length > 0 && (
            <Select placeholder="Select option" alignSelf="center" value={expenseMothAndYearSelected} onChange={onChangeMonthAndYearKey}>
              {expensesMonthsAndYearsArray.map((monthYearKey, index) => (
                <option key={index} value={monthYearKey}>
                  {monthYearKey}
                </option>
              ))}
            </Select>
          )}
          <Tooltip hasArrow label="Add new Expense">
            <Button
              leftIcon={<AddIcon />}
              bg="primaryRed"
              variant="solid"
              alignSelf="center"
              size="lg"
              color="white"
              isDisabled={monthlyIncome <= 0 ? true : false}
              _hover={{ background: 'blackAlpha.500' }}
              _active={{ background: 'blackAlpha.800' }}
              onClick={onAddNewExpense}
            >
              Add
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
      {expensesArray[expenseMothAndYearSelected] &&
        expensesArray[expenseMothAndYearSelected].map((expense, idx) => (
          <Expense
            key={idx}
            id={expense.id}
            description={expense.description}
            category={expense.category}
            expenseAmount={expense.amount}
            date={expense.date}
            onDeleteExpense={onDeleteExpense}
            onEditExpense={onEditExpense}
          ></Expense>
        ))}
    </Flex>
  );
}

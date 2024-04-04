import { Button, Flex, Heading, Select, Tooltip } from '@chakra-ui/react';
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
  const formatDateToMMYYYY = (date) => {
    if (date) {
      // Get month and year from the date
      const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
      const year = date.getFullYear();

      // Pad month with leading zero if necessary
      //const paddedMonth = month < 10 ? `0${month}` : month;

      // Return formatted string MM/YYYY
      return `${month}/${year}`;
    }
  };

  const filterExpensesBySelectedMonthAndYear = (date) => {
    if (date) {
      const targetMonth = date.getMonth() + 1;
      const targetYear = date.getFullYear();

      return expensesArray.filter((obj) => {
        return obj.date.getMonth() + 1 === targetMonth && obj.date.getFullYear() === targetYear;
      });
    }
  };

  const currentMonthAndYear = formatDateToMMYYYY(expenseMothAndYearSelected);

  const expensesFiltered = filterExpensesBySelectedMonthAndYear(expenseMothAndYearSelected);

  return (
    <Flex bg="white" px="1rem" py="1rem" borderRadius="0.6rem" boxShadow="base" flexDirection="column" gap="1.5rem">
      {/* Header */}
      <Flex justifyContent="space-between">
        <Heading>Expenses</Heading>
        {/* Expenses Months and Add New Expense Button */}
        <Flex gap="1rem">
          {expensesMonthsAndYearsArray.length > 0 && (
            <Select alignSelf="center" value={currentMonthAndYear} onChange={onChangeMonthAndYearKey}>
              {expensesMonthsAndYearsArray.map((monthYear, index) => (
                <option key={index} value={monthYear}>
                  {monthYear}
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
      {expensesFiltered &&
        expensesFiltered.map((expense, idx) => (
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

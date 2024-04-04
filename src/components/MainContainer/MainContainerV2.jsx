import { useState } from 'react';

import { Flex, useBreakpointValue, useDisclosure, Grid, GridItem } from '@chakra-ui/react';
import MonthlyIncomeContainerV2 from './MonthlyIncomeContainerV2';
import CustomModal from './CustomModal';
import Stats from './Stats';
import ExpensesContainer from './ExpensesContainer';
import AddNewExpenseModal from './AddNewExpenseModal';
import EditExpenseModal from './EditExpenseModal';

const MODAL_TITLE_EDIT_RESET_MONTHLY_INCOME = 'Edit / Reset Montlhy Income';
const MODAL_BODY_EDIT_RESET_MONTHLY_INCOME = 'Would you like to reset your monthly income or just add it to the current one?';
const MODAL_TITLE_DELETE_EXPENSE = 'Delete Expense';
const MODAL_BODY_DELETE_EXPENSE = 'Are you sure you want to delete this expense?';

export default function MainContainerV2() {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [modalType, setModalType] = useState(0);
  const [amountToUpdateMonthlyIncome, setAmountToUpdateMonthlyIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseIdGenerator, setExpenseIdGenerator] = useState(1);
  const [selectedMonthYear, setSelectedMonthYear] = useState();
  const [expenseIdToEditOrDelete, setExpenseIdToEditOrDelete] = useState();

  const { isOpen: isOpenCustomModal, onOpen: onOpenCustomModal, onClose: onCloseCustomModal } = useDisclosure();
  const { isOpen: isOpenAddExpenseModal, onOpen: onOpenAddExpenseModal, onClose: onCloseAddExpenseModal } = useDisclosure();
  const { isOpen: isOpenEditExpenseModal, onOpen: onOpenEditExpenseModal, onClose: onCloseEditExpenseModal } = useDisclosure();

  const marginXMainContainer = useBreakpointValue({ base: '2rem', sm: '2rem', md: '2rem', lg: '4rem', xl: '4rem', '2xl': '4rem' });
  const statusGridTemplateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(3, 1fr)',
    xl: 'repeat(4, 1fr)',
    '2xl': 'repeat(5, 1fr)',
  });

  // Modal Variables
  const modalTitle = modalType === 0 ? MODAL_TITLE_EDIT_RESET_MONTHLY_INCOME : MODAL_TITLE_DELETE_EXPENSE;
  const modalBody = modalType === 0 ? MODAL_BODY_EDIT_RESET_MONTHLY_INCOME : MODAL_BODY_DELETE_EXPENSE;
  const modalButtons =
    modalType === 0
      ? [
          { label: 'Reset', colorScheme: 'orange', onClick: () => handleResetMonthlyIncome() },
          { label: 'Update', colorScheme: 'orange', onClick: () => handleUpdateMonthlyIncome(amountToUpdateMonthlyIncome) },
        ]
      : [{ label: 'Delete', colorScheme: 'orange', onClick: () => deleteExpense(expenseIdToEditOrDelete) }];

  // Get the months and year of existence expenses (MM/YYYY)
  const expenseMonths = [
    ...new Set(
      expenses.map((expense) => {
        return `${expense.date.getMonth() + 1}/${expense.date.getFullYear()}`;
      })
    ),
  ];

  // Calculations for Stats Values
  const currentMonthExpensesArray = expenses.filter((expense) => {
    const selectedMonth = selectedMonthYear.getMonth();
    const selectedYear = selectedMonthYear.getFullYear();
    return expense.date.getMonth() === selectedMonth && expense.date.getFullYear() === selectedYear;
  });

  const totalSavedBalanceCalculations = () => {
    const monthlySavings = {};

    expenses.forEach((expense) => {
      // Get month and year
      const monthYear = `${expense.date.getMonth() + 1}-${expense.date.getFullYear()}`;

      let savings = 0;

      if (monthlySavings[monthYear]) {
        savings = monthlySavings[monthYear] - expense.amount;
      } else {
        savings = monthlyIncome - expense.amount;
      }

      monthlySavings[monthYear] = savings;
    });

    // Calculate sum of all savings
    const totalSavings = Object.values(monthlySavings).reduce((acc, curr) => acc + curr, 0);

    return totalSavings;
  };

  const totalSavedBalance = totalSavedBalanceCalculations();

  const totalExpensesAmount = expenses.reduce((acc, currentValue) => {
    return acc + currentValue.amount;
  }, 0);

  const currentMonthExpenses = currentMonthExpensesArray ? currentMonthExpensesArray.reduce((acc, currentValue) => acc + currentValue.amount, 0) : 0;
  const currentMonthBalance = monthlyIncome > 0 ? monthlyIncome - currentMonthExpenses : 0;
  const currentMonthExpensesPercentage = monthlyIncome > 0 ? (currentMonthBalance * 100) / monthlyIncome : 0;
  const currentMonthlyExpensePercentageLabel = monthlyIncome > 0 ? 100 - currentMonthExpensesPercentage : 0;

  // Handle Monthly Income Changes
  const handleChangeMonthlyIncome = (monthlyIncomeValue) => {
    // Checks if montlhy income has already a value
    if (monthlyIncome > 0) {
      setModalType(0);
      setAmountToUpdateMonthlyIncome(parseInt(monthlyIncomeValue));
      onOpenCustomModal();
      return;
    }

    setMonthlyIncome(parseInt(monthlyIncomeValue));
  };

  // Reset Monthly Income
  const handleResetMonthlyIncome = () => {
    setMonthlyIncome(0);
    onCloseCustomModal();
  };

  // Update Monthly Income
  const handleUpdateMonthlyIncome = (amount) => {
    setMonthlyIncome((prevValue) => prevValue + amount);
    setAmountToUpdateMonthlyIncome(0);
    onCloseCustomModal();
  };

  const handleOpenAddNewExpenseModal = () => {
    onOpenAddExpenseModal();
  };

  const handleAddNewExpense = (formData) => {
    // Convert string date to Date Object
    const expenseDate = new Date(formData.date);

    // Creating Expense object
    const newExpense = {
      id: expenseIdGenerator,
      date: expenseDate,
      amount: +formData.amount,
      description: formData.description,
      category: formData.category,
    };

    setExpenses((prevExpenses) => [...prevExpenses, newExpense]); // Update Array of expenses
    setExpenseIdGenerator((previousId) => ++previousId); // Update Id Generator
    setSelectedMonthYear(expenseDate);
  };

  const handleMonthYearChange = (e) => {
    // Split the string into month and year
    const [month, year] = e.target.value.split('/');
    // Create a new Date object with the year, month (zero-based), and day (1)
    const date = new Date(year, month - 1, 1);
    setSelectedMonthYear(date);
  };

  const editExpense = (expenseId, formData) => {
    // const newExpenses = expenses.map((expense) => {
    //   if (expense.id === expenseId) {
    //     return { ...expense, ...formData };
    //   }
    //   return expense;
    // });
    // setExpenses(newExpenses);
    // onCloseAddExpenseModal();
  };

  const handleEditExpense = (expenseId) => {
    // setExpenseIdToEditOrDelete(expenseId);
    setExpenseIdToEditOrDelete(expenseId);
    onOpenEditExpenseModal();
  };

  const deleteExpense = (expenseId) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== expenseId);
    // Update the state with the modified expenses
    setExpenses(updatedExpenses);
    // Reset ExpenseId
    setExpenseIdToEditOrDelete(undefined);
    onCloseCustomModal();
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenseIdToEditOrDelete(expenseId);
    setModalType(1);
    onOpenCustomModal();
  };

  const currentExpenseToEdit = expenses.length > 0 ? expenses.filter((expense) => expense.id === expenseIdToEditOrDelete)[0] : undefined;

  // const editExpenseModal = expenseToEdit && <EditExpenseModal isOpen={isOpenEditExpenseModal} onClose={onCloseEditExpenseModal} onComplete={editExpense} />;

  const editExpenseModal = currentExpenseToEdit && (
    <EditExpenseModal
      isOpen={isOpenEditExpenseModal}
      onClose={onCloseEditExpenseModal}
      onHandleEditExpense={editExpense}
      monthlyIncome={monthlyIncome}
      expenseToEdit={currentExpenseToEdit}
    />
  );

  return (
    // Wrapper
    <Flex bg="#f1f3f4" flex="6" overflowY="auto">
      {/* Main Container */}
      <Flex mt="2.5rem" mx={marginXMainContainer} flexDirection="column" width="100%" gap="2.5rem">
        <CustomModal isOpen={isOpenCustomModal} onClose={onCloseCustomModal} title={modalTitle} bodyContent={modalBody} buttons={modalButtons} />
        <AddNewExpenseModal isOpen={isOpenAddExpenseModal} onClose={onCloseAddExpenseModal} onHandleAddNewExpense={handleAddNewExpense} monthlyIncome={monthlyIncome} />
        {/* <EditExpenseModal
          isOpen={isOpenEditExpenseModal}
          onClose={onCloseEditExpenseModal}
          onHandleEditExpense={editExpense}
          monthlyIncome={monthlyIncome}
          expenseToEdit={currentExpenseToEdit}
        /> */}
        {editExpenseModal}
        <MonthlyIncomeContainerV2 monthlyIncomeValue={monthlyIncome} onChangeMonthlyIncome={handleChangeMonthlyIncome} />
        {/* Stats */}
        <Grid templateColumns={statusGridTemplateColumns} gap={6}>
          <GridItem>
            <Stats title={'Total Saved Balance'} amount={`$${totalSavedBalance}`} percentage={'0%'} />
          </GridItem>
          <GridItem>
            <Stats title={'Total Expenses Amount'} amount={`$${totalExpensesAmount}`} percentage={'0%'} />
          </GridItem>
          <GridItem>
            <Stats title={'Current Month Balance'} amount={`$${currentMonthBalance}`} percentage={'0%'} />
          </GridItem>
          <GridItem>
            <Stats title={'Current Month Expenses'} amount={`$${currentMonthExpenses}`} percentage={'0%'} />
          </GridItem>
          <GridItem>
            <Stats title={'(%) Monthly Expenses'} amount={`${currentMonthlyExpensePercentageLabel.toFixed(1)}%`} percentage={'0%'} />
          </GridItem>
        </Grid>
        <ExpensesContainer
          expensesArray={expenses}
          onAddNewExpense={handleOpenAddNewExpenseModal}
          expensesMonthsAndYearsArray={expenseMonths}
          expenseMothAndYearSelected={selectedMonthYear}
          monthlyIncome={monthlyIncome}
          onChangeMonthAndYearKey={handleMonthYearChange}
          onDeleteExpense={handleDeleteExpense}
          onEditExpense={handleEditExpense}
        />
      </Flex>
    </Flex>
  );
}

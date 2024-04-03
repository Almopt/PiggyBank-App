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

let idAcc = 0;

export default function MainContainerV2() {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [modalType, setModalType] = useState(0);
  const [amountToUpdateMonthlyIncome, setAmountToUpdateMonthlyIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  console.log('expenses:', expenses);
  const [selectedMonthYear, setSelectedMonthYear] = useState();
  const [isEditingExpense, setIsEditingExpense] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(); // useState(undefined) [It is the same]
  const [expenseIdToEditOrDelete, setExpenseIdToEditOrDelete] = useState(0);


  // If the expenses were a single flat array, you could filter them like this
  // const monthlyExpenses = expenses.filter(expense => {
  //   const date = new Date(expense.date);
  //   const month = date.getMonth() + 1;
  //   const year = date.getFullYear();
  //   const selectedMonth = selectedMonthYear.getMonth() + 1;
  //   const selectedYear = selectedMonthYear.getFullYear();
  //   return month === selectedMonth && year === selectedYear;
  // })

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

  // Stats Values

  const totalSavedBalance = Object.keys(expenses).reduce((acc, monthYearKey) => {
    const sumOfMonth = expenses[monthYearKey].reduce((acc, item) => acc + parseFloat(item.amount), 0);
    const difference = monthlyIncome - sumOfMonth;
    return acc + difference;
  }, 0);

  const totalExpensesAmount = Object.values(expenses).reduce((acc, month) => {
    // Rewrite this with a nested reduce, like for totalSavedBalance
    month.forEach((item) => {
      acc += parseFloat(item.amount);
    });
    return +acc.toFixed(1);
  }, 0);

  const selectedMonthYearKey = selectedMonthYear ? `${selectedMonthYear.getMonth() + 1}/${selectedMonthYear.getFullYear()}` : '';

  const currentMonthlyExpenses = selectedMonthYearKey ? expenses[selectedMonthYearKey].reduce((acc, item) => acc + parseFloat(item.amount), 0) : 0;
  const selectedMonthBalance = monthlyIncome - currentMonthlyExpenses;
  // const currentMonthlyBalance = () => {
  //   let sum = 0;
  //   for (const key in expenses) {
  //     if (key === selectedMonthYearKey) {
  //       expenses[key].forEach((item) => {
  //         sum += parseFloat(item.amount);
  //       });
  //     }
  //   }
  //   return monthlyIncome - sum;
  // };


  const currentMonthlyExpenseRatio = currentMonthlyExpenses / monthlyIncome
  const currentMonthlyExpensePercentage = currentMonthlyExpenseRatio * 100
  const currentMonthlyExpensePercentageLabel = currentMonthlyExpensePercentage.toFixed(1)

  const expenseMonths = Object.keys(expenses);

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
    // Use a state variable, maybe use expenses.length + 1?
    const expenseId = ++idAcc;

    // Add the id field to formData
    const expenseWithId = { ...formData, id: expenseId };

    const expenseDate = new Date(expenseWithId.date);
    const monthYearKey = `${expenseDate.getMonth() + 1}/${expenseDate.getFullYear()}`;

    // Update dates object with the new object
    const updatedDates = { ...expenses };
    if (!updatedDates[monthYearKey]) {
      updatedDates[monthYearKey] = [];
    }
    updatedDates[monthYearKey].push(expenseWithId);
    setExpenses(updatedDates);
    setSelectedMonthYear(expenseDate);
  };

  const handleMonthYearKeyChange = (e) => {
    const parts = e.target.value.split('/');
    const month = parts[0];
    const year = parts[1];
    const date = new Date(year, month - 1, 1);
    setSelectedMonthYear(date);
  };

  const editExpense = (expenseId, formData) => {
    const newExpenses = expenses.map((expense) => {
      if (expense.id === expenseId) {
        return { ...expense, ...formData };
      }
      return expense;
    });
    setExpenses(newExpenses);
    onCloseAddExpenseModal();
  };

  const handleEditExpense = (expenseId) => {
    // setExpenseIdToEditOrDelete(expenseId);
    setExpenseToEdit(expenses[selectedMonthYearKey].filter((expense) => expense.id === expenseId)[0]);
    onOpenEditExpenseModal()
  };

  const deleteExpense = (expenseId) => {
    const updatedExpenses = { ...expenses };

    // Check if the selectedMonthYearKey exists in expenses
    if (updatedExpenses[selectedMonthYearKey]) {
      // Filter out the expense with the given id
      updatedExpenses[selectedMonthYearKey] = updatedExpenses[selectedMonthYearKey].filter((expense) => expense.id !== expenseId);
    }

    // Update the state with the modified expenses
    setExpenses(updatedExpenses);
    // Reset ExpenseId
    setExpenseIdToEditOrDelete(0);
    onCloseCustomModal();
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenseIdToEditOrDelete(expenseId);
    setModalType(1);
    onOpenCustomModal();
  };

  const customCloseExpenseModal = () => {
    // setExpenseToEdit({});
    onCloseAddExpenseModal();
  };


  const editExpenseModal = expenseToEdit && (
    <EditExpenseModal
      isOpen={isOpenEditExpenseModal}
      onClose={onCloseEditExpenseModal}
      onComplete={editExpense}
    />
  )

  return (
    // Wrapper
    <Flex bg="#f1f3f4" flex="6" overflowY="auto">
      {/* Main Container */}
      <Flex mt="2.5rem" mx={marginXMainContainer} flexDirection="column" width="100%" gap="2.5rem">
        <CustomModal isOpen={isOpenCustomModal} onClose={onCloseCustomModal} title={modalTitle} bodyContent={modalBody} buttons={modalButtons} />
        <AddNewExpenseModal
          isOpen={isOpenAddExpenseModal}
          onClose={customCloseExpenseModal}
          onHandleAddNewExpense={handleAddNewExpense}
          monthlyIncome={monthlyIncome}
          // isEditing={isEditingExpense}
          expenseToEdit={expenseToEdit}
        />
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
            <Stats title={'Current Month Balance'} amount={`$${selectedMonthBalance}`} percentage={'0%'} />
          </GridItem>
          <GridItem>
            <Stats title={'Current Month Expenses'} amount={`$${currentMonthlyExpenses}`} percentage={'0%'} />
          </GridItem>
          <GridItem>
            <Stats title={'(%) Monthly Expenses'} amount={`${currentMonthlyExpensePercentageLabel}%`} percentage={'0%'} />
          </GridItem>
        </Grid>
        <ExpensesContainer
          expensesArray={expenses}
          onAddNewExpense={handleOpenAddNewExpenseModal}
          expensesMonthsAndYearsArray={expenseMonths}
          expenseMothAndYearSelected={selectedMonthYearKey}
          monthlyIncome={monthlyIncome}
          onChangeMonthAndYearKey={handleMonthYearKeyChange}
          onDeleteExpense={handleDeleteExpense}
          onEditExpense={handleEditExpense}
        />
      </Flex>
    </Flex>
  );
}

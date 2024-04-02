import { useState } from 'react';

import { Flex, useBreakpointValue, useDisclosure, Grid, GridItem } from '@chakra-ui/react';
import MonthlyIncomeContainerV2 from './MonthlyIncomeContainerV2';
import CustomModal from './CustomModal';
import Stats from './Stats';
import ExpensesContainer from './ExpensesContainer';
import AddNewExpenseModal from './AddNewExpenseModal';

const MODAL_TITLE_EDIT_RESET_MONTHLY_INCOME = 'Edit / Reset Montlhy Income';
const MODAL_BODY_EDIT_RESET_MONTHLY_INCOME = 'Would you like to reset your monthly income or just add it to the current one?';

export default function MainContainerV2() {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [modalType, setModalType] = useState(0);
  const [amountToUpdateMonthlyIncome, setAmountToUpdateMonthlyIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [selectedMonthYearKey, setSelectedMonthYearKey] = useState('');

  const { isOpen: isOpenCustomModal, onOpen: onOpenCustomModal, onClose: onCloseCustomModal } = useDisclosure();
  const { isOpen: isOpenAddExpenseModal, onOpen: onOpenAddExpenseModal, onClose: onCloseAddExpenseModal } = useDisclosure();

  const marginXMainContainer = useBreakpointValue({ base: '2rem', sm: '2rem', md: '2rem', lg: '4rem', xl: '4 rem', '2xl': '4rem' });
  const statusGridTemplateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(3, 1fr)',
    xl: 'repeat(4, 1fr)',
    '2xl': 'repeat(5, 1fr)',
  });

  // Modal Variables
  const modalTitle = modalType === 0 ? MODAL_TITLE_EDIT_RESET_MONTHLY_INCOME : '';
  const modalBody = modalType === 0 ? MODAL_BODY_EDIT_RESET_MONTHLY_INCOME : '';
  const modalButtons =
    modalType === 0
      ? [
          { label: 'Reset', colorScheme: 'orange', onClick: () => handleResetMonthlyIncome() },
          { label: 'Update', colorScheme: 'orange', onClick: () => handleUpdateMonthlyIncome(amountToUpdateMonthlyIncome) },
        ]
      : [];

  // Stats Values
  const totalSavedBalance = Object.keys(expenses).reduce((acc, monthYearKey) => {
    const sumOfMonth = expenses[monthYearKey].reduce((acc, item) => acc + parseFloat(item.amount), 0);
    const difference = monthlyIncome - sumOfMonth;
    return acc + difference;
  }, 0);

  const totalExpensesAmount = Object.values(expenses).reduce((acc, month) => {
    month.forEach((item) => {
      acc += parseFloat(item.amount);
    });
    return +acc.toFixed(1);
  }, 0);

  const currentMonthlyBalance = () => {
    let sum = 0;
    for (const key in expenses) {
      if (key === selectedMonthYearKey) {
        expenses[key].forEach((item) => {
          sum += parseFloat(item.amount);
        });
      }
    }
    return monthlyIncome - sum;
  };

  const currentMonthlyExpenses = selectedMonthYearKey ? expenses[selectedMonthYearKey].reduce((acc, item) => acc + parseFloat(item.amount), 0) : 0;

  const currentPercentageMonthlyExpenses = selectedMonthYearKey
    ? ((expenses[selectedMonthYearKey].reduce((acc, item) => acc + parseFloat(item.amount), 0) / monthlyIncome) * 100).toFixed(1)
    : 0;

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
    const expenseDate = new Date(formData.date);
    const monthYearKey = `${expenseDate.getMonth() + 1}/${expenseDate.getFullYear()}`;

    // Update dates object with the new object
    const updatedDates = { ...expenses };
    if (!updatedDates[monthYearKey]) {
      updatedDates[monthYearKey] = [];
    }
    updatedDates[monthYearKey].push(formData);
    setExpenses(updatedDates);
    setSelectedMonthYearKey(monthYearKey);
  };

  const handleMonthYearKeyChange = (e) => {
    setSelectedMonthYearKey(e.target.value);
  };

  return (
    // Wrapper
    <Flex bg="#f1f3f4" flex="6" overflowY="auto">
      {/* Main Container */}
      <Flex mt="2.5rem" mx={marginXMainContainer} flexDirection="column" width="100%" gap="2.5rem">
        <CustomModal isOpen={isOpenCustomModal} onClose={onCloseCustomModal} title={modalTitle} bodyContent={modalBody} buttons={modalButtons} />
        <AddNewExpenseModal isOpen={isOpenAddExpenseModal} onClose={onCloseAddExpenseModal} onHandleAddNewExpense={handleAddNewExpense} monthlyIncome={monthlyIncome} />
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
            <Stats title={'Current Month Balance'} amount={`$${currentMonthlyBalance()}`} percentage={'0%'} />
          </GridItem>
          <GridItem>
            <Stats title={'Current Month Expenses'} amount={`$${currentMonthlyExpenses}`} percentage={'0%'} />
          </GridItem>
          <GridItem>
            <Stats title={'(%) Monthly Expenses'} amount={`${currentPercentageMonthlyExpenses}%`} percentage={'0%'} />
          </GridItem>
        </Grid>
        <ExpensesContainer
          expensesArray={expenses}
          onAddNewExpense={handleOpenAddNewExpenseModal}
          expensesMonthsAndYearsArray={expenseMonths}
          expenseMothAndYearSelected={selectedMonthYearKey}
          monthlyIncome={monthlyIncome}
          onChangeMonthAndYearKey={handleMonthYearKeyChange}
        />
      </Flex>
    </Flex>
  );
}

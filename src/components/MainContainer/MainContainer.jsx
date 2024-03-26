import { useState } from 'react';

import {
  Box,
  Flex,
  Button,
  HStack,
  Text,
  Input,
  useBreakpointValue,
  useDisclosure,
  Heading,
  Divider,
  Select,
  FormLabel,
  NumberInput,
  NumberInputField,
  FormControl,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Stats from './Stats.jsx';
import CustomModal from './CustomModal.jsx';
import Expense from './Expense.jsx';
import MonthlyIncomeForm from './MonthlyIncomeForm.jsx';

let counter = 0;
const ADD_OPERATION = 'ADD';
const EDIT_DELETE_OPERATION = 'EDIT_DEL';

export default function MainContainer() {
  const [monthlyIncome, setMonthlyIncome] = useState('$0');
  const [savedBalance, setSavedBalance] = useState('$0');
  const [totalExpenses, setTotalExpenses] = useState('$0');
  const [currentMonthBalance, setCurrentMonthBalance] = useState('$0');
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState('$0');
  const [currentPercentageMonthExpenses, setCurrentPercentageMonthExpenses] = useState('$0');
  const [invalidExpense, setInvalidExpense] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalBodyContent, setModalBodyContent] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalButtons, setModalButtons] = useState([]);
  const [expensesArray, setExpensesArray] = useState([]);
  const [expenseFormData, setExpenseFormData] = useState({
    expenseAmount: '',
    description: '',
    category: '',
    date: '',
  });
  const [monthsOfExpenses, setMonthsOfExpenses] = useState([]);
  const [selectedMonthsOfExpensesValue, setSelectedMonthsOfExpensesValue] = useState(undefined);

  const expenseButtons = [handleEditExpense, handleDeleteExpense];

  // Create a new Date object
  // const currentDate = new Date();

  // // Get the current date in YYYY-MM-DD format
  // const currentDateYear = currentDate.getFullYear();
  // const currentDateMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding zero padding if needed
  // const currentDateDay = String(currentDate.getDate()).padStart(2, '0'); // Adding zero padding if needed

  // Get current date
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
  const currentYear = currentDate.getFullYear();

  const customOnClose = () => {
    console.log('Custom onClose');
    console.trace();
    onClose();
  };

  // Dynamically get flex direction based on breakpoints
  const monthlyIncomeContainerflexDirection = useBreakpointValue({
    base: 'column',
    sm: 'column',
    md: 'column',
    lg: 'row',
    xl: 'row',
    '2xl': 'row',
  });

  // Dynamically get width based on breakpoints
  const monthlyIncomeContainerWidth = useBreakpointValue({ base: '100%', md: '100%', lg: '100%', xl: '50%', '2xl': '50%' });

  const expensesContainerFlexDirection = useBreakpointValue({
    base: 'column',
    sm: 'column',
    md: 'column',
    lg: 'column',
    xl: 'row',
    '2xl': 'row',
  });

  const expensesContainerWidth = useBreakpointValue({
    base: '100%',
    sm: '100%',
    md: '100%',
    lg: '100%',
    xl: '60%',
    '2xl': '60%',
  });

  const expensesContainerFormWidth = useBreakpointValue({
    base: '100%',
    sm: '100%',
    md: '100%',
    lg: '100%',
    xl: '40%',
    '2xl': '40%',
  });

  const options = {
    style: 'decimal',
    useGrouping: true, // Enables thousands separator
    currency: 'USD',
  };

  function setMonthsOfExpensesAux(date) {
    let specificDate = new Date(date); // Specific date and time
    const specificDateYear = specificDate.getFullYear();
    const specificDateMonth = String(specificDate.getMonth() + 1).padStart(2, '0'); // Adding zero padding if needed

    const newMonthFormated = `${specificDateMonth}/${specificDateYear}`;

    if (!monthsOfExpenses.some((expense) => expense.monthFormated === newMonthFormated)) {
      setMonthsOfExpenses((prevArray) => [...prevArray, { date: specificDate, monthFormated: newMonthFormated }]);
    }
  }

  function isMonthlyInputFilled(amount) {
    if (parseInt(monthlyIncome.substring(1)) > 0) {
      setModalTitle('Edit / Reset Montlhy Income');
      setModalBodyContent(`Would you like to reset your monthly income or just add it
      to the current one?`);
      setModalButtons((prevArrayButtons) => {
        prevArrayButtons = [];
        prevArrayButtons = [
          { label: 'Reset', colorScheme: 'orange', onClick: () => handleResetMonthlyIncome() },
          { label: 'Update', colorScheme: 'orange', onClick: () => handleUpdateMonthlyIncome(amount) },
        ];

        return prevArrayButtons;
      });
      onOpen();
      return true;
    }
    return false;
  }

  function handleConfirmMonthlyIncome(amount) {
    // Checks if the input is empty
    if (amount.trim() === '') {
      setErrorMessage('Input cannot be empty');

      // Checks if input isn't a number
    } else if (isNaN(amount)) {
      setErrorMessage('Input must be a number');
    } else {
      // Checks if we already have a current Montlhy Income
      if (isMonthlyInputFilled(amount)) {
        return;
      }
      // Clear any previous error message if input is valid
      setErrorMessage('');
      setMonthlyIncome(`$${Number(amount).toLocaleString('en-US', options)}`);
      setCurrentMonthBalance(`$${Number(amount).toLocaleString('en-US', options)}`);
    }
  }

  function handleResetMonthlyIncome() {
    setMonthlyIncome(`$0`);
    onClose();
  }

  function handleUpdateMonthlyIncome(amount) {
    const newMontlhyIncome = Number(amount) + +monthlyIncome.substring(1).replace(/[^0-9.-]+/g, '');
    setMonthlyIncome(`$${newMontlhyIncome.toLocaleString('en-US', options)}`);
    setCurrentMonthBalance(`$${newMontlhyIncome.toLocaleString('en-US', options)}`);
    onClose();
  }

  function handleInputExpenseFormChange(e) {
    const { name, value } = e.target;
    setExpenseFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleInvalidExpense() {
    setInvalidExpense((prevValue) => !prevValue);
    setExpenseFormData((prevState) => ({
      ...prevState,
      expenseAmount: '',
    }));
  }

  function resetExpenseFormData() {
    setExpenseFormData({
      expenseAmount: '',
      description: '',
      category: '',
      date: '',
    });
  }

  function updatePercentageMonthlyExpenses(currentMBalance) {
    setCurrentPercentageMonthExpenses(`${(100 - (currentMBalance * 100) / +monthlyIncome.substring(1).replace(/[^0-9.-]+/g, '')).toFixed(1)}%`);
  }

  function handleAddEditExpense(event) {
    event.preventDefault();

    // Checks if it's a valid expense
    if (+currentMonthBalance.substring(1).replace(/[^0-9.-]+/g, '') - Number(expenseFormData.expenseAmount) < 0) {
      handleInvalidExpense();
    } else {
      if (invalidExpense) {
        setInvalidExpense((prevValue) => !prevValue);
      }
      setExpensesArray((prevArray) => [...prevArray, { ...expenseFormData, id: ++counter }]);
      resetExpenseFormData();
      updateStats(expenseFormData.expenseAmount, ADD_OPERATION, expenseFormData.date);
      setMonthsOfExpensesAux(expenseFormData.date);
    }
  }

  function handleEditExpense(expenseId) {
    for (const expense of expensesArray) {
      if (expense.id === expenseId) {
        setExpenseFormData({
          expenseAmount: expense.expenseAmount,
          description: expense.description,
          category: expense.category,
          date: expense.date,
        });

        updateStats(expense.expenseAmount, EDIT_DELETE_OPERATION, expense.date);

        setExpensesArray((prevExpensesArray) => {
          prevExpensesArray.pop();
          return prevExpensesArray;
        });
      }
    }
  }

  function handleDeleteExpense(expenseId) {
    setModalTitle('Delete Expense');
    setModalBodyContent('Are you sure you want to delete this expense?');
    setModalButtons((prevArrayButtons) => {
      prevArrayButtons = [];
      prevArrayButtons = [{ label: 'Delete', colorScheme: 'orange', onClick: () => deleteExpense(expenseId) }];

      return prevArrayButtons;
    });
    onOpen();
  }

  function deleteExpense(id) {
    for (const expense of expensesArray) {
      if (expense.id === id) {
        updateStats(expense.expenseAmount, EDIT_DELETE_OPERATION);
        setExpensesArray((prevExpensesArray) => {
          return prevExpensesArray.filter((item) => item !== expense);
        });
      }
    }
    onClose();
  }

  function updateStats(amount, operation, date) {
    // // Get current date
    // const currentDate = new Date();
    // const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
    // const currentYear = currentDate.getFullYear();

    // Get expense Date
    const expenseDate = new Date(date);

    if (operation === ADD_OPERATION) {
      // Check if the expense's date has the same month and year as the current month and year
      if (expenseDate.getMonth() + 1 === currentMonth && expenseDate.getFullYear() === currentYear) {
        setCurrentMonthBalance((prevAmount) => {
          const currentMonthlyBalanceAfterCalculations = +prevAmount.substring(1).replace(/[^0-9.-]+/g, '') - Number(amount);
          updatePercentageMonthlyExpenses(currentMonthlyBalanceAfterCalculations);
          return `$${(+prevAmount.substring(1).replace(/[^0-9.-]+/g, '') - Number(amount)).toLocaleString('en-US', options)}`;
        });

        setCurrentMonthExpenses((prevAmount) => {
          return `$${(+prevAmount.substring(1).replace(/[^0-9.-]+/g, '') + Number(amount)).toLocaleString('en-US', options)}`;
        });
      }
      setTotalExpenses((prevAmount) => {
        return `$${(+prevAmount.substring(1).replace(/[^0-9.-]+/g, '') + Number(amount)).toLocaleString('en-US', options)}`;
      });
    } else {
      // Check if the expense's date has the same month and year as the current month and year
      if (expenseDate.getMonth() + 1 === currentMonth && expenseDate.getFullYear() === currentYear) {
        setCurrentMonthBalance((prevAmount) => {
          const currentMonthlyBalanceAfterCalculations = +prevAmount.substring(1).replace(/[^0-9.-]+/g, '') + Number(amount);
          updatePercentageMonthlyExpenses(currentMonthlyBalanceAfterCalculations);
          return `$${(+prevAmount.substring(1).replace(/[^0-9.-]+/g, '') + Number(amount)).toLocaleString('en-US', options)}`;
        });

        setCurrentMonthExpenses((prevAmount) => {
          return `$${(+prevAmount.substring(1).replace(/[^0-9.-]+/g, '') - Number(amount)).toLocaleString('en-US', options)}`;
        });
      }

      setTotalExpenses((prevAmount) => {
        return `$${(+prevAmount.substring(1).replace(/[^0-9.-]+/g, '') - Number(amount)).toLocaleString('en-US', options)}`;
      });
    }
  }

  function getFilteredExpensesByDate(date) {
    const dateSelected = new Date(date);
    const monthOfDateSelected = dateSelected.getMonth() + 1;
    const yearOfDateSelected = dateSelected.getFullYear();

    return expensesArray.filter((exp) => {
      // Extract month and year from the 'date' property of each object
      const objDate = new Date(exp.date);
      const objMonth = objDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
      const objYear = objDate.getFullYear();
      return objMonth === monthOfDateSelected && objYear === yearOfDateSelected;
    });
  }

  function handleMonthOfExpensesSelectChange(event) {
    setSelectedMonthsOfExpensesValue(event.target.value);

    const filteredExpensesArray = getFilteredExpensesByDate(event.target.value);

    // Calculate the total expenseAmount by summing the expenseAmount property of all objects in the array
    const totalExpenseAmount = filteredExpensesArray.reduce((total, obj) => {
      return total + +obj.expenseAmount;
    }, 0);

    const currentMonthlyBalanceAfterCalculations = +monthlyIncome.substring(1).replace(/[^0-9.-]+/g, '') - totalExpenseAmount.toLocaleString('en-US', options);

    // Update Current Month Balance
    setCurrentMonthBalance(`$${+monthlyIncome.substring(1).replace(/[^0-9.-]+/g, '') - totalExpenseAmount.toLocaleString('en-US', options)}`);

    // Update Current Month Expenses
    setCurrentMonthExpenses(`$${totalExpenseAmount.toLocaleString('en-US', options)}`);

    // Update Percentage Montlhy Expenses
    updatePercentageMonthlyExpenses(currentMonthlyBalanceAfterCalculations);
  }

  return (
    // Wrapper
    <Flex bg="#f1f3f4" flexDirection="column" flex="6" overflowY="auto">
      {/* Main Container */}
      <Flex mt="2.5rem" mx="4rem" flexDirection="column">
        <CustomModal isOpen={isOpen} onClose={customOnClose} title={modalTitle} bodyContent={modalBodyContent} buttons={modalButtons} />
        {/* Monthly Income Container */}
        <Flex
          gap="1rem"
          bg="white"
          p="1rem"
          // border="1px"
          borderRadius="0.6rem"
          width={monthlyIncomeContainerWidth}
          justifyContent="space-between"
          boxShadow="base"
          flexDirection={monthlyIncomeContainerflexDirection}
        >
          <Flex flexDirection="column">
            <Text fontSize="2xl">Montly Income</Text>
            <Text fontSize="3xl" fontWeight="bold">
              {monthlyIncome}
            </Text>
          </Flex>
          <MonthlyIncomeForm income={monthlyIncome} onConfirmIncome={handleConfirmMonthlyIncome} errorMessage={errorMessage} />
        </Flex>
        {/* Stats Container */}
        <HStack spacing="2rem" mt="2.5rem" flexWrap="wrap">
          <Stats title="Total Saved Balance" amount="$0" percentage="0%" />
          <Stats title="Total Expenses Amount" amount={totalExpenses} percentage="0%" />
          <Stats title="Current Month Balance" amount={currentMonthBalance} percentage="0%" />
          <Stats title="Current Month Expenses" amount={currentMonthExpenses} percentage="0%" />
          <Stats title="(%) Monthly Expenses" amount={currentPercentageMonthExpenses} percentage="0%" />
        </HStack>
        {/* Expenses Container */}
        <Flex flexDirection={expensesContainerFlexDirection} gap="2rem">
          {/* Check Expenses Container */}
          <Flex mt="2.5rem" gap="1rem" bg="white" p="1rem" borderRadius="0.6rem" boxShadow="base" flexDirection="column" width={expensesContainerWidth}>
            {/* Title */}
            <Flex justifyContent="space-between">
              <Heading as="h2" size="lg" alignSelf="center">
                Expenses
              </Heading>
              <Box>
                <Select variant="filled" value={selectedMonthsOfExpensesValue} onChange={handleMonthOfExpensesSelectChange}>
                  {monthsOfExpenses.map((month, index) => {
                    return (
                      <option key={index} value={month.date}>
                        {month.monthFormated}
                      </option>
                    );
                  })}
                </Select>
              </Box>
            </Flex>
            <Divider size="2xl" />
            {/* Expenses */}
            {expensesArray.map((expense) => {
              const expenseDate = new Date(expense.date);
              let currentDate = new Date();
              if (selectedMonthsOfExpensesValue !== undefined) {
                currentDate = new Date(selectedMonthsOfExpensesValue);
              }
              const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
              const currentYear = currentDate.getFullYear();

              // Check if the expense's date has the same month and year as the current month and year
              if (expenseDate.getMonth() + 1 === currentMonth && expenseDate.getFullYear() === currentYear) {
                return (
                  <Expense
                    key={expense.id}
                    id={expense.id}
                    description={expense.description}
                    category={expense.category}
                    date={expense.date}
                    expenseAmount={expense.expenseAmount}
                    handleButtons={expenseButtons}
                  />
                );
              } else {
                return null; // Don't render the Expense component if it's not for the current month and year
              }
            })}
          </Flex>
          {/* Add/Update Expenses Container */}
          <Flex
            mt="2.5rem"
            gap="1rem"
            bg="white"
            p="1rem"
            borderRadius="0.6rem"
            justifyContent="space-between"
            boxShadow="base"
            flexDirection="column"
            width={expensesContainerFormWidth}
          >
            {/* Title */}
            <Flex flexDirection="column" gap="0.5rem">
              <Heading as="h2" size="lg">
                Add Expense
              </Heading>
              <Text color="blackAlpha.600">Enter the details of your expensive to help you track your spending</Text>
            </Flex>
            <Divider size="2xl" />
            {/* Expenses Form */}
            <form onSubmit={handleAddEditExpense}>
              <Flex flexDirection="column" gap="1rem">
                <Box>
                  <FormControl isRequired isDisabled={currentMonthBalance === '$0'}>
                    <FormLabel>Amount</FormLabel>
                    <NumberInput min={1} variant="filled" value={expenseFormData.expenseAmount}>
                      <NumberInputField name="expenseAmount" placeholder="Enter the amount" onChange={handleInputExpenseFormChange} />
                    </NumberInput>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired isDisabled={currentMonthBalance === '$0'}>
                    <FormLabel>Description</FormLabel>
                    <Input
                      name="description"
                      variant="filled"
                      type="text"
                      placeholder="Enter a detail description"
                      value={expenseFormData.description}
                      onChange={handleInputExpenseFormChange}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired isDisabled={currentMonthBalance === '$0'}>
                    <FormLabel>Category</FormLabel>
                    <Select name="category" variant="filled" placeholder="Select a Category" value={expenseFormData.category} onChange={handleInputExpenseFormChange}>
                      <option value="housing">Housing</option>
                      <option value="transportation">Transportation</option>
                      <option value="food">Food</option>
                      <option value="utilities">Utilities</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="debt-payments">Debt Payments</option>
                      <option value="saving-investments">Savings and Investments</option>
                      <option value="insurance">Insurance</option>
                      <option value="entertainment">Entertainment</option>
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired isDisabled={currentMonthBalance === '$0'}>
                    <FormLabel>Date</FormLabel>
                    {/* <Input variant="filled" type="date" value={`${year}-${month}-${day}`} /> */}
                    <Input name="date" variant="filled" type="date" value={expenseFormData.date} onChange={handleInputExpenseFormChange} />
                  </FormControl>
                </Box>
                <Button
                  mt="2rem"
                  leftIcon={<AddIcon />}
                  bg="primaryRed"
                  variant="solid"
                  alignSelf="center"
                  size="lg"
                  width="100%"
                  color="white"
                  isDisabled={currentMonthBalance === '$0'}
                  _hover={{ background: 'blackAlpha.500' }}
                  _active={{ background: 'blackAlpha.800' }}
                  type="submit"
                >
                  Add Expense
                </Button>
                {invalidExpense && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Expense Invalid!</AlertTitle>
                    <AlertDescription>Not enough funds for this expense</AlertDescription>
                  </Alert>
                )}
              </Flex>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

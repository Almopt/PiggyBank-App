import './App.css';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import MainContainer from './components/MainContainer/MainContainer.jsx';
import { Flex } from '@chakra-ui/react';

function App() {
  return (
    <Flex h="calc(100vh)">
      <Sidebar />
      <MainContainer />
    </Flex>
  );
}

export default App;

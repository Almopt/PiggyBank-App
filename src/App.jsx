import './App.css';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import MainContainer from './components/MainContainer/MainContainer.jsx';
import { Flex, useBreakpointValue } from '@chakra-ui/react';

function App() {
  // Conditionally render Sidebar based on screen size
  const isSidebarVisible = useBreakpointValue({ base: false, lg: true });

  return (
    //h="calc(100vh)"
    <Flex h="100vh">
      {isSidebarVisible && <Sidebar />}
      <MainContainer />
    </Flex>
  );
}

export default App;

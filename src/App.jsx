import './App.css';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import MainContainer from './components/MainContainer/MainContainer.jsx';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import MainContainerV2 from './components/MainContainer/MainContainerV2.jsx';

function App() {
  // Conditionally render Sidebar based on screen size
  const isSidebarVisible = useBreakpointValue({ base: false, lg: true });

  return (
    //h="calc(100vh)"
    <Flex h="100vh">
      {isSidebarVisible && <Sidebar />}
      {/* <Flex flexDirection="column" flex="6">
        <MainContainer /> */}
      {/* <MainContainer /> */}
      <MainContainerV2 />
      {/* </Flex> */}
    </Flex>
  );
}

export default App;

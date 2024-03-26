import { useState } from 'react';
import logoImg from '../../assets/logo.png';
import { Text, Stack, HStack, Heading, VStack, Divider, Flex, Avatar, background } from '@chakra-ui/react';
import SidebarButton from '../SidebarButton/SidebarButton.jsx';

export default function Sidebar() {
  const [seletedTab, setSeletecTab] = useState('home');

  function handleMenuTabSelect(selectedTab) {
    setSeletecTab(selectedTab);
  }

  return (
    <Stack bg="primaryRed" justifyContent="space-between" minW="15rem" flex="1">
      <Flex spacing="1rem" flexDirection="column">
        <Flex spacing={0} mt="3rem" px="1.5rem" cursor="pointer">
          <img src={logoImg} alt="Piggy Bank Logo" width={80} />
          <Heading size="md" color="white" alignSelf="center">
            Piggy Bank
          </Heading>
        </Flex>
        <Divider mt="2rem" />
        <VStack width="100%" px="1.5rem" mt="2rem">
          <SidebarButton buttonName="Home" isSelected={seletedTab === 'home'} onClick={() => handleMenuTabSelect('home')}></SidebarButton>
          <SidebarButton buttonName="Expenses" isSelected={seletedTab === 'expenses'} onClick={() => handleMenuTabSelect('expenses')}></SidebarButton>
          <SidebarButton buttonName="Settings" isSelected={seletedTab === 'settings'} onClick={() => handleMenuTabSelect('settings')}></SidebarButton>
        </VStack>
      </Flex>
      <Flex flexDirection="column">
        <Divider />
        <Flex gap="1.5rem" p="2rem">
          <Avatar name="Alexandre Morgado" src="https://bit.ly/dan-abramov" size="md" />
          <Flex flexDirection="column" alignSelf="center">
            <Text color="white">Alexandre Morgado</Text>
            <Text color="white" fontSize="xs" cursor="pointer" _hover={{ color: 'blackAlpha.800' }} textDecoration="underline">
              Logout
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Stack>
  );
}

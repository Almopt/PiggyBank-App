import { useState } from 'react';

import { Flex, Text } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { IoHome } from 'react-icons/io5';
import { TbReportMoney } from 'react-icons/tb';
import { IoMdSettings } from 'react-icons/io';

export default function SidebarButton({ buttonName, isSelected, ...props }) {
  const [hovered, setHovered] = useState(false);

  function getMenuIcon() {
    if (buttonName === 'Home') {
      return IoHome;
    } else if (buttonName === 'Expenses') {
      return TbReportMoney;
    } else {
      return IoMdSettings;
    }
  }

  const menuIcon = getMenuIcon();

  function handleMouseOver() {
    setHovered(true);
  }

  function handleMouseOut() {
    setHovered(false);
  }

  const iconAndText = hovered ? 'white' : 'white';

  const tabButtonMenuBg = () => {
    if (isSelected && !hovered) {
      return 'blackAlpha.500';
    } else {
      return hovered ? 'blackAlpha.300' : '';
    }
  };

  return (
    <Flex
      width="100%"
      mx=".5rem"
      p=".5rem"
      borderRadius="0.3rem"
      gap="0.8rem"
      alignItems="center"
      // bg={isSelected && 'blackAlpha.400'}
      bg={tabButtonMenuBg}
      // _hover={!isSelected ? { background: 'blackAlpha.200' } : { background: 'orange.400' }}
      // _active={!isSelected ? { background: 'blackAlpha.400' } : { background: 'orange.300' }}
      cursor="pointer"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      {...props}
    >
      <Icon as={menuIcon} color={iconAndText} boxSize={5} />
      <Text color={iconAndText} fontSize="lg" as="b">
        {buttonName}
      </Text>
    </Flex>
  );
}

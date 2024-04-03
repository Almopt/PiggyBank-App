import { Button } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

export default function AddExpenseButton({ isDisabled }) {
  return (
    <Button
      mt="2rem"
      leftIcon={<AddIcon />}
      bg="primaryRed"
      variant="solid"
      alignSelf="center"
      size="lg"
      width="100%"
      color="white"
      isDisabled={isDisabled}
      _hover={{ background: 'blackAlpha.500' }}
      _active={{ background: 'blackAlpha.800' }}
      type="submit"
    >
      Add Expense
    </Button>
  )
}
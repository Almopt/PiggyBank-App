import { HStack } from "@chakra-ui/react"
import Stats from "./Stats"

export default function StatsContainer({ totalExpenses, currentMonthBalance, currentMonthExpenses, currentPercentageMonthExpenses }) {
  return (
    <HStack spacing="2rem" mt="2.5rem" flexWrap="wrap">
      <Stats title="Total Saved Balance" amount="$0" percentage="0%" />
      <Stats title="Total Expenses Amount" amount={totalExpenses} percentage="0%" />
      <Stats title="Current Month Balance" amount={currentMonthBalance} percentage="0%" />
      <Stats title="Current Month Expenses" amount={currentMonthExpenses} percentage="0%" />
      <Stats title="(%) Monthly Expenses" amount={currentPercentageMonthExpenses} percentage="0%" />
    </HStack>
  )
}
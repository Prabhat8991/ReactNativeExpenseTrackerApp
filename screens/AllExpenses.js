import ExpensesOutput from "../components/expensesoutput/ExpensesOutput"
import { StyleSheet } from "react-native"
import { GlobalStyles } from "../constants/styles"


function AllExpenses() {
    return (<ExpensesOutput expensesPeriod="All" />)
}

export default AllExpenses

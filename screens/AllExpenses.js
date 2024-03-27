import ExpensesOutput from "../components/expensesoutput/ExpensesOutput"
import { StyleSheet } from "react-native"
import { GlobalStyles } from "../constants/styles"
import { useContext } from "react"
import { ExpensesContext } from "../store/expenses-context"


function AllExpenses() {
    const expensesCtx = useContext(ExpensesContext)

    return (<ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="All" />)
}

export default AllExpenses

import { Text, View, StyleSheet } from "react-native"
import { useLayoutEffect } from "react"
import IconButton from "../components/ui/IconButton"
import { GlobalStyles } from "../constants/styles"
import Button from "../components/ui/Button"
import { useContext } from "react"
import { ExpensesContext } from "../store/expenses-context"
import ExpenseForm from "../components/manageexpense/ExpenseForm"

function ManageExpense({ route, navigation }) {
    const expensesCtx = useContext(ExpensesContext)
    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId

    const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing])

    function deleteExpense() {
        expensesCtx.deleteExpense(editedExpenseId)
        navigation.goBack();

    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler(expenseData) {
        if (isEditing) {
            console.log
            expensesCtx.updateExpense(editedExpenseId, expenseData)
        } else {
            expensesCtx.addExpense(expenseData)
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ExpenseForm defaultValues={selectedExpense} onSubmit={confirmHandler} cancelHandler={cancelHandler} submitButtonLabel={isEditing ? 'Update' : 'Add'} />
            {isEditing && <View style={styles.deleteContainer}><IconButton icon='trash' color={GlobalStyles.colors.error500} size={36} onPress={deleteExpense} /></View>}
        </View>)
}

export default ManageExpense

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },
})
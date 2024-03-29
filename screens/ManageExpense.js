import { Text, View, StyleSheet } from "react-native"
import { useLayoutEffect } from "react"
import IconButton from "../components/ui/IconButton"
import { GlobalStyles } from "../constants/styles"
import Button from "../components/ui/Button"
import { useContext } from "react"
import { ExpensesContext } from "../store/expenses-context"
import ExpenseForm from "../components/manageexpense/ExpenseForm"
import { storeExpense, updateExpense, deleteExpense } from '../util/http'

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

    function onDelete() {
        deleteExpense(editedExpenseId)
        expensesCtx.deleteExpense(editedExpenseId)
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, expenseData)
            updateExpense(editedExpenseId, expenseData)
        } else {
            const id = await storeExpense(expenseData)
            expensesCtx.addExpense({ ...expenseData, id: id })
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ExpenseForm defaultValues={selectedExpense} onSubmit={confirmHandler} cancelHandler={cancelHandler} submitButtonLabel={isEditing ? 'Update' : 'Add'} />
            {isEditing && <View style={styles.deleteContainer}><IconButton icon='trash' color={GlobalStyles.colors.error500} size={36} onPress={onDelete} /></View>}
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
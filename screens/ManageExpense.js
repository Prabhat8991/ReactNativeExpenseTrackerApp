import { Text, View, StyleSheet } from "react-native"
import { useLayoutEffect } from "react"
import IconButton from "../components/ui/IconButton"
import { GlobalStyles } from "../constants/styles"
import Button from "../components/ui/Button"

function ManageExpense({ route, navigation }) {
    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId
    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing])

    function deleteExpense() {

        navigation.goBack();

    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {

        navigation.goBack();

    }

    return <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <Button style={styles.buttons} mode="flat" onPress={cancelHandler}>Cancel</Button>
            <Button style={styles.buttons} onPress={confirmHandler}>{isEditing ? 'update' : 'Add'}</Button>
        </View>
        {isEditing && <View style={styles.deleteContainer}><IconButton icon='trash' color={GlobalStyles.colors.error500} size={36} onPress={deleteExpense} /></View>}
    </View>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        minWidth: 120,
        marginHorizontal: 8
    }
})
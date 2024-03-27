import { Text, FlatList, StyleSheet } from "react-native"
import ExpenseItem from "./ExpenseItem"

function renderedItem(itemData) {
    return <ExpenseItem {...itemData.item} />
}

function ExpensesList({ expenses }) {

    return <FlatList renderItem={renderedItem} data={expenses} keyExtractor={(expense) => expense.id} />
}

export default ExpensesList

const styles = StyleSheet.create({

})
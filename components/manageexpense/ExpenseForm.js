import { View, StyleSheet, Text, Alert } from 'react-native'
import Input from './Input'
import { useState } from 'react'
import Button from '../ui/Button'
import { getFormattedDate } from '../../util/date'

function ExpenseForm({ defaultValues, cancelHandler, onSubmit, submitButtonLabel }) {

    const [inputValues, setInputValues] = useState({
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? getFormattedDate(defaultValues.date) : '',
        description: defaultValues ? defaultValues.description.toString() : ''
    })

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputValues((currentState) => {
            return {
                ...currentState,
                [inputIdentifier]: enteredValue
            }
        })
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
        const description = expenseData.description.trim().length > 0

        console.log(amountIsValid + dateIsValid + description)

        if (!amountIsValid || !dateIsValid || !description) {
            Alert.alert('Invalid input', 'Please check your input values')
            return;
        }


        onSubmit(expenseData)
    }

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input style={styles.rowInput} label="Amount" textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: inputChangeHandler.bind(this, 'amount'),
                value: inputValues.amount

            }} />
            <Input style={styles.rowInput} label="Date" textInputConfig={
                {
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'),
                    value: inputValues.date
                }
            } />
        </View>
        <Input label="Description" textInputConfig={{
            multiline: true,
            autoCorrect: false,
            onChangeText: inputChangeHandler.bind(this, 'description'),
            value: inputValues.description
        }} />
        <View style={styles.buttonContainer}>
            <Button style={styles.buttons} mode="flat" onPress={cancelHandler}>Cancel</Button>
            <Button style={styles.buttons} onPress={submitHandler}>{submitButtonLabel}</Button>
        </View>
    </View>

}

export default ExpenseForm

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'


    },
    form: {
        marginTop: 80
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
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
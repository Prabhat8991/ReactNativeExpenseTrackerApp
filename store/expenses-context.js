import { createContext, useReducer } from "react";


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    setExpenses: (expenses) => { },
    deleteExpense: (id) => { },
    updateExpense: ({ id, description, amount, date }) => { }
})

function expenseReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [...action.payload, ...state]
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id)
            console.log('updatableExpenseIndex ' + updatableExpenseIndex)
            const updatableExpense = state[updatableExpenseIndex]
            const updateitem = { ...updatableExpense, ...action.payload.data }
            console.log('updateitem ' + updateitem.description)

            const updatedExpenses = [...state]
            updatedExpenses[updatableExpenseIndex] = updateitem
            return updatedExpenses
        case 'SET':
            return action.payload
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state

    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expenseReducer, [])

    function addExpense(expenseData) {
        dispatch({
            type: 'ADD',
            payload: expenseData
        })
    }

    function deleteExpense(id) {
        dispatch({
            type: 'DELETE',
            payload: id
        })
    }

    function updateExpense(id, expenseData) {
        dispatch({
            type: 'UPDATE',
            payload: {
                id: id,
                data: expenseData
            }
        })
    }

    function setExpenses(expenses) {
        dispatch({
            type: 'SET',
            payload: expenses
        })
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
        setExpenses: setExpenses
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider
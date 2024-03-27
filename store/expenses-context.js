import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 29.29,
        date: new Date('2022-01-20')
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 8.12,
        date: new Date('2022-03-19')
    },
    {
        id: 'e4',
        description: 'Movie',
        amount: 10.12,
        date: new Date('2022-05-19')
    },
    {
        id: 'e5',
        description: 'Book',
        amount: 2.12,
        date: new Date('2022-05-19')
    }
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: ({ id, description, amount, date }) => { }
})

function expenseReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString()
            return [{ ...action.payload, id: id }, ...state]
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id)
            const updatableExpense = state[updatableExpenseIndex]
            const updateitem = { ...updatableExpense, ...action.payload.data }
            const updatedExpenses = [...state]
            updatedExpenses[updatableExpenseIndex] = updateitem
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state

    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES)

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

    return <ExpensesContext.Provider>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider
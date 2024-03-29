import axios from 'axios';

const BACKEND_URL = 'https://react-native-project-a647d-default-rtdb.firebaseio.com'

export async function storeExpense(expenseData) {
    const response = axios.post(BACKEND_URL + '/expenses.json', expenseData)
    const id = (await response).data.name //gives ID
    return id
}

export async function fetchExpenses() {
    const response = await axios(BACKEND_URL + '/expenses.json')

    console.log(response)

    const expenses = []

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }
        expenses.push(expenseObj)
    }

    return expenses
}

export function updateExpense(id, expenseData) {
    axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData)
}

export function deleteExpense(id) {
    axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}
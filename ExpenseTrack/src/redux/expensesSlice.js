import { createSlice, createAction } from '@reduxjs/toolkit'

// Request actions for saga triggers
export const addExpenseRequest = createAction('expenses/addExpenseRequest')
export const deleteExpenseRequest = createAction('expenses/deleteExpenseRequest')
export const updateExpenseRequest = createAction('expenses/updateExpenseRequest')

const initialState = {
  expenses: [],
  error: null
}

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpenseSuccess: (state, action) => {
      state.expenses.push(action.payload)
    },
    deleteExpenseSuccess: (state, action) => {
      state.expenses = state.expenses.filter(exp => exp.id !== action.payload)
    },
    updateExpenseSuccess: (state, action) => {
      const index = state.expenses.findIndex(exp => exp.id === action.payload.id)
      if (index !== -1) {
        state.expenses[index] = action.payload
      }
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {
  addExpenseSuccess,
  deleteExpenseSuccess,
  updateExpenseSuccess,
  setError
} = expensesSlice.actions

export default expensesSlice.reducer

import { createSlice, createAction } from '@reduxjs/toolkit'

// Request actions for saga triggers
export const fetchExpensesRequest = createAction('expenses/fetchExpensesRequest')
export const addExpenseRequest = createAction('expenses/addExpenseRequest')
export const deleteExpenseRequest = createAction('expenses/deleteExpenseRequest')
export const updateExpenseRequest = createAction('expenses/updateExpenseRequest')

const initialState = {
  expenses: [],
  status: 'idle',
  error: null
}

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    fetchExpensesSuccess: (state, action) => {
      state.expenses = action.payload
      state.status = 'succeeded'
      state.error = null
    },
    addExpenseSuccess: (state, action) => {
      state.expenses.push(action.payload)
      state.status = 'succeeded'
      state.error = null
    },
    deleteExpenseSuccess: (state, action) => {
      state.expenses = state.expenses.filter(exp => exp.id !== action.payload)
      state.status = 'succeeded'
      state.error = null
    },
    updateExpenseSuccess: (state, action) => {
      const index = state.expenses.findIndex(exp => exp.id === action.payload.id)
      if (index !== -1) {
        state.expenses[index] = action.payload
      }
      state.status = 'succeeded'
      state.error = null
    },
    setLoading: (state) => {
      state.status = 'loading'
    },
    setError: (state, action) => {
      state.error = action.payload
      state.status = 'failed'
    }
  }
})

export const {
  fetchExpensesSuccess,
  addExpenseSuccess,
  deleteExpenseSuccess,
  updateExpenseSuccess,
  setLoading,
  setError
} = expensesSlice.actions

export default expensesSlice.reducer

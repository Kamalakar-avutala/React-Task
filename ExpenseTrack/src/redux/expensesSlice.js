import { createSlice, nanoid } from '@reduxjs/toolkit'

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: [],
  reducers: {
    addExpences: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare({ title, amount, category, date }) {
        return {
          payload: {
            id: nanoid(),
            title,
            amount,
            category,
            date,
          },
        }
      },
    },

    deleteExpense(state, action) {
      return state.filter(exp => exp.id !== action.payload)
    },

    updateExpense(state, action) {
      const index = state.findIndex(exp => exp.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
  },
})

export const { addExpences, deleteExpense, updateExpense } = expensesSlice.actions
export default expensesSlice.reducer

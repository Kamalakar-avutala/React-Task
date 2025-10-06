import { put, takeLatest, all } from 'redux-saga/effects'
import {
  addExpenseRequest,
  deleteExpenseRequest,
  updateExpenseRequest,
  addExpenseSuccess,
  deleteExpenseSuccess,
  updateExpenseSuccess,
  setError
} from '../expensesSlice'
import { nanoid } from '@reduxjs/toolkit'

function* addExpenseSaga(action) {
  try {
    const expense = {
      id: nanoid(),
      ...action.payload
    }
    yield put(addExpenseSuccess(expense))
  } catch (error) {
    yield put(setError(error.message))
  }
}

function* deleteExpenseSaga(action) {
  try {
    yield put(deleteExpenseSuccess(action.payload)) // payload should be ID
  } catch (error) {
    yield put(setError(error.message))
  }
}

function* updateExpenseSaga(action) {
  try {
    yield put(updateExpenseSuccess(action.payload)) // payload is updated object
  } catch (error) {
    yield put(setError(error.message))
  }
}

export default function* expensesSaga() {
  yield all([
    takeLatest(addExpenseRequest.type, addExpenseSaga),
    takeLatest(deleteExpenseRequest.type, deleteExpenseSaga),
    takeLatest(updateExpenseRequest.type, updateExpenseSaga)
  ])
}

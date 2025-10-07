import { takeLatest, put, call } from 'redux-saga/effects';
import {
  fetchExpensesRequest,
  fetchExpensesSuccess,
  addExpenseRequest,
  addExpenseSuccess,
  updateExpenseRequest,
  updateExpenseSuccess,
  deleteExpenseRequest,
  deleteExpenseSuccess,
  setLoading,
  setError
} from '../expensesSlice';
import { expenseApi } from '../api/expenseApi';

function* fetchExpensesSaga() {
  try {
    yield put(setLoading());
    const expenses = yield call(expenseApi.fetchExpenses);
    yield put(fetchExpensesSuccess(expenses));
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* addExpenseSaga(action) {
  try {
    yield put(setLoading());
    const newExpense = yield call(expenseApi.addExpense, action.payload);
    yield put(addExpenseSuccess(newExpense));
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* updateExpenseSaga(action) {
  try {
    yield put(setLoading());
    const updatedExpense = yield call(expenseApi.updateExpense, action.payload);
    yield put(updateExpenseSuccess(updatedExpense));
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* deleteExpenseSaga(action) {
  try {
    yield put(setLoading());
    yield call(expenseApi.deleteExpense, action.payload);
    yield put(deleteExpenseSuccess(action.payload));
  } catch (error) {
    yield put(setError(error.message));
  }
}

export function* expenseSaga() {
  yield takeLatest(fetchExpensesRequest.type, fetchExpensesSaga);
  yield takeLatest(addExpenseRequest.type, addExpenseSaga);
  yield takeLatest(updateExpenseRequest.type, updateExpenseSaga);
  yield takeLatest(deleteExpenseRequest.type, deleteExpenseSaga);
}
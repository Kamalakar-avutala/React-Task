import { call, put, takeEvery } from 'redux-saga/effects';
import { deleteExpenseSuccess, deleteExpenseFailure } from './expensesSlice';

function* deleteExpense(action) {
  try {
    // Add your API call here if needed
    // const response = yield call(api.deleteExpense, action.payload);
    yield put(deleteExpenseSuccess(action.payload));
  } catch (error) {
    yield put(deleteExpenseFailure(error.message));
  }
}

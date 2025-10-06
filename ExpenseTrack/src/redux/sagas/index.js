import { all } from 'redux-saga/effects';
import expensesSaga from './expensesSaga';

export default function* rootSaga() {
  yield all([
    expensesSaga()
  ]);
}
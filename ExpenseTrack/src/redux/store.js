import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import expensesReducer from './expensesSlice';
import { expenseSaga } from './sagas/expenseSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    expenses: expensesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(expenseSaga);

export default store;

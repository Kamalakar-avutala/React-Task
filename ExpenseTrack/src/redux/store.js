// store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import expensesReducer from './expensesSlice';
import rootSaga from './sagas'; // You'll need to create this

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run saga middleware
sagaMiddleware.run(rootSaga);

export default store;

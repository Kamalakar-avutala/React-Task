import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteExpense } from '../../redux/expensesSlice';

const ExpenseItem = ({ expense, onEdit }) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{expense.title}</td>
      <td>${expense.amount.toFixed(2)}</td>
      <td>{expense.category?.name}</td>
      <td>{new Date(expense.date).toLocaleDateString()}</td>
      <td>
        <button onClick={() => onEdit(expense)}>Edit</button>
        <button onClick={() => dispatch(deleteExpense(expense.id))}>Delete</button>
      </td>
    </tr>
  );
};

export default ExpenseItem;

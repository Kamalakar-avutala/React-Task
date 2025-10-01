import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ExpenseItem from '../expense-item/expenseItem';
import ExpenseForm from '../expense-form/expenseForm';

const ExpenseList = () => {
  const expenses = useSelector(state => state.expenses);
  const [editingExpense, setEditingExpense] = useState(null);

  return (
    <div>
      <h2>Expenses</h2>
      <ExpenseForm editingExpense={editingExpense} onCancel={() => setEditingExpense(null)} />
      {expenses.map(expense => (
        <ExpenseItem key={expense.id} expense={expense} onEdit={setEditingExpense} />
      ))}
    </div>
  );
};

export default ExpenseList;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ExpenseItem from '../expense-item/expenseItem';
import ExpenseForm from '../expense-form/expenseForm';

const ExpenseItem = () => {
  const expenses = useSelector(state => state.expenses);
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  return (
    <div>
      <h2>Expenses</h2>
      {/* Add new expenses via form */}
      <ExpenseForm />

        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            isEditing={editingExpenseId === expense.id}
            onEdit={() => setEditingExpenseId(expense.id)}
            onCancel={() => setEditingExpenseId(null)}
            onSave={() => setEditingExpenseId(null)}
          />
        ))}
    </div>
  );
};

export default ExpenseItem;

import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from '../../molecules/CalenderField';
import InputText from '../../molecules/TextInputField';
import Dropdown from '../../molecules/DropdownField';
import CustomToast from '../../atom/Toast';
import { categories } from '../../constants/categories';
import Button from '../../atom/Button';
import { Link } from 'react-router-dom';
import { EXPENSE_FORM } from '../../constants/routes';
import Table from '../../atom/Table/Table';

import {
  updateExpenseRequest,
  deleteExpenseRequest,
} from '../../redux/expensesSlice';

const ExpenseList = () => {
  const toastRef = useRef();
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses) ?? [];
  const loading = useSelector((state) => state.expenses.loading);
  const [editingId, setEditingId] = useState(null);
  const [editedExpense, setEditedExpense] = useState({});

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setEditedExpense({ ...expense });
  };

  const handleSave = (id) => {
    const updatedExpense = { ...editedExpense, id };

    if (updatedExpense.date instanceof Date) {
      updatedExpense.date = updatedExpense.date.toISOString();
    }

    if (!updatedExpense.category) {
      updatedExpense.category = 'MX';
    }

    dispatch(updateExpenseRequest(updatedExpense));
    setEditingId(null);

    toastRef.current?.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Expense updated successfully',
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteExpenseRequest(id));

    toastRef.current?.show({
      severity: 'error',
      summary: 'Deleted',
      detail: 'Expense deleted successfully',
    });
  };

  const handleChange = (field, value) => {
    setEditedExpense((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return !isNaN(date)
      ? date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : '';
  };

  const getCategoryName = (code) => {
    const category = categories.find((cat) => cat.code === code);
    return category?.name || '';
  };

  const columns = [
    {
      key: 'title',
      title: 'Title',
      render: (cellValue, row) =>
        editingId === row.id ? (
          <InputText
            key={`title-${row.id}`}
            value={editedExpense.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        ) : (
          cellValue
        ),
    },
    {
      key: 'amount',
      title: 'Amount',
      render: (cellValue, row) =>
        editingId === row.id ? (
          <InputText
            key={`amount-${row.id}`}
            type="number"
            value={editedExpense.amount || ''}
            onChange={(e) =>
              handleChange('amount', parseFloat(e.target.value) || 0)
            }
          />
        ) : (
          cellValue
        ),
    },
    {
      key: 'category',
      title: 'Category',
      render: (cellValue, row) =>
        editingId === row.id ? (
          <Dropdown
            key={`category-${row.id}`}
            value={editedExpense.category}
            options={categories}
            optionLabel="name"
            optionValue="code"
            onChange={(e) => handleChange('category', e.value)}
            placeholder="Select a category"
          />
        ) : (
          getCategoryName(cellValue)
        ),
    },
    {
      key: 'date',
      title: 'Date',
      render: (cellValue, row) =>
        editingId === row.id ? (
          <Calendar
            key={`date-${row.id}`}
            value={editedExpense.date ? new Date(editedExpense.date) : null}
            onChange={(e) => handleChange('date', e.value)}
            dateFormat="dd/mm/yy"
          />
        ) : (
          formatDate(cellValue)
        ),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div key={`actions-${row.id}`}>
          {editingId === row.id ? (
            <Button
              onClick={() => handleSave(row.id)}
              className="me-2 border-0 bg-secondary p-0"
            >
              <i className="pi pi-check"></i>
            </Button>
          ) : (
            <Button
              onClick={() => handleEdit(row)}
              className="me-2 border-0 bg-secondary p-0"
            >
              <i className="pi pi-pencil"></i>
            </Button>
          )}
          <Button
            severity="danger"
            className="border-0 bg-secondary p-0"
            onClick={() => handleDelete(row.id)}
          >
            <i className="pi pi-trash"></i>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <CustomToast ref={toastRef} position="top-right" />
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h1>Expenses</h1>
        <Button className="mt-3 mb-3">
          <Link to={EXPENSE_FORM} className="text-white text-decoration-none">
            Add Expenses
          </Link>
        </Button>
      </div>
      <Table
        data={expenses}
        columns={columns}
        isLoading={loading}
        className="expense-table"
        emptyMessage="No expenses found"
        onRowClick={null}
      />
    </div>
  );
};

export default ExpenseList;

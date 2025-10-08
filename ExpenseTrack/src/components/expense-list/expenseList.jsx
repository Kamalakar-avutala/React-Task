import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
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

  const {
    control,
    handleSubmit,
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      title: '',
      amount: '',
      category: '',
      date: null,
    },
  });

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    reset({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date ? new Date(expense.date) : null,
    });
  };

  const onSubmit = (data) => {
    const updatedExpense = {
      ...data,
      id: editingId,
      date: data.date instanceof Date ? data.date.toISOString() : data.date,
      category: data.category || 'MX',
    };

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
      key: 'id',
      title: 'ID',
      render: (cellValue) => cellValue,
    },
    {
      key: 'title',
      title: 'Title',
      render: (_, row) =>
        editingId === row.id ? (
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <InputText key={`title-${row.id}`} {...field} />
            )}
          />
        ) : (
          row.title
        ),
    },
    {
      key: 'amount',
      title: 'Amount',
      render: (_, row) =>
        editingId === row.id ? (
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <InputText
                key={`amount-${row.id}`}
                type="number"
                {...field}
                onChange={(e) =>
                  field.onChange(parseFloat(e.target.value) || 0)
                }
              />
            )}
          />
        ) : (
          row.amount
        ),
    },
    {
      key: 'category',
      title: 'Category',
      render: (_, row) =>
        editingId === row.id ? (
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Dropdown
                key={`category-${row.id}`}
                value={field.value}
                options={categories}
                optionLabel="name"
                optionValue="code"
                onChange={(e) => field.onChange(e.value)}
                placeholder="Select a category"
              />
            )}
          />
        ) : (
          getCategoryName(row.category)
        ),
    },
    {
      key: 'date',
      title: 'Date',
      render: (_, row) =>
        editingId === row.id ? (
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Calendar
                key={`date-${row.id}`}
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                dateFormat="dd/mm/yy"
              />
            )}
          />
        ) : (
          formatDate(row.date)
        ),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div key={`actions-${row.id}`}>
          {editingId === row.id ? (
            <Button
              onClick={handleSubmit(onSubmit)}
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

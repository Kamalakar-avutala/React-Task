import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Calendar from "../../molecules/CalenderField";
import InputText from "../../molecules/TextInputField";
import Dropdown from "../../molecules/DropdownField";
import { Toast } from 'primereact/toast';

import {
  updateExpenseRequest,
  deleteExpenseRequest
} from '../../redux/expensesSlice';

const categories = [
  { name: "Food", code: "FD" },
  { name: "Transport", code: "TS" },
  { name: "Utilities", code: "UT" },
  { name: "Rent", code: "RT" },
  { name: "Entertainment", code: "EN" },
  { name: "Healthcare", code: "HC" },
  { name: "Education", code: "ED" },
  { name: "Clothing", code: "CL" },
  { name: "Travel", code: "TR" },
  { name: "Groceries", code: "GR" },
  { name: "Insurance", code: "IN" },
  { name: "Personal Care", code: "PC" },
  { name: "Savings", code: "SV" },
  { name: "Gifts", code: "GF" },
  { name: "Subscriptions", code: "SB" },
  { name: "Miscellaneous", code: "MX" },
];

const ExpenseList = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);

  const expenses = useSelector(state => state.expenses.expenses) || [];
  const loading = useSelector(state => state.expenses.loading);
  const [editingRows, setEditingRows] = useState({});

  // Called when row editing is finished (Save clicked)
  const onRowEditComplete = (e) => {
    const updatedExpense = {
      ...e.newData,
      id: e.data.id,
    };

    // Handle date conversion
    if (updatedExpense.date instanceof Date) {
      updatedExpense.date = updatedExpense.date.toISOString();
    }

    // Fallback category if missing
    if (!updatedExpense.category) {
      updatedExpense.category = "MX";
    }

    dispatch(updateExpenseRequest(updatedExpense));

    toast.current?.show({
      severity: 'success',
      summary: 'Updated',
      detail: 'Expense updated successfully',
      life: 2000,
    });

    // Remove from editing rows state
    setEditingRows(prev => {
      const updated = { ...prev };
      delete updated[updatedExpense.id];
      return updated;
    });
  };

  // Editors for different columns
  const textEditor = (options) => (
    <InputText
      value={options.value ?? ''}
      onChange={(e) => options.editorCallback(e.target.value)}
      autoFocus
    />
  );

  const numberEditor = (options) => (
    <InputText
      value={options.value ?? ''}
      type="number"
      onChange={(e) => {
        const val = e.target.value;
        options.editorCallback(val === '' ? null : parseFloat(val));
      }}
      min={0}
      autoFocus
    />
  );

  const categoryEditor = (options) => (
    <Dropdown
      value={options.value}
      options={categories}
      optionLabel="name"
      optionValue="code"
      onChange={(e) => options.editorCallback(e.value)}
      placeholder="Select a category"
      autoFocus
      style={{ width: '100%' }}
    />
  );

  const dateEditor = (options) => {
    let dateValue = null;
    if (options.value) {
      try {
        dateValue = options.value instanceof Date ? 
          options.value : new Date(options.value);
      } catch (e) {
        dateValue = null;
      }
    }

    return (
      <Calendar
        value={dateValue}
        onChange={(e) => {
          const selectedDate = e.value;
          if (selectedDate) {
            // Ensure we're passing a Date object
            options.editorCallback(selectedDate);
          } else {
            options.editorCallback(null);
          }
        }}
        dateFormat="dd/mm/yy"
        autoFocus
      />
    );
  };

  // Display formatters for category and date columns
  const categoryBodyTemplate = (rowData) => {
    const categoryObj = categories.find(cat => cat.code === rowData.category);
    return categoryObj?.name || '';
  };

  const dateBodyTemplate = (rowData) => {
    if (!rowData.date) return '';
    const date = new Date(rowData.date);
    return !isNaN(date)
      ? date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
      : '';
  };

  // Delete button action
  const actionBodyTemplate = (rowData) => (
    <Button
      icon="pi pi-trash"
      severity="danger"
      rounded
      text
      aria-label="Delete"
      onClick={() => {
        dispatch(deleteExpenseRequest(rowData.id));
        toast.current?.show({
          severity: 'info',
          summary: 'Deleted',
          detail: 'Expense deleted',
          life: 2000,
        });
      }}
    />
  );

  // Fix onRowEditChange to update editingRows correctly as an object
  const onRowEditChange = (e) => {
    setEditingRows(e.data);
  };

  return (
    <div>
      <Toast ref={toast} />
      <h1 className="mb-4">Expenses</h1>

      <DataTable
        value={Array.isArray(expenses) ? expenses : []}
        editMode="row"
        dataKey="id"
        editingRows={editingRows}
        onRowEditChange={(e) => setEditingRows(e.data)}
        onRowEditComplete={onRowEditComplete}
        showGridlines
        removableSort
        emptyMessage="No expenses found"
        loading={loading}
      >
        <Column field="title" header="Title" editor={textEditor} />
        <Column field="amount" header="Amount" editor={numberEditor} />
        <Column
          field="category"
          header="Category"
          editor={categoryEditor}
          body={categoryBodyTemplate}
        />
        <Column
          field="date"
          header="Date"
          editor={dateEditor}
          body={dateBodyTemplate}
        />
        <Column
          rowEditor
          header="Edit"
          style={{ width: '7rem', textAlign: 'center' }}
        />
        <Column
          body={actionBodyTemplate}
          header="Delete"
          style={{ width: '4rem', textAlign: 'center' }}
        />
      </DataTable>
    </div>
  );
};

export default ExpenseList;

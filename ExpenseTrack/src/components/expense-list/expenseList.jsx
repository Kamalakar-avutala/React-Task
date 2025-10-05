import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Calendar from "../../molecules/CalenderField";
import InputText from "../../molecules/TextInputField";
import Dropdown from "../../molecules/DropdownField";
import { updateExpense, deleteExpense } from '../../redux/expensesSlice';
import ExpenseForm from '../expense-form/expenseForm';

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
  const expenses = useSelector(state => state.expenses);
  const [editingRows, setEditingRows] = useState({});

  // console.log(expenses);

  // Called when row editing is finished (Save clicked)
  const onRowEditComplete = (e) => {
    let updatedExpense = { ...e.newData };

    // Convert date to ISO string if it's a Date object or string
    if (updatedExpense.date) {
      const date = new Date(updatedExpense.date);
      if (date instanceof Date && !isNaN(date)) {
        updatedExpense.date = date.toISOString();
      }
    }

    // Handle category
    if (!updatedExpense.category) {
      updatedExpense.category = "MX";
    }

    // Dispatch update action
    dispatch(updateExpense(updatedExpense));

    // Remove row from editing rows state
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

  const categoryEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={categories}
        optionLabel="name"
        optionValue="code"
        onChange={(e) => {
          options.editorCallback(e.value);
        }}
        placeholder="Select a category"
        autoFocus
        style={{ width: '100%' }}
      />
    );
  };

  const dateEditor = (options) => {
    const dateValue = options.value ? new Date(options.value) : null;
    return (
      <Calendar
        value={dateValue}
        onChange={(e) => {
          const selectedDate = e.value;
          if (selectedDate) {
            options.editorCallback(selectedDate.toISOString());
          } else {
            options.editorCallback(null);
          }
        }}
        dateFormat="dd/mm/yy"
        autoFocus
      />
    );
  };

  // Renderers for category and date to display formatted values
  const categoryBodyTemplate = (rowData) => {
    const categoryObj = categories.find(cat => cat.code === rowData.category);
    return categoryObj?.name || '';
  };

  const dateBodyTemplate = (rowData) => {
    if (!rowData.date) return '';
    const date = new Date(rowData.date);
    return date instanceof Date && !isNaN(date)
      ? date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
      : '';
  };

  // Action buttons: Delete only, editing handled by row editor column
  const actionBodyTemplate = (rowData) => (
    <Button
      icon="pi pi-trash"
      severity="danger"
      rounded
      text
      aria-label="Delete"
      onClick={() => dispatch(deleteExpense(rowData.id))}
    />
  );

  return (
    <div>
      <h2>Expenses</h2>

      {/* Form to add new expense */}
      <ExpenseForm />

      <DataTable
        value={expenses}
        editMode="row"
        dataKey="id"
        editingRows={editingRows}
        onRowEditChange={(e) => setEditingRows(e.data)}
        onRowEditComplete={onRowEditComplete}
        showGridlines
        removableSort
        >
        <Column field="title" header="Title" editor={textEditor}  />
        <Column field="amount" header="Amount" editor={numberEditor}  />
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
        <Column rowEditor header="Edit" style={{ width: '7rem', textAlign: 'center' }} />
        <Column body={actionBodyTemplate} header="Delete" style={{ width: '4rem', textAlign: 'center' }} />
      </DataTable>
    </div>
  );
};

export default ExpenseList;

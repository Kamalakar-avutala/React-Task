import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { useDispatch } from "react-redux";
import { addExpences, updateExpense } from "../../redux/expensesSlice";

const ExpenseForm = ({ editingExpense, onCancel }) => {
  const [form, setForm] = useState({
    title: "",
    amount: null,
    category: null,
    date: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (editingExpense) {
      setForm(editingExpense);
    }
  }, [editingExpense]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleValueChange = (value, name) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert date to ISO string if date exists
    const expenseData = {
      ...form,
      date: form.date ? form.date.toISOString().split("T")[0] : null,
    };

    if (editingExpense) {
      dispatch(updateExpense(expenseData));
    } else {
      dispatch(addExpences(expenseData));
    }

    setForm({ title: "", amount: null, category: null, date: null });
    onCancel();
  };

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

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex flex-column gap-2 mb-3">
        <label htmlFor="title">Title</label>
        <InputText
          id="title"
          name="title"
          value={form.title}
          onChange={handleInputChange}
        />
      </div>

      <div className="d-flex flex-column gap-2 mb-3">
        <label htmlFor="amount">Amount</label>
        <InputNumber
          id="amount"
          value={form.amount}
          onValueChange={(e) => handleValueChange(e.value, "amount")}
        />
      </div>

      <div className="d-flex flex-column gap-2 mb-3">
        <label htmlFor="category">Category</label>
        <Dropdown
          id="category"
          value={form.category}
          options={categories}
          optionLabel="name"
          onChange={(e) => handleValueChange(e.value, "category")}
          placeholder="Select a category"
        />
      </div>

      <div className="d-flex flex-column gap-2 mb-3">
        <label htmlFor="date">Date</label>
        <Calendar
          id="date"
          value={form.date}
          onChange={(e) => handleValueChange(e.value, "date")}
          dateFormat="yy-mm-dd"
        />
      </div>

      <button type="submit" className="btn btn-secondary">
        {editingExpense ? "Update" : "Add"} Expense
      </button>
      {editingExpense && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default ExpenseForm;

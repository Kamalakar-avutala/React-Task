import React, { useState } from "react";
import Calendar from "../../molecules/CalenderField";
import InputText from "../../molecules/TextInputField";
import Dropdown from "../../molecules/DropdownField";
import Button from "../../atom/Button";
import { useDispatch } from "react-redux";
import { addExpenses } from "../../redux/expensesSlice";

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

const ExpenseForm = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Safely handle date and category formatting
    const formattedExpense = {
      ...form,
      id: Date.now().toString(),
      date: form.date instanceof Date ? form.date.toISOString() : null,
      category: form.category || "MX", // default to "Miscellaneous"
    };

    console.log("DISPATCHING EXPENSE:", formattedExpense);
    dispatch(addExpenses(formattedExpense));

    setForm({
      title: "",
      amount: "",
      category: "",
      date: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="row row-gap-4 mb-4">
      <InputText
        id="title"
        name="title"
        label="Title"
        value={form.title}
        onChange={handleInputChange}
        className="col-12 col-md-6"
      />

      <InputText
        id="amount"
        name="amount"
        label="Amount"
        type="number"
        value={form.amount}
        onChange={handleInputChange}
        className="col-12 col-md-6"
      />

      <Dropdown
        id="category"
        name="category"
        label="Category"
        value={form.category}
        options={categories}
        optionLabel="name"
        optionValue="code"
        onChange={(e) => handleInputChange({ target: { name: "category", value: e.value } })}
        placeholder="Select a category"
        checkmark={false}
        className="col-12 col-md-6"
      />

      <Calendar
        id="date"
        name="date"
        label="Date"
        value={form.date}
        onChange={handleInputChange}
        dateFormat="yy-mm-dd"
        className="col-12 col-md-6"
      />

      <div className="d-flex justify-content-end">
        <Button type="submit" className="col-2">
          Add Expense
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;

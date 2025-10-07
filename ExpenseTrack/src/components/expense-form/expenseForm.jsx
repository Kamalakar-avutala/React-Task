import React, { useRef } from "react";
import Calendar from "../../molecules/CalenderField";
import InputText from "../../molecules/TextInputField";
import Dropdown from "../../molecules/DropdownField";
import Button from "../../atom/Button";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { addExpenseRequest } from "../../redux/expensesSlice";
import { Toast } from "primereact/toast";

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
  const toast = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      amount: "",
      category: "",
      date: null,
    },
  });

  const onSubmit = (data) => {
    const formattedExpense = {
      ...data,
      id: Date.now().toString(),
      date: data.date instanceof Date ? data.date.toISOString() : null,
    };

    dispatch(addExpenseRequest(formattedExpense));
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Expense added successfully",
      life: 3000,
    });
    reset();
  };

  return (
    <>
      <Toast ref={toast} />
      <h1 className="mb-4">Add Expenses</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="row row-gap-4 mb-4">
        <div className="col-12 col-md-6">
          <InputText
            id="title"
            name="title"
            label="Title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 6,
                message: "Title must be at least 6 characters",
              },
            })}
            className={`w-100 ${errors.title ? "p-invalid" : ""}`}
            invalid={!!errors.title}
            error={errors.title ? { message: errors.title.message } : null}
          />
        </div>

        <div className="col-12 col-md-6">
          <InputText
            id="amount"
            name="amount"
            label="Amount"
            type="number"
            {...register("amount", {
              required: "Amount is required",
              min: { value: 0, message: "Amount must be greater than 0" },
            })}
            className={`w-100 ${errors.amount ? "p-invalid" : ""}`}
            invalid={!!errors.amount}
            error={errors.amount ? { message: errors.amount.message } : null}
          />
        </div>

        <div className="col-12 col-md-6">
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Dropdown
                id="category"
                name="category"
                label="Category"
                options={categories}
                optionLabel="name"
                optionValue="code"
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                placeholder="Select a category"
                className="w-100"
                required
                error={errors.category?.message}
              />
            )}
          />
        </div>

        <div className="col-12 col-md-6">
          <Controller
            name="date"
            control={control}
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <Calendar
                id="date"
                name="date"
                label="Date"
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                dateFormat="yy-mm-dd"
                className={`w-100 ${errors.date ? "p-invalid" : ""}`}
                invalid={!!errors.date}
                error={errors.date?.message}
              />
            )}
          />
        </div>

        <div className="d-flex justify-content-end">
          <Button type="submit" className="col-2">
            Add Expense
          </Button>
        </div>
      </form>
    </>
  );
};

export default ExpenseForm;

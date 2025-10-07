import React, { useRef } from "react";
import Calendar from "../../molecules/CalenderField";
import { categories } from "../../constants/categories";
import InputText from "../../molecules/TextInputField";
import Dropdown from "../../molecules/DropdownField";
import Button from "../../atom/Button";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { addExpenseRequest } from "../../redux/expensesSlice";
import CustomToast from "../../atom/Toast";
import { yupResolver } from '@hookform/resolvers/yup';
import Validations from '../../validations/validationSchemas';


const ExpenseForm = () => {
  const dispatch = useDispatch();
  const toastRef = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Validations.expenseSchema),
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
    toastRef.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Expense added successfully",
      life: 3000,
    });
    reset();
  };

  return (
    <>
      <CustomToast ref={toastRef} />
      <h1 className="mb-4">Add Expenses</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="row row-gap-4 mb-4">
        <div className="col-12 col-md-6">
          <InputText
            id="title"
            name="title"
            label="Title"
            {...register("title")}
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
            {...register("amount")}
            className={`w-100 ${errors.amount ? "p-invalid" : ""}`}
            invalid={!!errors.amount}
            error={errors.amount ? { message: errors.amount.message } : null}
          />
        </div>

        <div className="col-12 col-md-6">
          <Controller
            name="category"
            control={control}
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
            render={({ field }) => (
              <Calendar
                id="date"
                name="date"
                label="Date"
                value={field.value}
                onChange={(e) => field.onChange(e?.value ?? null)}
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

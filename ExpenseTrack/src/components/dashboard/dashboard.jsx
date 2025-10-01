import React from "react";
import Header from "../header/header";
import ExpenseList from '../expense-list/expenseList';

const Dashboard = () => {
  return (
    <>
    <Header />
    <section className="d-flex">
        <div className=""></div>
        <div className="p-4 w-auto">
            <ExpenseList />
        </div>
    </section>
    </>
  );
};

export default Dashboard;

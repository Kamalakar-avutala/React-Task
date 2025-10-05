import React from "react";
import Header from "../../pages/Header/Header";
import SideNav from "../../components/SideNav/SideNav";
import ExpenseList from '../expense-list/expenseList';

const Dashboard = () => {
  return (
    <>
    <Header />
    <section className="w-100 d-flex">
        <div className="">
          <SideNav />
        </div>
        <div className="p-4 w-auto flex-fill">
            <ExpenseList />
        </div>
    </section>
    </>
  );
};

export default Dashboard;

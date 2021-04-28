import React from 'react';
import ConnectedExpenseList from "./ExpenseList";
import ConnectedExpenseListFilters from "./ExpenseListFilters";
import ExpenseSummary from "./ExpensesSummary";

const ExpenseDashboardPage = () => (
  <div>
    <ConnectedExpenseListFilters/>
    <ExpenseSummary />
    <ConnectedExpenseList />

  </div>
);

export default ExpenseDashboardPage;

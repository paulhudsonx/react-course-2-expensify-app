import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import expensesTotal from "../selectors/expenses-total";
import selectExpenses from "../selectors/expenses";
import { currencyFormat } from "../i18n/format";

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => (
  <div className="page-header">
    <div className="content-container">
      {expenseCount === 0 && (
        <h1 className="page-header__title">No matching expenses!</h1>
      )}
      {expenseCount === 1 && (
        <h1 className="page-header__title">
          Viewing <span>{expenseCount}</span> expense totalling{" "}
          <span>{currencyFormat(expensesTotal / 100)}</span>
        </h1>
      )}
      {expenseCount > 1 && (
        <h1 className="page-header__title">
          Viewing <span>{expenseCount}</span> expenses totalling{" "}
          <span>{currencyFormat(expensesTotal / 100)}</span>
        </h1>
      )}
      <div className="page-header__actions">
        <Link className="button" to="/create">
          Add Expense
        </Link>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => {
  const expenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: expenses.length,
    expensesTotal: expensesTotal(expenses),
  };
};

export default connect(mapStateToProps)(ExpensesSummary);

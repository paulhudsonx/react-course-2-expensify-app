import React from "react";

import {connect} from 'react-redux';

import expensesTotal from "../selectors/expenses-total";
import selectExpenses from "../selectors/expenses";
import {currencyFormat} from "../i18n/format";

export const ExpensesSummary = ({expenseCount, expensesTotal}) => (
  <div>
    {expenseCount === 0 && <h1>No matching expenses!</h1>}
    {expenseCount === 1 && <h1>Viewing {expenseCount} expense totalling {currencyFormat(expensesTotal / 100)}</h1>}
    {expenseCount > 1 && <h1>Viewing {expenseCount} expenses totalling {currencyFormat(expensesTotal / 100)}</h1>}
  </div>
)

const mapStateToProps = (state) => {

  const expenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: expenses.length,
    expensesTotal: expensesTotal(expenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary)


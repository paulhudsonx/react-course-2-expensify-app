import React from "react";

import { connect } from "react-redux";
import ExpenseForm from "./ExpenseFm";
import { startRemoveExpense, startUpdateExpense } from "../actions/expenses";

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    console.log(expense);
    this.props.startUpdateExpense({ id: this.props.expense.id }, expense);
    this.props.history.push("/");
    console.log(`onSubmit called!`);
  };

  onRemove = (event) => {
    console.log(`Removing ${this.props.expense.id}`);
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
          <button className="button--secondary" onClick={this.onRemove}>
            Remove Expense
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log(`Mapping ${props.match.params.id}`);
  return {
    expense: state.expenses.find((e) => {
      console.log(`Finding ${e.id}`);
      return e.id === props.match.params.id;
    }),
  };
};

export default connect(mapStateToProps, {
  startUpdateExpense,
  startRemoveExpense,
})(EditExpensePage);

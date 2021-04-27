import React from 'react';

import {connect} from 'react-redux';
import ExpenseForm from "./ExpenseFm";
import {removeExpense, updateExpense} from "../actions/expenses";

export class EditExpensePage extends React.Component {

  onSubmit = (expense) => {
    console.log(expense);
    this.props.updateExpense({id: this.props.expense.id}, expense);
    this.props.history.push("/");
    console.log(`onSubmit called!`)
  }

  onRemove = (event) => {
    console.log(`Removing ${this.props.expense.id}`);
    this.props.removeExpense({id: this.props.expense.id});
    this.props.history.push("/");
  }

  render() {
    return (
    <div>
      Editing the expense with id of {this.props.expense.id}
      <h1>Edit Expense</h1>
      <ExpenseForm
        expense={this.props.expense}
        onSubmit={this.onSubmit}
      />
      <button onClick={this.onRemove}>Remove
      </button>
    </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  console.log(`Mapping ${props.match.params.id}`)
  return {
    expense: state.expenses.find((e) => {
      console.log(`Finding ${e.id}`);
      return e.id === props.match.params.id;
    })
  };
};

export default connect(mapStateToProps, {updateExpense, removeExpense})(EditExpensePage);

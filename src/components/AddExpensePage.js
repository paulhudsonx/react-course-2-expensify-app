import React from 'react';

import {connect} from 'react-redux';
import ExpenseForm from "./ExpenseFm";
import {addExpense} from "../actions/expenses";

export class AddExpensePage extends React.Component {

  onSubmit = (expense) => {
    console.log(expense)
    this.props.addExpense(expense)
    this.props.history.push("/")
  }

  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  // ... computed data from state and optionally ownProps
})

/*const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (expense) => {
      dispatch(addExpense(expense))
    }
  }
}*/

export default connect(mapStateToProps, {addExpense})(AddExpensePage)


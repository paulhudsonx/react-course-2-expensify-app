import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = () => {};
  render = () => (
    <div>
      <h1>Login to Expensify</h1>

      <button onClick={this.props.startLogin}>Login</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, { startLogin })(LoginPage);

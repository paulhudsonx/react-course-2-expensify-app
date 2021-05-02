import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = () => {};
  render = () => (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">Login to Expensify</h1>
        <p>It's time to get your expenses under control.</p>
        <button className="button" onClick={this.props.startLogin}>
          Login with Google
        </button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, { startLogin })(LoginPage);

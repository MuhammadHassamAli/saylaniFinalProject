import React from "react";
import { connect } from "react-redux";
import { startGetCurrentUser } from "../actions/Auth";

import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { history } from "../store";
import 'react-toastify/dist/ReactToastify.css';

import AppComponent from "./App";

class CheckingUser extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loader: true
    };
  }
  componentWillMount() {
    this.props.startGetCurrentUser();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loader: false });
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        {this.state.loader ? (
          <p />
        ) : (
          <ConnectedRouter history={history}>
            <Switch>
            
              <Route path="/" component={AppComponent} />
            </Switch>
          </ConnectedRouter>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { authUser, error } = auth;
  return { authUser, error };
};
export default connect(
  mapStateToProps,
  { startGetCurrentUser }
)(CheckingUser);

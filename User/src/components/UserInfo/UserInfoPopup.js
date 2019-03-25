import React from "react";
import { connect } from "react-redux";
import { userSignOut } from "actions/Auth";
import IntlMessages from "util/IntlMessages";
import { Link } from "react-router-dom";

class UserInfoPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.userDetail.name,
      email: this.props.userDetail.email
    });
  }

  render() {
    return (
      <div>
        <div className="user-profile">
          <div className="user-detail ml-2">
            <h5 className="user-name mb-0">{this.state.email}</h5>
            <small>{this.state.name}</small>
          </div>
        </div>
        <Link to="/app/profile" style={{ textDecoration: "none" }}>
          <span className="jr-link dropdown-item text-muted">
            <i className="zmdi zmdi-face zmdi-hc-fw mr-1" />
            <IntlMessages id="popup.profile" />
          </span>
        </Link>
        <span
          className="jr-link dropdown-item text-muted"
          onClick={() => {
            this.props.userSignOut();
          }}
        >
          <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-1" />
          <IntlMessages id="popup.logout" />
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.auth.authUser,
  userDetail: state.auth.userDetail
});

export default connect(
  mapStateToProps,
  { userSignOut }
)(UserInfoPopup);

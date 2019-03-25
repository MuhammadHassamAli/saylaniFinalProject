import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "../style.css";
import { connect } from "react-redux";

class ProfileHeader extends React.Component {
  componentDidMount() {}
  render() {
    const { userDetail } = this.props;
    return (
      <div className="jr-profile-banner" style={{ backgroundColor: "#393b7d" }}>
        <div className="jr-profile-container">
          <div className="jr-profile-banner-top">
            <div className="jr-profile-banner-top-left">
              <div className="jr-profile-banner-avatar">
                <Avatar
                  className="size-90"
                  alt="..."
                  src={require("../../../assets/images/profile.png")}
                />
              </div>
              <div className="jr-profile-banner-avatar-info">
                <h2 className="mb-2 jr-mb-sm-3 jr-fs-xxl jr-font-weight-light">
                  {userDetail.name}
                </h2>
                <p className="mb-0 jr-fs-lg">{userDetail.email}</p>
              </div>
            </div>
          </div>
        </div>
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
  null
)(ProfileHeader);

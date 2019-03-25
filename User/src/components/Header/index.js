import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import {
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
  INSIDE_THE_HEADER
} from "constants/ActionTypes";
import SearchBox from "components/SearchBox";
import { switchLanguage, toggleCollapsedNav } from "actions/Setting";
import IntlMessages from "util/IntlMessages";
import Menu from "components/TopNav/Menu";
import UserInfoPopup from "components/UserInfo/UserInfoPopup";
import { searchPost } from "../../actions/PostActions";

class Header extends React.Component {
  onAppNotificationSelect = () => {
    this.setState({
      appNotification: !this.state.appNotification
    });
  };
  onMailNotificationSelect = () => {
    this.setState({
      mailNotification: !this.state.mailNotification
    });
  };
  onLangSwitcherSelect = event => {
    this.setState({
      langSwitcher: !this.state.langSwitcher,
      anchorEl: event.currentTarget
    });
  };
  onSearchBoxSelect = () => {
    this.setState({
      searchBox: !this.state.searchBox
    });
  };
  onAppsSelect = () => {
    this.setState({
      apps: !this.state.apps
    });
  };
  onUserInfoSelect = () => {
    this.setState({
      userInfo: !this.state.userInfo
    });
  };
  handleRequestClose = () => {
    this.setState({
      langSwitcher: false,
      userInfo: false,
      mailNotification: false,
      appNotification: false,
      searchBox: false,
      apps: false
    });
  };
  onToggleCollapsedNav = e => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedNav(val);
  };

  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      searchBox: false,
      searchText: "",
      mailNotification: false,
      userInfo: false,
      langSwitcher: false,
      appNotification: false,
      searchPlaceholder: ""
    };
  }

  updateSearchText = evt => {
    this.props.searchPost(evt.target.value);
    this.setState({
      searchText: evt.target.value
    });
  };

  Apps = () => {
    return (
      <ul className="jr-list jr-list-half">
        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/calendar/basic">
            <i className="zmdi zmdi-calendar zmdi-hc-fw" />
            <span className="jr-list-text">
              <IntlMessages id="sidebar.calendar.basic" />
            </span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/to-do">
            <i className="zmdi zmdi-check-square zmdi-hc-fw" />
            <span className="jr-list-text">
              <IntlMessages id="sidebar.appModule.toDo" />
            </span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/mail">
            <i className="zmdi zmdi-email zmdi-hc-fw" />
            <span className="jr-list-text">
              <IntlMessages id="sidebar.appModule.mail" />
            </span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/chat">
            <i className="zmdi zmdi-comment zmdi-hc-fw" />
            <span className="jr-list-text">
              <IntlMessages id="sidebar.appModule.chat" />
            </span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/contact">
            <i className="zmdi zmdi-account-box zmdi-hc-fw" />
            <span className="jr-list-text">
              <IntlMessages id="sidebar.appModule.contact" />
            </span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/">
            <i className="zmdi zmdi-plus-circle-o zmdi-hc-fw" />
            <span className="jr-list-text">Add New</span>
          </Link>
        </li>
      </ul>
    );
  };

  render() {
    const { drawerType, navigationStyle, horizontalNavPosition } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? "d-block d-xl-none"
      : drawerType.includes(COLLAPSED_DRAWER)
      ? "d-block"
      : "d-none";

    return (
      <AppBar
        className={`app-main-header ${
          navigationStyle === HORIZONTAL_NAVIGATION &&
          horizontalNavPosition === BELOW_THE_HEADER
            ? "app-main-header-top"
            : ""
        }`}
      >
        <Toolbar className="app-toolbar" disableGutters={false}>
          {navigationStyle === HORIZONTAL_NAVIGATION ? (
            <div
              className="d-block d-md-none pointer mr-3"
              onClick={this.onToggleCollapsedNav}
            >
              <span className="jr-menu-icon">
                <span className="menu-icon" />
              </span>
            </div>
          ) : (
            <IconButton
              className={`jr-menu-icon mr-3 ${drawerStyle}`}
              aria-label="Menu"
              onClick={this.onToggleCollapsedNav}
            >
              <span className="menu-icon" />
            </IconButton>
          )}

          <Link className="app-logo mr-2 d-sm-block" to="/">
            <img
              src={require("assets/images/h3.png")}
              alt="HighLight"
              title="HighLight Online"
              width="150px"
              height="100%"
            />
          </Link>

          <SearchBox
            styleName="d-lg-block"
            placeholder="Search"
            onChange={this.updateSearchText}
            value={this.state.searchText}
          />
          {navigationStyle === HORIZONTAL_NAVIGATION &&
            horizontalNavPosition === INSIDE_THE_HEADER && <Menu />}

          <ul className="header-notifications list-inline ml-auto">
            {navigationStyle === HORIZONTAL_NAVIGATION && (
              <li className="list-inline-item user-nav">
                <Dropdown
                  className="quick-menu"
                  isOpen={this.state.userInfo}
                  toggle={this.onUserInfoSelect.bind(this)}
                >
                  <DropdownToggle
                    className="d-inline-block"
                    tag="span"
                    data-toggle="dropdown"
                  >
                    <IconButton className="icon-btn size-30">
                      <i className="zmdi zmdi-account-circle " />
                    </IconButton>
                  </DropdownToggle>

                  <DropdownMenu right>
                    <UserInfoPopup />
                  </DropdownMenu>
                </Dropdown>
              </li>
            )}
          </ul>

          <div className="ellipse-shape" />
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { drawerType, navigationStyle, horizontalNavPosition } = settings;
  const { authUser, user } = auth;
  return { drawerType, navigationStyle, horizontalNavPosition, authUser, user };
};

export default withRouter(
  connect(
    mapStateToProps,
    { toggleCollapsedNav, switchLanguage, searchPost }
  )(Header)
);

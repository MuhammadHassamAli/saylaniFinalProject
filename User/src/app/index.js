import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "components/Header/index";
import Sidebar from "containers/SideNav/index";
import Footer from "components/Footer";
import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION
} from "constants/ActionTypes";
import { isIOS, isMobile } from "react-device-detect";
import asyncComponent from "../util/asyncComponent";
import {
  getCategories,
  getPost,
  getFvtPost,
  getTags
} from "../actions/PostActions";
import TopNav from "../components/TopNav";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      authUser: ""
    };
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getPost();
    this.props.getTags();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authUser) {
      if(nextProps.userDetail.active){
        this.setState({
          loader: false,
          authUser: nextProps.authUser
        });

      }
      // else{
      //   this.setState({
      //     loader: false
      //   });
      //   this.props.history.push("/register");

      // }
     
    } else {
      this.setState({
        loader: false
      });
      this.props.history.push("/signin");
    }
  }

  render() {
    const {
      match,
      drawerType,
      navigationStyle,
      horizontalNavPosition
    } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? "fixed-drawer"
      : drawerType.includes(COLLAPSED_DRAWER)
      ? "collapsible-drawer"
      : "mini-drawer";

    //set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add("ios-mobile-view-height");
    } else if (document.body.classList.contains("ios-mobile-view-height")) {
      document.body.classList.remove("ios-mobile-view-height");
    }

    return (
      <div className={`app-container ${drawerStyle}`}>
        <div className="app-main-container">
          <Sidebar />
          <div
            className={`app-header ${
              navigationStyle === HORIZONTAL_NAVIGATION
                ? "app-header-horizontal"
                : ""
            }`}
          >
            {navigationStyle === HORIZONTAL_NAVIGATION &&
              horizontalNavPosition === ABOVE_THE_HEADER && (
                <TopNav styleName="app-top-header" />
              )}
            <Header />
            {navigationStyle === HORIZONTAL_NAVIGATION &&
              horizontalNavPosition === BELOW_THE_HEADER && <TopNav />}
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Switch>
                <Route
                  path={`${match.url}/feed`}
                  component={asyncComponent(() => import("./routes/Feed"))}
                />
                <Route
                  path={`${match.url}/live`}
                  component={asyncComponent(() => import("./routes/Live"))}
                />
                <Route
                  path={`${match.url}/account`}
                  component={asyncComponent(() => import("./routes/Account"))}
                />
                <Route
                  path={`${match.url}/profile`}
                  component={asyncComponent(() =>
                    import("../components/profile")
                  )}
                />
                <Route
                  path={`${match.url}/detail`}
                  component={asyncComponent(() =>
                    import("./routes/Feed/Components/Detail")
                  )}
                />
                <Route
                  path={`${match.url}/favorites`}
                  component={asyncComponent(() => import("./routes/Favorites"))}
                />
                <Route
                  component={asyncComponent(() =>
                    import("components/Error404")
                  )}
                />
              </Switch>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { drawerType, navigationStyle, horizontalNavPosition } = settings;
  const { authUser, loader, userDetail } = auth;
  return {
    drawerType,
    navigationStyle,
    horizontalNavPosition,
    authUser,
    loader,
    userDetail
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { getCategories, getPost, getFvtPost, getTags }
  )(App)
);

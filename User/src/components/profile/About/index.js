import React from "react";
import Widget from "../../Widget";
import AboutItem from "./AboutItem";
import "../style.css";
import { connect } from "react-redux";

class About extends React.Component {
  state = {
    aboutList: [],
    value: 0
  };

  handleChange = value => {
    this.setState({ value });
  };
  componentDidMount() {
    let user = this.props.userDetail;
    let array = [
      {
        id: 1,
        title: "Name",
        icon: "city-alt",
        userList: "",
        desc: user.name
      },
      {
        id: 2,
        title: "Email",
        icon: "email",
        userList: "",
        desc: user.email
      },
      {
        id: 3,
        title: "Age",
        icon: "cake",
        userList: "",
        desc: user.age
      },
      {
        id: 4,
        title: "Cell",
        icon: "phone",
        userList: "",
        desc: user.phone
      }
    ];
    this.setState({
      aboutList: array
    });
  }

  render() {
    const { value, aboutList } = this.state;
    return (
      <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile">
        <div className="card-header">
          <h4 className="card-title mb-0">About</h4>
        </div>
        <div className="jr-tabs-classic">
          {/* <Tabs className="jr-tabs-up" value={value} onChange={this.handleChange}>
            <Tab className="jr-tabs-label" label="Overview"/>
            <Tab className="jr-tabs-label" label="Work"/>
            <Tab className="jr-tabs-label" label="Education"/>
          </Tabs> */}
          <div className="jr-tabs-content jr-task-list">
            <div className="row">
              {value === 0 &&
                aboutList.map((about, index) => (
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                    <AboutItem data={about} />
                  </div>
                ))}
              {value === 1 &&
                aboutList.map((about, index) => (
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                    <AboutItem data={about} />
                  </div>
                ))}
              {value === 2 &&
                aboutList.map((about, index) => (
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                    <AboutItem data={about} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Widget>
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
)(About);

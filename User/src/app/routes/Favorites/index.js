import React from "react";
import { connect } from "react-redux";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActionsWrapped from "../../../components/pagination/TablePagination";
import Table from "@material-ui/core/Table";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import BasicCard from "../../../components/favCards/BasicCard";
import Sidebar from "./FavSideBar";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";

// Actions
import { getPost, getFvtPost } from "../../../actions/PostActions";

import "../Feed/Components/SideBar/style.css";

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: [],
      loader: true,
      data: [],
      copyData: [],
      branches: [],
      page: 0,
      rowsPerPage: 4
    };
  }

  componentDidMount() {
    if (this.props.userDetail.uid) {
      this.props.getFvtPost(this.props.userDetail.uid);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({});
    if (nextProps.favPostGetStatus === "done") {
      this.setState({
        loader: false,
        postData: nextProps.postData
      });
    } else if (nextProps.favPostGetStatus === "error") {
      this.setState({
        loader: false
      });
      toast.error("something went wrong. try again");
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { rowsPerPage, page, postData } = this.state;
    const { loader } = this.state;

    return (
      <div className="container-fluid">
        <h1 style={{ marginTop: "30px", marginBottom: "20px" }}>
          My Favorites
        </h1>
        {/* <Hidden only={['xs']}> */}
        {loader ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-12">
              <Sidebar />
            </div>
            {/* </Hidden> */}

            <div className="col-lg-9 col-md-9 col-sm-12">
              <div className="row">
                {this.state.postData.length > 0 ? (
                  this.state.postData.map((item, index) => {
                    return (
                      <div className="col-lg-6 col-md-6 col-sm-12" key={index}>
                        <BasicCard
                          image={item.image}
                          title={item.name}
                          onClick={this.detailRoute}
                          category={item.category}
                          tags={item.tags}
                          checkFvt={item.fvt}
                          id={item.id}
                        />
                      </div>
                    );
                  })
                ) : (
                  <div>
                    <h1>My Favorites</h1>
                  </div>
                )}
              </div>

              {this.state.postData.length > 0 ? (
                <div className="row">
                  <div className="col-md-8" />
                  <div
                    className="col-md-4"
                    style={{
                      backgroundColor: "white",
                      marginTop: 15,
                      marginBottom: 15
                    }}
                  >
                    <Table>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions=""
                            labelRowsPerPage=""
                            colSpan={7}
                            count={postData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActionsWrapped}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </div>
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  postData: state.posts.fvtPosts,
  userDetail: state.auth.userDetail,
  allPost: state.posts.allPosts,
  favPostGetStatus: state.posts.favPostGetStatus,
  loader: state.posts.loader
});

export default connect(
  mapStateToProps,
  {
    getPost,
    getFvtPost
  }
)(Favorites);

import React from "react";
import { connect } from "react-redux";
import TablePagination from "@material-ui/core/TablePagination";
import BasicCard from "../../../../../components/basicCards/BasicCard";
import Sidebar from "../SideBar";
import TablePaginationActionsWrapped from "../../../../../components/pagination/TablePagination";
import Table from "@material-ui/core/Table";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
// Actions
import { getDetail, getPost } from "../../../../../actions/PostActions";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./style.css";

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: [],
      data: [],
      copyData: [],
      branches: [],
      page: 0,
      rowsPerPage: 4,
      loader: true
    };
  }

  componentDidMount() {
    this.props.getPost();
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      postData: nextProps.posts
    });
    if (this.props.postStatus === "done") {
      this.setState({
        loader: false
      });
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { postData, rowsPerPage, page, loader } = this.state;

    return (
      <div className="container-fluid">
        {loader ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-12">
              <Sidebar />
            </div>

            <div className="col-lg-9 col-md-9 col-sm-12">
              <div className="row">
                {postData.length > 0 ? (
                  postData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                    .map((item, index) => {
                      return (
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <BasicCard
                            image={item.image}
                            title={item.name}
                            onClick={() => this.detailRoute(item.id)}
                            category={item.category}
                            tags={item.tags}
                            id={item.id}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div style={{ margin: "auto" }}>
                    <h4>No post was found</h4>
                  </div>
                )}
              </div>
              {this.state.postData.length > 0 ? (
                <div className="row">
                  <div className="col-md-8" />
                  <div
                    className="col-md-4"
                    style={{ backgroundColor: "white", margin: "15px 0px" }}
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
  posts: state.posts.allPosts,
  sortStatus: state.posts.sortStatus,
  loader: state.posts.loader,
  favPostGetStatus: state.posts.favPostGetStatus,
  postStatus: state.posts.postStatus
});

export default connect(
  mapStateToProps,
  {
    getDetail,
    getPost
  }
)(Cards);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import degreeIcon from "../../../../../assets/vendors/college-graduation.svg";
import tagIcon from "../../../../../assets/vendors/tag.svg";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { toast } from "react-toastify";
import {addFvt} from '../../../../../actions/PostActions'

import { styles } from "./style";
import { connect } from "react-redux";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      post: [],
      loader: true,
      tabs: [],
      iconLoader: false,
      fvPosts: [],
      colr: "not clicked"
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };


  addFvtRecord = id => {
    this.setState({
      iconLoader: true
    });
    var found = this.state.fvPosts.some(function(el) {
      return el.id === id;
    });

    if (!found) {
      const data = {
        postId: id,
        userId: this.props.userDetail.uid,
        create_At: new Date()
      };

      this.props.addFvt(data);
      this.setState({
        colr: "clicked"
      });
    } else {
      this.setState({
        iconLoader: false
      });
      toast.error("Post already added to Favorites");
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.detailPost.length > 0) {
      let post = nextProps.posts.filter(
        item => item.id === nextProps.detailPost[0].postId
      );
      this.setState({
        post: post,
        tabs: nextProps.detailPost
      });
    } else {
      this.props.history.push("/app/feed");
    }
    if (nextProps.detailPostStatus === "done") {
      this.setState({
        loader: false
      });
    }
    if (nextProps.favPostGetStatus === "done") {
      this.setState({
        fvPosts: nextProps.fvtPosts
      });
    }

    if (nextProps.favPostAddStatus === "done") {
      this.setState({
        iconLoader: false
      });
    } else if (nextProps.favPostAddStatus === "error") {
      this.setState({
        iconLoader: false
      });
      toast.error("error occur, try again");
    }
  }

  render() {
    const { classes } = this.props;
    const { value, post } = this.state;
  
    return (
      <div className="container" style={{ marginTop: 10 }}>
        {this.state.loader ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress className={classes.progress} />
          </div>
        ) : (
          <Grid container>
            {post.length > 0 ? (
              post.map((item, index) => {
                let found = this.state.fvPosts.some(function(el) {
                  return el.id === item.id;
                });
                console.log('====================================');
                console.log(item);
                console.log('====================================');
                return (
                  <div style={{ width: "100%" }}>
                    <Grid item xs={8} md={6}>
                      <h1 className={classes.heading}>{item.name}</h1>
                      <Grid container spacing={16}>
                        <Grid item width={8}>
                          <h3>{item.category}</h3>
                        </Grid>
                        <Grid item width={8}>
                          <img
                            src={tagIcon}
                            className={classes.tagIcon}
                            alt="No Icon"
                            width="25"
                          />
                          {item.tags.length > 0 ? (
                            item.tags.map((tag, index) => {
                              return (
                                <span key={index} style={{ color: "#AAA1A1" }}>
                                  {tag}
                                  {", "}
                                </span>
                              );
                            })
                          ) : (
                            <span />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={4} md={6} className={classes.icons}>
                      <img
                        src={degreeIcon}
                        className={classes.degreeIcon}
                        alt="No Icon"
                      />

                      <IconButton aria-label="Add to favorites">
                        {this.state.iconLoader ? (
                          <CircularProgress />
                        ) : found || this.state.colr === "clicked" ? (
                          <FavoriteIcon
                            style={{
                              fontSize: "50px",
                              float: "right",
                              color: "red"
                            }}
                          />
                        ) : (
                          <FavoriteIcon
                            onClick={() => this.addFvtRecord(item.id)}
                            style={{
                              fontSize: "50px",
                              float: "right",
                              color: "blue"
                            }}
                          />
                        )}
                      </IconButton>
                    </Grid>
                    <AppBar position="static" color="default">
                      <Tabs
                        value={value}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                      >
                        {this.state.tabs.length > 0 ? (
                          this.state.tabs.map((tab, index) => {
                            return (
                              <Tab
                                label={tab.title}
                                key={index}
                                // icon={<PhoneIcon />}
                              />
                            );
                          })
                        ) : (
                          <span />
                        )}
                      </Tabs>
                    </AppBar>
                    {this.state.tabs.length > 0 ? (
                      this.state.tabs.map((tab, index) => {
                        return (
                          value === index && (
                            <TabContainer><div dangerouslySetInnerHTML={{__html: tab.content }}></div></TabContainer>
                          )
                        );
                      })
                    ) : (
                      <span />
                    )}
                  </div>
                );
              })
            ) : (
              <p>There is no detail</p>
            )}
          </Grid>
        )}
      </div>
    );
  }
}

Detail.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  detailPost: state.posts.detailPost,
  detailPostStatus: state.posts.detailPostStatus,
  posts: state.posts.allPosts,
  fvtPosts: state.posts.fvtPosts,
  userDetail: state.auth.userDetail,
  loader: state.posts.loader,
  favPostGetStatus: state.posts.favPostGetStatus,
  favPostAddStatus: state.posts.favPostAddStatus
});

export default connect(
  mapStateToProps,
  {addFvt}
)(withStyles(styles)(Detail));

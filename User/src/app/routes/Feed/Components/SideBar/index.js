import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { styles } from "./styles";
import React, { Component } from "react";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import upper from "../../../../../assets/vendors/upper.svg";
import "./style.css";
import Chip from "@material-ui/core/Chip";
import {
  filterPostTag,
  sorting,
  getAllPost,
  getCategories,
  categoryFilter
} from "../../../../../actions/PostActions";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      sortTag: "New"
    };
  }

  filterByCategory = category => {
    this.props.categoryFilter(category);
  };

  getAll = () => {
    this.props.getAllPost();
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = sortType => {
    this.props.sorting(sortType);

    this.setState({
      open: false,
      sortTag: sortType
    });
  };

  chipClick = tag => {
    this.props.filterPostTag(tag);
  };

  render() {
    const { classes, allCategory, allTags } = this.props;
    const { open } = this.state;

    return (
      <div
        style={{
          backgroundColor: "white",
          padding: 15,
          borderRadius: 5,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        }}
      >
        {/* start Filters */}
        <div className="row">
          <div className="col-md-6 col-sm-6">
            <h1>Filters</h1>
          </div>
          <div className="col-md-6 col-sm-6">
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ borderRadius: 18, float: "right", marginBottom: 4 }}
              className={classes.topBtn}
              onClick={this.getAll}
            >
              See All
            </Button>
          </div>
        </div>

        <div className="row">
          {allCategory.length > 0 ? (
            allCategory.map((item, index) => {
              return (
                <div className="col-md-12" key={index}>
                  <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => {
                      this.filterByCategory(item.name);
                    }}
                  >
                    <div
                      className="row"
                      style={{ fontSize: 12, width: "100%" }}
                    >
                      <div
                        className="col-md-6 col-sm-6"
                        style={{ textAlign: "left", float: "left", padding: 0 }}
                      >
                        {item.name}
                      </div>
                      <div
                        className="col-md-6 col-sm-6"
                        style={{ float: "right", textAlign: "right" }}
                      />
                    </div>
                  </Button>
                </div>
              );
            })
          ) : (
            <p>without categories</p>
          )}
        </div>
        {/* end filters */}

        {/* start tags */}
        <div>
          <br />
          <h1>Tags</h1>

          <div className="row tags" style={{ marginRight: "5px" }}>
            {allTags.length > 0 ? (
              allTags.map((tag, index) => {
                return (
                 
                    <Chip
                      label={tag.tag}
                      onClick={() => this.chipClick(tag)}
                      className={classes.chip}
                      variant="outlined"
                      style={{ margin: "5px 5px" }}
                    />
                 
                );
              })
            ) : (
              <p>without Tags</p>
            )}
          </div>
        </div>
        {/* end tags */}

        <div style={{ marginTop: 80, textAlign: "center" }}>
          <div>
            <Button
              buttonRef={node => {
                this.anchorEl = node;
              }}
              aria-owns={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={this.handleToggle}
            >
              <span>Sort By: {this.state.sortTag}</span>
              <img src={upper} alt="No img" />
            </Button>
            <Popper
              open={open}
              anchorEl={this.anchorEl}
              transition
              disablePortal
              style={{ width: "85%" }}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom"
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList>
                        <MenuItem
                          onClick={() => this.handleClose("New")}
                        >
                          New
                        </MenuItem>
                        <MenuItem
                          onClick={() => this.handleClose("Previous")}
                        >
                          Previous
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </div>
      </div>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  allCategory: state.posts.categories,
  savePost: state.posts.savePost,
  posts: state.posts.allPosts,
  allTags: state.posts.allTags
});

export default connect(
  mapStateToProps,
  {
    filterPostTag,
    sorting,
    getAllPost,
    getCategories,
    categoryFilter
  }
)(withStyles(styles)(SideBar));

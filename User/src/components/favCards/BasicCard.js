import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import tag from "../../assets/vendors/tag.svg";
import "./style.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";

import { addFvt, deleteFvtPost, getDetail } from "../../actions/PostActions";

const styles = theme => ({
  card: {
    maxWidth: "100%",
    marginTop: 10,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class RecipeReviewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      path: "/app/detail",
      fvtIcon: "blue",
      iconLoader: false
    };
  }

  // handleExpandClick = () => {
  //   this.setState(state => ({ expanded: !state.expanded }));
  // };

  handleCard = id => (event, expanded) => {
    if (event.target.classList.contains("iconBtn")) {
      return this.setState({
        path: ""
      });
    } else {
      this.setState({
        path: "/app/detail"
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.deleteFavStatus === "done") {
      this.setState({
        iconLoader: false
      });
    } else if (nextProps.deleteFavStatus === "error") {
      this.setState({
        iconLoader: false
      });
      toast.error("error occur, try again");
    }
  }

  deleteFvtPostRecord = id => {
    this.setState({
      iconLoader: true
    });
    this.props.deleteFvtPost(id);
  };

  cardDetail = id => {
    this.props.getDetail(id);
  };

  render() {
    const { classes, id, image, title, tags, category } = this.props;

    return (
      <Card className={classes.card}>
        <Link
          to={this.state.path}
          style={{ textDecoration: "none", color: "#575757" }}
          onClick={this.handleCard}
        >
          <CardMedia
            className={classes.media}
            image={image}
            title="Paella dish"
            onClick={() => this.cardDetail(id)}
          />
        </Link>

        <CardContent style={{ padding: "10px 10px 10px 15px" }}>
          <div className="row">
            <div
              className="col-lg-9 col-md-8 col-sm-10 col-xs-6"
              style={{ width: "70%" }}
            >
              <span className="card_title">
                <strong>{title}</strong>
              </span>
            </div>
            <div
              className="col-lg-3 col-md-4 col-sm-2 col-xs-6"
              style={{ width: "30%", textAlign: "right" }}
            >
              <IconButton
                aria-label="Add to favorites"
                style={{ padding: 0 }}
                className="iconBtn"
                name="favorite"
              >
                {this.state.iconLoader ? (
                  <CircularProgress />
                ) : (
                  <FavoriteIcon
                    onClick={() => this.deleteFvtPostRecord(id)}
                    style={{ fontSize: "35px", float: "right", color: "red" }}
                  />
                )}
              </IconButton>
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-5"
              style={{ width: "30%", flexDirection: "row" }}
            >
              <h4>{category} </h4>
            </div>
            <div
              className="col-md-7"
              style={{ textAlign: "right", width: "70%" }}
            >
              {/* <div> */}
              <div>
                <img
                  src={tag}
                  alt="tags"
                  width="12px"
                  style={{ marginRight: 10 }}
                />
                {tags.length > 0 ? (
                  tags.map((tag, index) => {
                    return (
                      <span
                        style={{ color: "blue", marginTop: 10 }}
                        key={index}
                      >
                        {tag}
                        {", "}
                      </span>
                    );
                  })
                ) : (
                  <p />
                )}
              </div>
              {/* </div> */}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.allPosts,
  userDetail: state.auth.userDetail,
  deleteFavStatus: state.posts.deleteFavStatus,
  loader: state.posts.loader
});

export default connect(
  mapStateToProps,
  {
    addFvt,
    deleteFvtPost,
    getDetail
  }
)(withStyles(styles)(RecipeReviewCard));

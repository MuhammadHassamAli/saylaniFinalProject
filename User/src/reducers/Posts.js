import {
  GET_ALL_POSTS,
  GET_ALL_CATEGORIES,
  DETAIL_POST,
  DETAIL_POST_ERR,
  FILTER_TAG,
  SORT_POST,
  GET_ALL_POST_FILTER,
  CATEGORY_FILTER,
  ADD_FVT_POST,
  ADD_FVT_POST_ERR,
  GET_FVT_POSTS,
  GET_FVT_POSTS_ERR,
  DELETE_FVT_POST,
  DELETE_FVT_POST_ERR,
  GET_ALL_FAV_FILTER,
  CATEGORY_FAV_FILTER,
  FILTER_FAV_TAG,
  SORT_FAV_POST,
  GET_ALL_TAGS,
  SEARCH_POST
} from "../actions/PostActions";

const INIT_STATE = {
  loader: false,
  initURL: "",
  allPosts: [],
  error: "sdfa",
  categories: [],
  detailPost: [],
  detailPostStatus: "not done",
  sortStatus: "not done",
  savePost: [],
  deleteFavStatus: "not done",

  fvtPosts: [],
  favPostAddStatus: "not done",
  favPostGetStatus: "not done",
  saveFav: [],
  postStatus: "not done",
  allTags: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_POSTS: {
      let postArray = action.payload;

      postArray.sort(function(a, b) {
        return new Date(b.postedAt.toDate()) - new Date(a.postedAt.toDate());
      });

      return {
        ...state,
        loader: new Date(),
        allPosts: postArray,
        savePost: postArray,
        postStatus: "done"
      };
    }
    case GET_ALL_CATEGORIES: {
      return {
        ...state,
        loader: false,
        categories: action.payload
      };
    }
    case DETAIL_POST: {
      return {
        ...state,
        loader: new Date(),
        detailPost: action.payload,
        detailPostStatus: "done"
      };
    }
    case DETAIL_POST_ERR: {
      return {
        ...state,
        loader: new Date(),
        detailPostStatus: "error"
      };
    }
    // #######################  Favorite  ###############################
    case ADD_FVT_POST: {
      return {
        ...state,
        fvtPosts: state.fvtPosts.concat([action.payload]),
        favPostAddStatus: "done",
        saveFav: state.fvtPosts.concat([action.payload])
      };
    }

    case ADD_FVT_POST_ERR: {
      return {
        ...state,
        favPostAddStatus: "error"
      };
    }

    case GET_FVT_POSTS: {
      let updateFvtPosts = [];
      action.payload.map((singleFvt, index) => {
        let fvts = state.allPosts.filter(item => item.id === singleFvt.postId);
        return updateFvtPosts.push(...fvts);
      });

      return {
        ...state,
        fvtPosts: updateFvtPosts,
        saveFav: updateFvtPosts,
        loader: new Date(),
        favPostGetStatus: "done"
      };
    }

    case GET_FVT_POSTS_ERR: {
      return {
        ...state,
        loader: new Date(),
        favPostGetStatus: "error"
      };
    }
    case DELETE_FVT_POST: {
      let newPostArray = state.fvtPosts.filter(
        item => item.id !== action.payload
      );
      return {
        ...state,
        fvtPosts: newPostArray,
        saveFav: newPostArray,
        loader: new Date(),
        deleteFavStatus: "done"
      };
    }
    case DELETE_FVT_POST_ERR: {
      return {
        loader: new Date(),
        deleteFavStatus: "error"
      };
    }

    case SORT_POST: {
      let postArray = state.allPosts;
      if (action.payload === "Newest first") {
        postArray.sort(function(a, b) {
          return new Date(b.postedAt.toDate()) - new Date(a.postedAt.toDate());
        });
      } else {
        postArray.sort(function(a, b) {
          return new Date(a.postedAt.toDate()) - new Date(b.postedAt.toDate());
        });
      }
      return {
        ...state,
        allPosts: postArray,
        sortStatus: new Date()
      };
    }

    case GET_ALL_POST_FILTER: {
      return {
        ...state,
        allPosts: state.savePost,
        loader: new Date()
      };
    }
    case CATEGORY_FILTER: {
      let category = action.payload;
      let allPostsArray = state.savePost;
      let filteredArray = allPostsArray.filter(
        item => item.category === category
      );

      return {
        ...state,
        allPosts: filteredArray,
        loader: new Date()
      };
    }

    case FILTER_TAG: {
      let postAll = state.savePost;
      let checkTags = [action.payload.tag];

      var result = postAll.filter(function(post) {
        return post.tags.some(function(tag) {
          return checkTags.includes(tag);
        });
      });

      return {
        ...state,
        allPosts: result,
        loader: new Date()
      };
    }

    case GET_ALL_FAV_FILTER: {
      return {
        ...state,
        fvtPosts: state.saveFav,
        loader: new Date()
      };
    }

    case CATEGORY_FAV_FILTER: {
      let favCategory = action.payload;
      let allFavArray = state.saveFav;
      let filteredFavArray = allFavArray.filter(
        item => item.category === favCategory
      );

      return {
        ...state,
        fvtPosts: filteredFavArray,
        loader: new Date()
      };
    }

    case FILTER_FAV_TAG: {
      let postAll = state.saveFav;
      let checkTags = [action.payload.tag];

      var favNewResult = postAll.filter(function(post) {
        return post.tags.some(function(tag) {
          return checkTags.includes(tag);
        });
      });

      return {
        ...state,
        fvtPosts: favNewResult,
        loader: new Date()
      };
    }
    case SORT_FAV_POST: {
      let postArray = state.saveFav;
      if (action.payload === "Newest first") {
        postArray.sort(function(a, b) {
          return new Date(b.postedAt.toDate()) - new Date(a.postedAt.toDate());
        });
      } else {
        postArray.sort(function(a, b) {
          return new Date(a.postedAt.toDate()) - new Date(b.postedAt.toDate());
        });
      }
      return {
        ...state,
        fvtPosts: postArray,
        loader: new Date()
      };
    }

    case GET_ALL_TAGS: {
      return {
        ...state,
        allTags: action.payload
      };
    }
    case SEARCH_POST: {
      let keyword = action.payload;
      let Posts = state.savePost;
      let search = Posts.filter(post =>
        post.name.toLowerCase().includes(keyword.toLowerCase())
      );

      return {
        ...state,
        allPosts: search,
        loader: new Date()
      };
    }

    default:
      return state;
  }
};

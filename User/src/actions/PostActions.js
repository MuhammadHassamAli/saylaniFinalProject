import { firestore } from "../firebase/firebase";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const GET_ALL_POSTS_ERR = "GET_ALL_POSTS_ERR";

export const ADD_FVT_POST = "ADD_FVT_POST";
export const ADD_FVT_POST_ERR = "ADD_FVT_POST_ERR";

export const UPDATE_FVT_POST = "UPDATE_FVT_POST";
export const UPDATE_FVT_POST_ERR = "UPDATE_FVT_POST_ERR";

export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";

export const DETAIL_POST = "DETAIL_POST";
export const DETAIL_POST_ERR = "DETAIL_POST_ERR";
export const FILTER_TAG = "FILTER_TAG";
export const SORT_POST = "SORT_POST";

export const GET_FVT_POSTS = "GET_FVT_POSTS";
export const GET_FVT_POSTS_ERR = "GET_FVT_POSTS_ERR";

export const DELETE_FVT_POST = "DELETE_FVT_POST";
export const DELETE_FVT_POST_ERR = "DELETE_FVT_POST_ERR";
export const GET_ALL_POST_FILTER = "GET_ALL_POST_FILTER";
export const CATEGORY_FILTER = "CATEGORY_FILTER";

export const GET_ALL_FAV_FILTER = "GET_ALL_FAV_FILTER";
export const CATEGORY_FAV_FILTER = "CATEGORY_FAV_FILTER";
export const FILTER_FAV_TAG = "FILTER_FAV_TAG";
export const SORT_FAV_POST = "SORT_FAV_POST";
export const GET_ALL_TAGS = "GET_ALL_TAGS";
export const SEARCH_POST = "SEARCH_POST";

// --------------------------------  POST's  ---------------------------------------
// Get all Post
export function getPost() {
  return dispatch => {
    firestore
      .collection("posts")
      // .where("uid", "==", data)
      .get()
      .then(function(querySnapshot) {
        let datatoStore = [];
        querySnapshot.forEach(function(doc) {
          const data = doc.data();
          const id = doc.id;

          datatoStore.push({ id, ...data });

          return datatoStore;
        });

        dispatch({
          type: GET_ALL_POSTS,
          payload: datatoStore
        });
      })
      .catch(function(error) {
        dispatch({
          type: GET_ALL_POSTS_ERR
        });
      });
  };
}

// add favorite post
export function addFvt(data) {
  return dispatch => {
    firestore
      .collection("favorites")
      .add(data)
      .then(function(docRef) {
        const id = docRef.id;
        const dataToStore = { id, ...data };

        dispatch({
          type: ADD_FVT_POST,
          payload: dataToStore
        });
      })
      .catch(function(error) {
        dispatch({
          type: ADD_FVT_POST_ERR
        });
      });
  };
}

// action for delete fvt post

export function deleteFvtPost(id) {
  return dispatch => {
    firestore
      .collection("favorites")
      .where("postId", "==", id)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        });
        dispatch({
          type: DELETE_FVT_POST,
          payload: id
        });
      })
      .catch(function(error) {
        dispatch({
          type: DELETE_FVT_POST_ERR
        });
      });
  };
}

// Get favorite Posts
export function getFvtPost(id) {
  return dispatch => {
    firestore
      .collection("favorites")
      .where("userId", "==", id)
      .get()
      .then(function(querySnapshot) {
        let datatoStore = [];
        querySnapshot.forEach(function(doc) {
          const data = doc.data();
          const favId = doc.id;
          datatoStore.push({ favId, ...data });

          return datatoStore;
        });

        dispatch({
          type: GET_FVT_POSTS,
          payload: datatoStore
        });
      })
      .catch(function(error) {
        dispatch({
          type: GET_FVT_POSTS_ERR
        });
      });
  };
}
// ----------------------------------- Category ------------------------------------
// Get all Catergories
export function getCategories() {
  return dispatch => {
    firestore
      .collection("categories")
      .get()
      .then(function(querySnapshot) {
        let datatoStore = [];
        querySnapshot.forEach(function(doc) {
          const data = doc.data();
          const id = doc.id;
          datatoStore.push({ id, ...data });

          return datatoStore;
        });

        dispatch({
          type: GET_ALL_CATEGORIES,
          payload: datatoStore
        });
      })
      .catch(function(error) {});
  };
}

export const getDetail = postId => {
  // let idnew = postId
  return dispatch => {
    firestore
      .collection("posts")
      .doc(postId)
      .collection("tabs")
      .get()
      .then(function(querySnapshot) {
        let datatoStore = [];
        querySnapshot.forEach(function(doc) {
          const data = doc.data();
          const id = doc.id;
          // let postId = {id: postId}

          datatoStore.push({ id, ...data, postId });

          return datatoStore;
        });

        dispatch({
          type: DETAIL_POST,
          payload: datatoStore
        });
      })
      .catch(function(error) {
        dispatch({
          type: DETAIL_POST_ERR
        });
      });
  };
};

export const filterPostTag = tag => {
  return {
    type: FILTER_TAG,
    payload: tag
  };
};

export const sorting = sortType => {
  return {
    type: SORT_POST,
    payload: sortType
  };
};
export const getAllPost = () => {
  return {
    type: GET_ALL_POST_FILTER
  };
};

// filter by catergory
export const categoryFilter = category => {
  return {
    type: CATEGORY_FILTER,
    payload: category
  };
};

export const getAllFav = () => {
  return {
    type: GET_ALL_FAV_FILTER
  };
};

// filter by catergory
export const categoryFavFilter = category => {
  return {
    type: CATEGORY_FAV_FILTER,
    payload: category
  };
};

export const filterFavTag = tag => {
  return {
    type: FILTER_FAV_TAG,
    payload: tag
  };
};

export const sortingFav = sortType => {
  return {
    type: SORT_FAV_POST,
    payload: sortType
  };
};

// get all tags

export function getTags() {
  return dispatch => {
    firestore
      .collection("tags")
      .get()
      .then(function(querySnapshot) {
        let datatoStore = [];
        querySnapshot.forEach(function(doc) {
          const data = doc.data();
          const id = doc.id;
          datatoStore.push({ id, ...data });

          return datatoStore;
        });

        dispatch({
          type: GET_ALL_TAGS,
          payload: datatoStore
        });
      })
      .catch(function(error) {});
  };
}

// Search by post name
export const searchPost = keyWard => {
  return {
    type: SEARCH_POST,
    payload: keyWard
  };
};

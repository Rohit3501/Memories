import {
  FETCH_POST,
  END_LOADING,
  START_LOADING,
  FETCH_BY_SEARCH,
  FETCH_ALL,
  CREATE,
  DELETE,
  UPDATE,
  LIKE,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

//Action creators := are functions that return actions
//how to build them:
export const getPosts = (page) => async (dispatch) => {
  //action is just an object that has a type and a payload.
  //with redux-thunk function will be asynchrounous and instead of return we will dispatch
  // creating some real data
  try {
    //we want to start loading before we make api call
    dispatch({ type: START_LOADING });
    //trying to fetch api data//now after changes we are not only getting the limited posts but also current Page NUmber and total number Of pages
    const { data:{data,currentPage,numberOfPages} } = await api.fetchPosts(page);
    // console.log(data);
    //taking data from backEnd
    //and dispatching  it(an action) that is passing data using redux
    dispatch({ type: FETCH_ALL, payload:{ data,currentPage,numberOfPages} });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }

  //   const action = { type: 'FETCH_ALL', payload:[]}
  //   dispatch(action);
};

//creating an action to get post by search
//redux thunk
export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    //we dont have this fetchPostBySearch so we will go to api->index.js and create this api endPoint
    //we created API endPoint in frontend as well as in backend
    //also we created the logical part into controller of backend as well which will actually fetch data from database
    //now check if you are receiving those data here or not!
    //you must destructure the data here

    //now its time to display searched posts in actual
    //so first create a constant for 'FETCH_BY_SEARCH
    //And then go to reducer to write actual logic for it
    // console.log(data);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    navigate(`/posts/${data._id}`);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
    // window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  try {
    const { data } = await api.likePost(id, user?.token);
    dispatch({ type: LIKE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

//to get a single post for postDetail
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

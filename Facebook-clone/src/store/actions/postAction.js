import * as actionType from "./actionType";
import axios from "axios";
import { API } from "../../server/server";

export const userPost = (data) => {
  return {
    type: actionType.USER_POST,
    payload: data,
  };
};
export const userPostData = (data) => {
  return {
    type: actionType.USER_POST_DATA,
    payload: data,
  };
};

export const getPost = () => {
  return async (dispatch) => {
    await axios
      .get(`${API}/user/post/`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      })
      .then((res) => {
        dispatch(userPost(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getPostData = (user_id) => {
  return async (dispatch) => {
    await axios
      .get(`${API}/user/post/${user_id}/`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(userPostData(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const createUserPost = (data) => {
  return {
    type: actionType.CREATE_USER_POST,
    payload: data,
  };
};

export const createPost = (formData) => {
  return async (dispatch) => {
    await axios
      .post(`${API}/user/post/`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          dispatch(getPost());
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addLike = (data) => {
  return {
    type: actionType.ADD_LIKE,
    payload: data,
  };
};
export const getLikeData = (data) => {
  return {
    type: actionType.GET_LIKE,
    payload: data,
  };
};

export const getLike = (post_id) => {
  return async (dispatch) => {
    await axios
      .get(`${API}/likes/1/`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

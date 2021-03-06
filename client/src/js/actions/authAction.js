import axios from 'axios';
import {setAlert} from './alert'
import{
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    UPDATE_PICTURE,
} from './actionTypes';
import setToken from'./setToken';



// Registration
export const register = ({ name, email, password,avatar }) => async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    const body = JSON.stringify({ name, email, password,avatar });
  
    try {
      const res = await axios.post("/api/users", body, config);
  
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
  dispatch(loadUser())
    } catch (err) {
      const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
      dispatch({
        type: REGISTER_FAIL
      });
    }
  };

  //Load User

export const loadUser = () => async dispatch => {

  if (localStorage.token) {
    setToken(localStorage.token);
  }

 

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};



// Login
export const login = ( email, password ) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
dispatch(loadUser())
  } catch (err) {

   const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => dispatch =>{
  dispatch({
    type: CLEAR_PROFILE
  });
  dispatch({
    type: LOGOUT
  });

};

// update picture

export const updatePicture = (avatar,id) => async (dispatch) => {
   
  try {
    const res = await axios.put(`/api/users/${id}`,avatar);

    dispatch({
      type: UPDATE_PICTURE,
      payload: res.data,
    });
    dispatch(loadUser())
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  DELETE_ACCOUNT,
  UPDATE_PICTURE
} from "../actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  loading: true,
  user: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload,
      };
      case UPDATE_PICTURE:
        return{
          ...state,
          user:{...state.user,payload},
          loading: false
        }
    case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false,
      };
   
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case  LOGIN_FAIL:
      case  LOGOUT:
        case DELETE_ACCOUNT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
      };
    default:
      return state;
  }
}

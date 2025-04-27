import { axiosInstance } from "../../utils/axiosInstance";
import {
  LOGIN_FAILURE_METHOD,
  LOGIN_REQUEST_METHOD,
  LOGIN_SUCCESS_METHOD,
  USER_FAILURE_METHOD,
  USER_REQUEST_METHOD,
  USER_SUCCESS_METHOD,
} from "./auth.actionTypes";

export const loginRequest = () => ({
  type: LOGIN_REQUEST_METHOD,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS_METHOD,
  payload: data,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE_METHOD,
  payload: error,
});

export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axiosInstance.post(`/api/v1/users/login`, {
        username,
        password,
      });
      const data = response.data;
      if (response.status === 200) {
        const { accessToken, refreshToken, name, role } = data?.data;
        dispatch(loginSuccess({ accessToken, refreshToken, name, role }));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("role", role);
        localStorage.setItem("name", name);
        // console.log(data);
      } else {
        dispatch(loginFailure("Invalid username or password"));
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Invalid username or password";
      dispatch(loginFailure(errorMessage));
    }
  };
};

export const UserDetailsRequest = () => ({
  type: USER_REQUEST_METHOD,
});

export const UserDetailsSuccess = (data) => ({
  type: USER_SUCCESS_METHOD,
  payload: data,
});

export const UserDetailsFailure = (error) => ({
  type: USER_FAILURE_METHOD,
  payload: error,
});

export const getUserDetails = () => {
  return async (dispatch) => {
    dispatch(UserDetailsRequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get(`/api/v1/users/details/token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.status === 200) {
        dispatch(UserDetailsSuccess(response?.data?.data));
        return "SUCCESS";
      } else {
        dispatch(UserDetailsFailure(response?.data.message));
        return "FAILURE";
      }
    } catch (error) {
      dispatch(UserDetailsFailure(error.message));
      return "FAILURE";
    }
  };
};

export const updateUserDetails = (id, data) => {
  return async (dispatch) => {
    dispatch(UserDetailsRequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.put(`/api/v1/users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.status === 200) {
        dispatch(UserDetailsSuccess(response?.data?.data));
        return "SUCCESS";
      } else {
        dispatch(UserDetailsFailure(response?.data.message));
      }
    } catch (error) {
      dispatch(UserDetailsFailure(error.message));
    }
  };
};

import { axiosInstance } from "../../utils/axiosInstance";

export const JOBS_REQUEST = "JOBS_REQUEST";
export const JOBS_SUCCESS = "JOBS_SUCCESS";
export const SINGLE_JOBS_SUCCESS = "SINGLE_JOBS_SUCCESS";
export const QUICK_JOBS_SUCCESS = "QUICK_JOBS_SUCCESS";
export const NEW_JOBS_SUCCESS = "NEW_JOBS_SUCCESS";
export const JOBS_FAILURE = "JOBS_FAILURE";
export const EXPIRE_TODAY = "EXPIRE_TODAY";
export const ACTIVE_TODAY = "ACTIVE_TODAY";
export const POSTED_TODAY = "POSTED_TODAY";

const jobrequest = () => ({
  type: JOBS_REQUEST,
});

const jobSuccess = (data) => ({
  type: JOBS_SUCCESS,
  payload: data,
});

const jobFailure = (error) => ({
  type: JOBS_FAILURE,
  payload: error,
});

export const GetAllJobs = (query) => {
  return async (dispatch) => {
    dispatch(jobrequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get("/admin/api/v1/posts", {
        params: query,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (query?.apply_link_avl_from === "today") {
        dispatch({ type: ACTIVE_TODAY, payload: response?.data?.data });
      } else if (query?.last_date === "today") {
        dispatch({ type: EXPIRE_TODAY, payload: response?.data?.data });
      } else if (query?.date_range === "today") {
        dispatch({ type: POSTED_TODAY, payload: response?.data?.data });
      } else {
        dispatch(jobSuccess(response?.data.data));
      }
      // console.log(response.data);
    } catch (error) {
      dispatch(jobFailure(error.message));
    }
  };
};

export const GetSingleJob = (id) => {
  return async (dispatch) => {
    dispatch(jobrequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get(`/api/v1/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: SINGLE_JOBS_SUCCESS, payload: response?.data?.data });
    } catch (error) {
      dispatch(jobFailure(error.message));
    }
  };
};

export const updateJob = (id, data) => {
  return async (dispatch) => {
    dispatch(jobrequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.put(`/api/v1/posts/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.status === 201) {
        // console.log("Updated Successfully");
        return "SUCCESS";
      } else {
        dispatch(jobFailure(response?.data.message));
      }
    } catch (error) {
      dispatch(jobFailure(error.message));
    }
  };
};

export const deleteJob = (id, data) => {
  return async (dispatch) => {
    dispatch(jobrequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.delete(`/api/v1/posts/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.status === 201) {
        return "SUCCESS";
      } else {
        dispatch(jobFailure(response?.data.message));
      }
    } catch (error) {
      dispatch(jobFailure(error.message));
    }
  };
};

export const GetQuickOrNewJobs = (query) => {
  return async (dispatch) => {
    dispatch(jobrequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get(
        `/admin/api/v1/posts/quick/new?posts_type=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (query === "quick") {
        dispatch({ type: QUICK_JOBS_SUCCESS, payload: response?.data?.data });
      } else if (query === "new") {
        dispatch({ type: NEW_JOBS_SUCCESS, payload: response?.data?.data });
      }
    } catch (error) {
      dispatch(jobFailure(error.message));
    }
  };
};

import { axiosInstance } from "../../utils/axiosInstance";

export const SWLA_REQ = "SWLA_REQ"; //STUDENT WISE LECTURE ANALYTICS SWLA
export const SWLA_SUCCESS = "SWLA_SUCCESS";
export const SWLA_FAILURE = "SWLA_FAILURE";

const swlarequest = () => ({
  type: SWLA_REQ,
});

const swlasuccess = (data) => ({
  type: SWLA_SUCCESS,
  payload: data,
});

const swlaFailure = (error) => ({
  type: SWLA_FAILURE,
  payload: error,
});

export const GetAllswlas = (query) => {
  return async (dispatch) => {
    dispatch(swlarequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get(
        "/api/v1/student_wise_lecturess",
        {
          params: query,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(swlasuccess(response?.data.data));
    } catch (error) {
      dispatch(swlaFailure(error.message));
    }
  };
};

export const GetSingleswla = (id) => {
  return async (dispatch) => {
    dispatch(swlarequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get(`/api/v1/swlas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      dispatch({
        type: "SINGLE_SWLA_SUCCESS",
        payload: response?.data?.data,
      });
    } catch (error) {
      dispatch(swlaFailure(error.message));
    }
  };
};

export const updateswlas = (id, data) => {
  return async (dispatch) => {
    dispatch(swlarequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.put(`/api/v1/swla/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.status === 200) {
        // console.log("Updated Successfully");
        return "SUCCESS";
      } else {
        dispatch(swlaFailure(response?.data.message));
      }
    } catch (error) {
      dispatch(swlaFailure(error.message));
    }
  };
};

export const deleteswla = (id, data) => {
  return async (dispatch) => {
    dispatch(swlarequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.delete(`/api/v1/swla/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.status === 201) {
        return "SUCCESS";
      } else {
        dispatch(swlaFailure(response?.data.message));
      }
    } catch (error) {
      dispatch(swlaFailure(error.message));
    }
  };
};

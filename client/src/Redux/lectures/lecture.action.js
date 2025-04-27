import { axiosInstance } from "../../utils/axiosInstance";

export const Lectures_REQUEST = "Lectures_REQUEST";
export const Lectures_SUCCESS = "Lectures_SUCCESS";
export const SINGLE_Lectures_SUCCESS = "SINGLE_Lectures_SUCCESS";
export const QUICK_Lectures_SUCCESS = "QUICK_Lectures_SUCCESS";
export const NEW_Lectures_SUCCESS = "NEW_Lectures_SUCCESS";
export const Lectures_FAILURE = "Lectures_FAILURE";
export const EXPIRE_TODAY = "EXPIRE_TODAY";
export const ACTIVE_TODAY = "ACTIVE_TODAY";
export const POSTED_TODAY = "POSTED_TODAY";

const lecturerequest = () => ({
  type: Lectures_REQUEST,
});

const Lecturesuccess = (data) => ({
  type: Lectures_SUCCESS,
  payload: data,
});

const lectureFailure = (error) => ({
  type: Lectures_FAILURE,
  payload: error,
});

export const GetAllLectures = (query) => {
  return async (dispatch) => {
    dispatch(lecturerequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get("/api/v1/lectures", {
        params: query,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(Lecturesuccess(response?.data.data));

      // console.log(response.data);
    } catch (error) {
      dispatch(lectureFailure(error.message));
    }
  };
};

export const GetSinglelecture = (id) => {
  return async (dispatch) => {
    dispatch(lecturerequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get(`/api/v1/lectures/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data)
      dispatch({
        type: SINGLE_Lectures_SUCCESS,
        payload: response?.data?.data,
      });
    } catch (error) {
      dispatch(lectureFailure(error.message));
    }
  };
};

export const updateLectures = (id, data) => {
  return async (dispatch) => {
    dispatch(lecturerequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.put(`/api/v1/lectures/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.status === 201) {
        // console.log("Updated Successfully");
        return "SUCCESS";
      } else {
        dispatch(lectureFailure(response?.data.message));
      }
    } catch (error) {
      dispatch(lectureFailure(error.message));
    }
  };
};

export const deletelecture = (id, data) => {
  return async (dispatch) => {
    dispatch(lecturerequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.delete(
        `/api/v1/lectures/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.status === 200) {
        return "SUCCESS";
      } else {
        dispatch(lectureFailure(response?.data.message));
      }
    } catch (error) {
      dispatch(lectureFailure(error.message));
    }
  };
};

export const GetQuickOrNewLectures = (query) => {
  return async (dispatch) => {
    dispatch(lecturerequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get(
        `/admin/api/v1/lectures/quick/new?lecture_type=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (query === "quick") {
        dispatch({
          type: QUICK_Lectures_SUCCESS,
          payload: response?.data?.data,
        });
      } else if (query === "new") {
        dispatch({ type: NEW_Lectures_SUCCESS, payload: response?.data?.data });
      }
    } catch (error) {
      dispatch(lectureFailure(error.message));
    }
  };
};

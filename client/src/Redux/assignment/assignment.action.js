import { axiosInstance } from "../../utils/axiosInstance";

export const Assignments_REQUEST = "Assignments_REQUEST";
export const Assignments_SUCCESS = "Assignments_SUCCESS";
export const SINGLE_Assignments_SUCCESS = "SINGLE_Assignments_SUCCESS";
export const Assignments_FAILURE = "Assignments_FAILURE";

const assignmentrequest = () => ({
  type: Assignments_REQUEST,
});

const Assignmentsuccess = (data) => ({
  type: Assignments_SUCCESS,
  payload: data,
});

const assignmentFailure = (error) => ({
  type: Assignments_FAILURE,
  payload: error,
});

export const GetAllAssignments = (query) => {
  return async (dispatch) => {
    dispatch(assignmentrequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get("/api/v1/assignments", {
        params: query,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(Assignmentsuccess(response?.data.data));

      // console.log(response.data);
    } catch (error) {
      dispatch(assignmentFailure(error.message));
    }
  };
};

export const GetSingleassignment = (id) => {
  return async (dispatch) => {
    dispatch(assignmentrequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get(`/api/v1/assignments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      dispatch({
        type: SINGLE_Assignments_SUCCESS,
        payload: response?.data?.data,
      });
    } catch (error) {
      dispatch(assignmentFailure(error.message));
    }
  };
};

export const updateAssignments = (id, data) => {
  return async (dispatch) => {
    dispatch(assignmentrequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.put(
        `/api/v1/assignments/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status === 200) {
        dispatch(GetAllAssignments());
        return "SUCCESS";
      } else {
        dispatch(assignmentFailure(response?.data.message));
      }
    } catch (error) {
      dispatch(assignmentFailure(error.message));
    }
  };
};

export const deleteassignment = (id, data) => {
  return async (dispatch) => {
    dispatch(assignmentrequest());
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.delete(
        `/api/v1/assignment/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.status === 201) {
        return "SUCCESS";
      } else {
        dispatch(assignmentFailure(response?.data.message));
      }
    } catch (error) {
      dispatch(assignmentFailure(error.message));
    }
  };
};

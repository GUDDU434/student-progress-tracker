import {
  Assignments_FAILURE,
  Assignments_REQUEST,
  Assignments_SUCCESS,
  SINGLE_Assignments_SUCCESS,
} from "./assignment.action";

const initialAssignments = {
  isLoading: false,
  isError: null,
  AllAssignments: { nextUrl: "", assignments: [], total: 0 },
  assignmentDetails: {},
};

export const reducer = (state = initialAssignments, { type, payload }) => {
  switch (type) {
    case Assignments_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: null,
      };
    case Assignments_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: null,
        AllAssignments: {
          ...state.AllAssignments,
          nextUrl: payload?.nextUrl,
          assignments: payload?.assignments,
          total: payload?.total,
        },
      };
    case SINGLE_Assignments_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: null,
        assignmentDetails: payload,
      };
    case Assignments_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: payload,
      };
    default:
      return state;
  }
};

import {
  SWLA_FAILURE,
  SWLA_REQ,
  SWLA_SUCCESS,
  SINGLE_SWLA_SUCCESS,
} from "./analytics.action";

const initialswla = {
  isLoading: false,
  isError: null,
  Allswla: [],
  details: {},
};

export const reducer = (state = initialswla, { type, payload }) => {
  switch (type) {
    case SWLA_REQ:
      return {
        ...state,
        isLoading: true,
        isError: null,
      };
    case SWLA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: null,
        Allswla: payload,
      };
    case SINGLE_SWLA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: null,
        details: payload,
      };
    case SWLA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: payload,
      };
    default:
      return state;
  }
};

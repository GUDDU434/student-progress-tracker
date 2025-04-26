import {
  ACTIVE_TODAY,
  EXPIRE_TODAY,
  Lectures_FAILURE,
  Lectures_REQUEST,
  Lectures_SUCCESS,
  NEW_Lectures_SUCCESS,
  POSTED_TODAY,
  QUICK_Lectures_SUCCESS,
  SINGLE_Lectures_SUCCESS,
} from "./lecture.action";

const initialLectures = {
  isLoading: false,
  isError: null,
  AllLectures: { nextUrl: "", lectures: [], total: 0 },
  lectureDetails: {},
};

export const reducer = (state = initialLectures, { type, payload }) => {
  switch (type) {
    case Lectures_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: null,
      };
    case Lectures_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: null,
        AllLectures: {
          ...state.AllLectures,
          nextUrl: payload?.nextUrl,
          lectures: payload?.lectures,
          total: payload?.total,
        },
      };
    case QUICK_Lectures_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: null,
        QuickLectures: {
          ...state.QuickLectures,
          nextUrl: payload?.nextUrl,
          posts: payload?.posts,
          total: payload?.total,
        },
      };
    case NEW_Lectures_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: null,
        NewLectures: {
          ...state.NewLectures,
          nextUrl: payload?.nextUrl,
          posts: payload?.posts,
          total: payload?.total,
        },
      };
    case SINGLE_Lectures_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: null,
        lectureDetails: payload,
      };
    case Lectures_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: payload,
      };
    case ACTIVE_TODAY:
      return {
        ...state,
        isLoading: false,
        isError: null,
        ActivateToday: {
          ...state.ActivateToday,
          nextUrl: payload?.nextUrl,
          posts: payload?.posts,
          total: payload?.total,
        },
      };
    case EXPIRE_TODAY:
      return {
        ...state,
        isLoading: false,
        isError: null,
        ExpireToday: {
          ...state.ExpireToday,
          nextUrl: payload?.nextUrl,
          posts: payload?.posts,
          total: payload?.total,
        },
      };
    case POSTED_TODAY:
      return {
        ...state,
        isLoading: false,
        isError: null,
        PostedToday: {
          ...state.PostedToday,
          nextUrl: payload?.nextUrl,
          posts: payload?.posts,
          total: payload?.total,
        },
      };
    default:
      return state;
  }
};

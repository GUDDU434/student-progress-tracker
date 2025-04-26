import {
  ACTIVE_TODAY,
  EXPIRE_TODAY,
  JOBS_FAILURE,
  JOBS_REQUEST,
  JOBS_SUCCESS,
  NEW_JOBS_SUCCESS,
  POSTED_TODAY,
  QUICK_JOBS_SUCCESS,
  SINGLE_JOBS_SUCCESS,
} from "./job.action";

const initialJobs = {
  isLoading: false,
  isError: null,
  AllJobs: { nextUrl: "", posts: [], total: 0 },
  ExpireToday: { nextUrl: "", posts: [], total: 0 },
  PostedToday: { nextUrl: "", posts: [], total: 0 },
  ActivateToday: { nextUrl: "", posts: [], total: 0 },
  QuickJobs: { nextUrl: "", posts: [], total: 0 },
  NewJobs: { nextUrl: "", posts: [], total: 0 },
  jobDetails: {},
};

export const reducer = (state = initialJobs, { type, payload }) => {
  switch (type) {
    case JOBS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: null,
      };
    case JOBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: null,
        AllJobs: {
          ...state.AllJobs,
          nextUrl: payload?.nextUrl,
          posts: payload?.posts,
          total: payload?.total,
        },
      };
    case QUICK_JOBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: null,
        QuickJobs: {
          ...state.QuickJobs,
          nextUrl: payload?.nextUrl,
          posts: payload?.posts,
          total: payload?.total,
        },
      };
    case NEW_JOBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: null,
        NewJobs: {
          ...state.NewJobs,
          nextUrl: payload?.nextUrl,
          posts: payload?.posts,
          total: payload?.total,
        },
      };
    case SINGLE_JOBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: null,
        jobDetails: payload,
      };
    case JOBS_FAILURE:
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

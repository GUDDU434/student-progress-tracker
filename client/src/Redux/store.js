import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { reducer as loginReducer } from "./auth/auth.reducer";
import { reducer as LectureReducer } from "./lectures/lecture.reducer";
import { reducer as AssignmentReducer } from "./assignment/assignment.reducer";
import { reducer as AnalyticsReducer } from "./analytics/analytics.reducer";

let rootReducer = combineReducers({
  loginReducer,
  LectureReducer,
  AssignmentReducer,
  AnalyticsReducer,
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

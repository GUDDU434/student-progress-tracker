import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { reducer as loginReducer } from "./auth/auth.reducer";
import { reducer as LectureReducer } from "./lectures/lecture.reducer";

let rootReducer = combineReducers({
  loginReducer,
  LectureReducer,
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

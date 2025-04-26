import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { reducer as loginReducer } from "./auth/auth.reducer";
import { reducer as JobReducer } from "./jobs/job.reducer";

let rootReducer = combineReducers({
  loginReducer,
  JobReducer,
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

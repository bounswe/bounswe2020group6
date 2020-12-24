import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "../redux/auth/reducer";
import profileReducer from "../redux/profile/reducer";
import followReducer from "../redux/follow/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  follow: followReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

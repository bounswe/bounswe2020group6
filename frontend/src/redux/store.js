import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "../redux/auth/reducer";
import profileReducer from "../redux/profile/reducer";
import followReducer from "../redux/follow/reducer";
import choicesReducer from "../redux/choices/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  follow: followReducer,
  choices: choicesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

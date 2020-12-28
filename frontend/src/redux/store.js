import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "../redux/auth/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

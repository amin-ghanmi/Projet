import { combineReducers } from "redux";
import userReducer from '../reducers/userReducer';
import productReducer from '../reducers/productReducer'

export default combineReducers({userReducer,productReducer})
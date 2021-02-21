import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import user from "./user";
import invitado from "./invitado";
const reducer = combineReducers({
  user,
  invitado,
});
const store = configureStore({
  reducer,
});
export default store;

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";

// const Reducer = combineReducers({ auth });

export const store = configureStore({
  reducer: {
    auth,
  },
});

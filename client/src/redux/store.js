import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../redux/user/userSlice.js";

export const store = configureStore({
  reducer: { user: useReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

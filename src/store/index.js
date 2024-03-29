import { configureStore } from "@reduxjs/toolkit";
import filters from "../components/heroesFilters/filtersSlice";
import { apiSlice } from "../api/apiSlice";
const stringMiddleware = (store) => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = configureStore({
  reducer: { filters, [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});


export default store;

//store enhancers - это функции, которые предоставляют дополнительную функциональность для стора.
//Middleware - это слой программного обеспечения, который позволяет обрабатывать действия (actions) перед тем, как они достигнут редюсера. Middleware может изменять, логировать, асинхронно обрабатывать действия и многое другое. Направлен на изменение стандартной работы функции dispatch.

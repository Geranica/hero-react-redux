import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import heroes from "../reducers/heroes";
import filters from "../reducers/filters";

const stringMiddleware = (store) => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const enhancer =
  (createStore) =>
  (...args) => {
    const store = createStore(...args);
    const oldDispatch = store.dispatch;
    store.dispatch = (action) => {
      if (typeof action === "string") {
        return oldDispatch({
          type: action,
        });
      }
      return oldDispatch(action);
    };
    return store;
  };

/* const store = createStore(
  combineReducers({ heroes, filters }),
  compose(
    applyMiddleware(thunk, stringMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  // compose(
  //enhancer,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  //)
); */

const store = configureStore({
  reducer: { heroes, filters },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

//store enhancers - это функции, которые предоставляют дополнительную функциональность для стора.

//Middleware - это слой программного обеспечения, который позволяет обрабатывать действия (actions) перед тем, как они достигнут редюсера. Middleware может изменять, логировать, асинхронно обрабатывать действия и многое другое. Направлен на изменение стандартной работы функции dispatch.

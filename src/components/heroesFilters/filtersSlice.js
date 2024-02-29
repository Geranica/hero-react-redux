import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filtersLoadingStatus: "idle",
  filters: [],
  activeFilter: "all",
};

const filters = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filtersFetching: (state) => {
      state.filtersLoadingStatus = "loading";
    },
    filtersFetched: (state, action) => {
      state.filtersLoadingStatus = "idle";
      state.filters = action.payload;
    },
    filtersFetchingError: (state) => {
      state.filtersLoadingStatus = "error";
    },
    changeFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

const { actions, reducer } = filters;

export default reducer;

export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  changeFilter,
} = actions;

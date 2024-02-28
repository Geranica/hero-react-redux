export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};

export const deleteHero = (id) => {
  return {
    type: "DELETE_HERO",
    payload: id,
  };
};
export const filtersFetching = () => {
  return {
    type: "FILTERS_FETCHING",
  };
};
export const filtersFetched = (filters) => {
  return {
    type: "FILTERS_FETCHED",
    payload: filters,
  };
};
export const filtersFetchingError = () => {
  return {
    type: "FILTERS_FETCHING_ERROR",
  };
};

export const changeFilter = (filterName) => {
  return {
    type: "CHANGE_FILTER",
    payload: filterName,
  };
};

export const addNewHero = (newHero) => {
  return {
    type: "ADD_NEW_HERO",
    payload: newHero,
  };
};

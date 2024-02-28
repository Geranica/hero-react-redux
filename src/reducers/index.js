const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filtersLoadingStatus: "idle",
  filters: [],
  activeFilter: "all",
  filteredHeroes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        filteredHeroes:
          state.activeFilter === "all"
            ? action.payload
            : action.payload.filter(
                (item) => item.element === state.activeFilter
              ),
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };

    case "DELETE_HERO":
      const updatedHeroes = state.heroes.filter(
        (item) => item.id !== action.payload
      );

      return {
        ...state,
        heroes: updatedHeroes,
        filteredHeroes:
          state.activeFilter === "all"
            ? updatedHeroes
            : updatedHeroes.filter(
                (item) => item.element === state.activeFilter
              ),
      };
    case "FILTERS_FETCHING":
      return {
        ...state,
        filtersLoadingStatus: "loading",
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filtersLoadingStatus: "idle",
        filters: action.payload,
      };
    case "FILTERS_FETCHING_ERROR":
      return {
        ...state,
        filtersLoadingStatus: "error",
        filters: action.payload,
      };
    case "CHANGE_FILTER":
      return {
        ...state,
        activeFilter: action.payload,
        filteredHeroes:
          action.payload === "all"
            ? state.heroes
            : state.heroes.filter((item) => item.element === action.payload),
      };

    case "ADD_NEW_HERO":
      const newHeroesArray = [...state.heroes, action.payload];
      return {
        ...state,
        heroes: newHeroesArray,
        filteredHeroes:
          state.activeFilter === "all"
            ? newHeroesArray
            : newHeroesArray.filter(
                (item) => item.element === state.activeFilter
              ),
      };

    default:
      return state;
  }
};

export default reducer;

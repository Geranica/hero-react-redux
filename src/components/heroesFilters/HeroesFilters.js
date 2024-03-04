import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeFilter,
  fetchFilters,
  selectAll,
  activeFilterSelector,
} from "./filtersSlice";

import { selectGetHeroesLoading, useGetHeroesQueryState } from "../../api/apiSlice";

const HeroesFilters = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector(activeFilterSelector);
  const filters = useSelector(selectAll);
  const x = useGetHeroesQueryState();
  console.log(x);

  useEffect(() => {
    dispatch(fetchFilters());
  }, []);

  const renderFilters = (filters) => {
    return filters.map(({ name, additionalClass, label }) => {
      const activeClass = activeFilter === name ? "active" : "";
      return (
        <button
          onClick={() => dispatch(changeFilter(name))}
          key={name}
          className={`btn ${additionalClass} ${activeClass}`}
        >
          {label}
        </button>
      );
    });
  };
  const elements = renderFilters(filters);
  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{elements}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;

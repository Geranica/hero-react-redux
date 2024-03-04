import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeFilterSelector } from "./filtersSlice";
import { changeFilter, fetchFilters, selectAll } from "./filtersSlice";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных +
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
  const dispatch = useDispatch();
  const activeFilter  = useSelector(activeFilterSelector);
  const filters = useSelector(selectAll);

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

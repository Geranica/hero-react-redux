import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  changeFilter,
} from "../../actions";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных +
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const { filters, activeFilter } = useSelector((state) => state);

  useEffect(() => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));
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

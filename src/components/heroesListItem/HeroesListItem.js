import { useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { deleteHero } from "../../actions";

const HeroesListItem = ({ name, description, element, id }) => {
  const dispatch = useDispatch();
  const { request } = useHttp();

  const onDelete = (id) => {
    request(`http://localhost:3001/heroes/${id}`, "DELETE")
      .then(() => {
        dispatch(deleteHero(id));
      })
      .catch((error) => {
        console.error("Ошибка в handleClick:", error);
      });
  };

  let elementClassName;

  switch (element) {
    case "fire":
      elementClassName = "bg-danger bg-gradient";
      break;
    case "water":
      elementClassName = "bg-primary bg-gradient";
      break;
    case "wind":
      elementClassName = "bg-success bg-gradient";
      break;
    case "earth":
      elementClassName = "bg-secondary bg-gradient";
      break;
    default:
      elementClassName = "bg-warning bg-gradient";
  }

  return (
    <li
      className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}
    >
      <img
        src="https://kartinki.pics/uploads/posts/2022-12/1670438948_5-kartinkin-net-p-neizvestnost-kartinki-vkontakte-5.jpg"
        className="img-fluid w-25 d-inline"
        alt="unknown hero"
        style={{ objectFit: "cover" }}
      />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{description}</p>
      </div>
      <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
        <button
          onClick={() => onDelete(id)}
          type="button"
          className="btn-close btn-close"
          aria-label="Close"
        ></button>
      </span>
    </li>
  );
};

export default HeroesListItem;

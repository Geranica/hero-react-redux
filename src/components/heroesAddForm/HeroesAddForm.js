import "../heroesAddForm/HeroesAddForm.scss";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useHttp } from "../../hooks/http.hook";

import { useDispatch } from "react-redux";
import { addNewHero } from "../../actions";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();

  const addHero = (data) => {
    request("http://localhost:3001/heroes", "POST", JSON.stringify(data))
      .then(() => dispatch(addNewHero(data)))
      .catch((e) => console.log(e));
  };

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        element: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, "Минимум два символа!")
          .required("Обязательное поле!"),
        description: Yup.string()
          .min(10, "Минимум десять символов!")
          .required("Обязательное поле!"),
        element: Yup.string().required("Выберите элемент!"),
      })}
      onSubmit={(values, { resetForm }) => {
        resetForm();
        addHero({ ...values, id: uuidv4() });
      }}
    >
      <Form className="border p-4 shadow-lg rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-4">
            Имя нового героя
          </label>
          <Field
            name="name"
            type="text"
            className="form-control"
            id="name"
            placeholder="Как меня зовут?"
          />
          <ErrorMessage className="error" name="name" component="div" />
        </div>

        <div className="mb-3">
          <label htmlFor="text" className="form-label fs-4">
            Описание
          </label>
          <Field
            as="textarea"
            name="description"
            className="form-control"
            id="text"
            placeholder="Что я умею?"
            style={{ height: "130px" }}
          />
          <ErrorMessage className="error" name="description" component="div" />
        </div>

        <div className="mb-3">
          <label htmlFor="element" className="form-label">
            Выбрать элемент героя
          </label>
          <Field
            as="select"
            className="form-select"
            id="element"
            name="element"
          >
            <option>Я владею элементом...</option>
            <option value="fire">Огонь</option>
            <option value="water">Вода</option>
            <option value="wind">Ветер</option>
            <option value="earth">Земля</option>
          </Field>
          <ErrorMessage className="error" name="element" component="div" />
        </div>
        <button type="submit" className="btn btn-primary">
          Создать
        </button>
      </Form>
    </Formik>
  );
};

export default HeroesAddForm;

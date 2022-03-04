import React, { useState } from "react";
import "./Login.css";
import Header from "./landing/Header.js";
import InfoTooltip from "./InfoTooltip";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils/auth";
import succesImage from "../images/Union(black).jpg";
import unSuccesImage from "../images/Union.jpg";

function Register({ history }) {
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState({ image: null, text: "" });
  const [inputValues, setInputValues] = useState({});

  function resetForm() {
    setInputValues({});
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    let messageText = "";
    let imageLink = null;

    auth
      .register(inputValues.email, inputValues.password)
      .then((res) => {
        resetForm();
        history.push("/sign-in");
        messageText = "Вы успешно зарегистрировались!";
        imageLink = succesImage;
      })
      .catch((err) => {
        switch (err) {
          case 400:
            messageText = "Ошибка 400, некорректно заполнено одно из полей";
            imageLink = unSuccesImage;
            break;
          default:
            messageText = "Что-то пошло не так! Попробуйте ещё раз.";
            imageLink = unSuccesImage;
        }
      })
      .finally(() => {
        setResultMessage({ image: imageLink, text: messageText });
        console.log(messageText);
        setIsInfoTooltipPopupOpen(true);
      });
  }
  return (
    <>
      <Header>
        <Link className="header__button opacity" to="/main">
          Войти
        </Link>
      </Header>
      {isInfoTooltipPopupOpen && (
        <InfoTooltip
          onClose={setIsInfoTooltipPopupOpen(false)}
          imageLink={resultMessage.image}
          textMessage={resultMessage.text}
        />
      )}
      <div className="popup__login">
        <h2 className="login__title">Регистрация</h2>
        <form
          className="popup__inputs"
          name="popupLogin"
          onSubmit={handleSubmit}
        >
          <fieldset className="popup__inputs">
            <input
              id="initial-input"
              type="email"
              name="email"
              placeholder="E-mail"
              className="input login__input-text"
              required
              minLength="5"
              maxLength="40"
              onChange={handleChange}
            />
            <span className="initial-input-error popup__error"></span>
            <input
              id="rank-input"
              type="password"
              name="password"
              placeholder="Пароль"
              className="input login__input-text"
              autoComplete=""
              required
              minLength="2"
              maxLength="8"
              onChange={handleChange}
            />
            <span className="rank-input-error popup__error"></span>
          </fieldset>
          <button
            className="login__submit-btn"
            type="submit"
            aria-label="Кнопка Войти"
          >
            Зарегистрироваться
          </button>
          <div className="register__question">
            Вы уже зарегистрированы?
            <Link className="register__entryButton opacity" to="/main">
              Войти
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default withRouter(Register);

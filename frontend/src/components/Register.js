import React, { useState } from "react";
import Header from "./landing/Header.js";
import { Link} from "react-router-dom";


function Register({handleRegister }) {
  
  const [inputValues, setInputValues] = useState({});

  function handleChange(e) {
    setInputValues({...inputValues,[e.target.name]: e.target.value });
  }
  

  function resetForm(){
    setInputValues({});
  }

  function handleSubmit(e) {
    e.preventDefault();
    if ( !inputValues.email || !inputValues.password ) {
      return;
    }
    handleRegister(inputValues.email, inputValues.password,resetForm,inputValues)
  
  }


  return (
    <>
      <Header>
        <div><Link className="header__button opacity" to="/main">
          Войти
        </Link>
        </div>
      </Header>
      <div className="login__popup">
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
              value={inputValues.email || ''}
              
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
              value={inputValues.password || ''}
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
          <div className="login__question">
            Вы уже зарегистрированы?
            <Link className="login__entryButton opacity" to="/main">
              Войти
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;

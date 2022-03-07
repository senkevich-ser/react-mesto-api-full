import React, { useState } from "react";
import Header from "./landing/Header.js";
import { Link } from "react-router-dom";



function Login({handleLogin}) {
  const userData=JSON.parse(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')):''
  const [inputValues, setInputValues] = useState(userData);
  

  function handleChange(e) {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  }

  
  function resetForm(){
    setInputValues({});
  }
  function handleSubmit(e) {
    e.preventDefault();
    if ( !inputValues.email || !inputValues.password ) {
      return;
    }
    handleLogin(inputValues.email,inputValues.password,resetForm);
  
  }


  return (
    <>
      <Header>
        <div>
        <Link className="header__button opacity" to="/sign-up">
          Регистрация
        </Link>
        </div>
      </Header>
      <div className="login__popup">
        <h2 className="login__title">Вход</h2>
        <form className="popup__inputs" 
        name="popupLogin" 
        onSubmit={handleSubmit}>
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
            Войти
          </button>
        </form>
      </div>
    </>
  );
}
export default Login;

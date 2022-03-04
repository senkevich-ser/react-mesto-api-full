import React from "react";
function HeaderButton({ title }) {
  return (
    <>
      <button
        aria-label="Вход или регистрация в приложение"
        type="button"
        className="header__button opacity"
      >
        {title}
      </button>
    </>
  );
}
export default HeaderButton;

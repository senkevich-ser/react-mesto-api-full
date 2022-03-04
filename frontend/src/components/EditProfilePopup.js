import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      name="editProfile"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
    >
      <fieldset className="popup__inputs">
        <input
          id="initial-input"
          type="text"
          name="name"
          placeholder="Имя Фамилия"
          className="input popup__input-text"
          /* required */
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleChangeName}
        />
        <span className="initial-input-error popup__error"></span>
        <input
          id="rank-input"
          type="text"
          name="about"
          placeholder="Род деятельности"
          className="input popup__input-text"
          /* required */
          minLength="2"
          maxLength="200"
          value={description || ""}
          onChange={handleChangeDescription}
        />
        <span className="rank-input-error popup__error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

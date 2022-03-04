import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(
      {
        avatar: inputRef.current.value,
      },
      () => {
        inputRef.current.value = "";
      }
    );
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle="Сохранить"
    >
      <fieldset className="popup__inputs">
        <input
          ref={inputRef}
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          className="input  popup__input-text"
          required
        />
        <span className="avatar-input-error popup__error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;

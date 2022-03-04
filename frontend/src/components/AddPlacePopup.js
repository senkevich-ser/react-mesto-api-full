import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link }, () => {
      setName("");
      setLink("");
    });
  }

  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="addCard"
      buttonTitle="Создать"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <fieldset className="popup__inputs">
        <input
          id="place-input"
          type="text"
          name="placeName"
          placeholder="Название"
          className="input popup-card__input-text popup__input-text"
          minLength="2"
          maxLength="30"
          onChange={handleChangeName}
          value={name}
          /* required */
        />
        <span className="place-input-error popup__error"></span>
        <input
          id="link-input"
          name="linkName"
          type="url"
          placeholder="Ссылка на картинку"
          className="input popup-card__input-text popup__input-text"
          /* required */
          onChange={handleChangeLink}
          value={link}
        />
        <span className="link-input-error popup__error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
export default AddPlacePopup;

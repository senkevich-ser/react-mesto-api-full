import React, { useState, useEffect } from "react";

function InfoTooltip({ onClose, imageLink, textMessage }) {
  const [popupOpenClass, setPopupOpenClass] = useState("");

  function handleCloseClick() {
    setPopupOpenClass("");
    onClose();
  }

  useEffect(() => {
    setPopupOpenClass("popup_opened");
  }, []);

  return (
    <section className={`popup ${popupOpenClass}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-cross opacity"
          aria-label="Закрыть попап"
          onClick={handleCloseClick}
        ></button>
        <img width="120px" src={imageLink} alt="" />
        <p className="popup__title popup__infoTooltip">{textMessage}</p>
      </div>
    </section>
  );
}

export default InfoTooltip;

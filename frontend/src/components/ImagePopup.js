import React, { useEffect, useState } from "react";

function ImagePopup({ card, onClose, onCloseEscOverlay }) {
  const [onOpenTimeOut, setOnOpenTimeOut] = useState(false);
  useEffect(() => {
    document.addEventListener("keyup", onCloseEscOverlay);
    document.addEventListener("click", onCloseEscOverlay);
    setTimeout(setOnOpenTimeOut(true), 800);
    return () => {
      document.removeEventListener("keyup", onCloseEscOverlay);
      document.removeEventListener("click", onCloseEscOverlay);
    };
  }, [card.link, onClose, onCloseEscOverlay]);
  return (
    <div className={`foto-open popup ${onOpenTimeOut ? "popup_opened" : ""}`}>
      <div className="foto-open__container">
        <img
          className="foto-open__image"
          src={`${card.link}`}
          alt={`${card.name}`}
        />
        <button
          aria-label="Закрыть фото"
          type="button"
          className=" popup__close-cross opacity"
          onClick={onClose}
        ></button>
        <h2 className="foto-open__name">{`${card.name}`}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;

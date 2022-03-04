import React, { useEffect, useState } from "react";

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  buttonTitle,
  children,
  onSubmit,
  onCloseEscOverlay,
}) {
  const [onOpenTimeOut, setOnOpenTimeOut] = useState(false);
  useEffect(() => {
    document.addEventListener("keyup", onCloseEscOverlay);
    document.addEventListener("click", onCloseEscOverlay);
    setTimeout(setOnOpenTimeOut(true), 800);
    return () => {
      document.removeEventListener("keyup", onCloseEscOverlay);
      document.removeEventListener("click", onCloseEscOverlay);
    };
  }, [isOpen, onClose, onCloseEscOverlay]);
  return (
    <section
      className={`popup popup_type_${name} ${
        onOpenTimeOut ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-cross opacity"
          aria-label="Закрыть попап"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          className="popup__inputs"
          name={`${name}_form`}
        >
          {children}
          <button
            className="popup__submit-btn"
            type="submit"
            aria-label="Кнопка Сохранить"
          >
            {buttonTitle}
          </button>
        </form>
      </div>
    </section>
  );
}
export default PopupWithForm;

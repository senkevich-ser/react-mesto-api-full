import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `foto-grid__urn ${
    isOwn ? "foto-grid__urn_show" : ""
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `foto-grid__name-heart ${
    isLiked ? "foto-grid__name-heart_black" : ""
  }`;
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="foto-grid__card">
      <div
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удалить"
        onClick={handleDeleteClick}
      ></div>
      <img
        src={`${card.link}`}
        alt={`${card.name}`}
        onClick={handleClick}
        className="foto-grid__item"
      />
      <div className="foto-grid__name">
        <h2 className="foto-grid__name-title title-cutter">{card.name}</h2>
        <div className="foto-grid__likesBlock">
          <button
            aria-label="Поставить лайк"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <div className="foto-grid__likesQty">{card.likes.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;

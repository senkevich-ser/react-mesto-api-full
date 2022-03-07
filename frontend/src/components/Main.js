import React from "react";
import Card from "./Card.js";
import Header from "./landing/Header.js";
import NavMenu from "./NavMenu";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  userMail
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header>
     <NavMenu userMail={userMail}/> 
      </Header>
      <main className="content">
        <section className="lead">
          <div className="lead__titles">
            <button
              aria-label="Редактировать аватар"
              type="button"
              className="lead__avatarButton opacity"
              onClick={onEditAvatar}
            ></button>
            <img
              className="lead__image"
              src={currentUser.avatar}
              alt="Фото пользователя"
            />
            <div className="lead__wrapper-titles">
              <div className="lead__wrapper-title">
                <h1 className="lead__title title-cutter">{currentUser.name}</h1>
                <button
                  aria-label="Внести изменения в форму"
                  type="button"
                  className="lead__pencil opacity"
                  onClick={onEditProfile}
                ></button>
              </div>
              <p className="lead__subtitle title-cutter margin">
                {currentUser.about}
              </p>
            </div>
          </div>
          <button
            aria-label="Добавить карточку"
            type="button"
            className="lead__button opacity"
            onClick={onAddPlace}
          ></button>
        </section>
        <section className="foto-grid" aria-label="Фото красивых мест">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                onCardClick={onCardClick}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}
export default Main;

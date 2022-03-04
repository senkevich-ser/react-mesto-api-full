import "../blocks/root/root.css";
import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Footer from "./landing/Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { Spinner } from "./Spinner.js";

function App() {
  const history = useHistory();
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = useState(false);
  // переменная состояния, отвечающая за данные пользователя
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [deleteCard, setDeleteCard] = useState({});

  useEffect(() => {
    api
      .getInfoAboutUser()
      .then((currentUserData) => {
        setCurrentUser(currentUserData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Ошибка при получении данных профиля");
      });
  }, []);
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запросы в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCardSomeLike) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCardSomeLike : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(e) {
    // Отправляется запрос в API и получаю массив, без удалённойкарточки
    e.preventDefault();
    api
      .deleteCard(deleteCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deleteCard._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //обработчики для стейтовых переменных
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddCardClick() {
    setAddPlacePopupOpen(true);
  }
  function handleDeleteCardClick(card) {
    setDeleteCard(card);
    setIsCardDeletePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  //функция закрытия попапов
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsCardDeletePopupOpen(false);
    setSelectedCard({});
  }
  function handleUpdateUser({ name, about }) {
    api
      .setInfoAboutUser({ name, about })
      .then((currentUserData) => {
        setCurrentUser(currentUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateAvatar({ avatar }, onSuccess) {
    api
      .setAvatarUser({ avatar })
      .then((currentUserData) => {
        setCurrentUser(currentUserData);
        onSuccess();
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit({ name, link }, onSuccess) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        onSuccess();
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function popupCloseEscOverlay(e) {
    if (e.key === "Escape" || e.target.classList.contains("popup_opened")) {
      closeAllPopups();
    }
  }
  const loggedIn = true;
  return isLoading ? (
    <Spinner />
  ) : (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route path="/sign-in">
            <Login history={history} />
          </Route>
          <Route path="/sign-up">
            <Register history={history} />
          </Route>
          <ProtectedRoute
            path="/main"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddCardClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
            history={history}
          />
          <Route exact path="/">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer />
        {isEditProfilePopupOpen && (
          <EditProfilePopup
            onCloseEscOverlay={popupCloseEscOverlay}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
        )}
        {isAddPlacePopupOpen && (
          <AddPlacePopup
            onCloseEscOverlay={popupCloseEscOverlay}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
        )}
        {isEditAvatarPopupOpen && (
          <EditAvatarPopup
            onCloseEscOverlay={popupCloseEscOverlay}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
        )}
        {isCardDeletePopupOpen && (
          <PopupWithForm
            isOpen={isCardDeletePopupOpen}
            onCloseEscOverlay={popupCloseEscOverlay}
            title="Вы уверены?"
            name="remove"
            buttonTitle="Да"
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
          />
        )}
        {selectedCard.link && (
          <ImagePopup
            onCloseEscOverlay={popupCloseEscOverlay}
            card={selectedCard}
            onClose={closeAllPopups}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

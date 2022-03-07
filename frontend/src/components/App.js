import "../blocks/root/root.css";
import React, { useState, useEffect, useCallback } from "react";
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
import * as auth from "../utils/auth";
import unSuccesImage from "../images/Union.jpg";
import succesImage from "../images/Union(black).jpg";
import InfoTooltip from "./InfoTooltip";

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [userMail, setUserMail] = useState('')
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState({});

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api
      .getInfoAboutUser(), api
        .getCards()]).then(([currentUserData, cards]) => {
          setCurrentUser(currentUserData);
          setCards(cards);
          setIsLoading(false);
        }).catch((err) => {
          console.log(`Ошибка при получении данных профиля: ${err}`);
        });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запросы в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCardSomeLike) => {
        console.log(newCardSomeLike);
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
  function infoToolTipClose() {
    setIsInfoTooltipPopupOpen(false);
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
  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
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
  function handleRegister(email, password, resetForm, inputValues) {
    auth.register(email, password,)
      .then((res) => {
        resetForm();
        setResultMessage({ image: succesImage, text: "Вы успешно зарегистрировались!" });
        setIsInfoTooltipPopupOpen(true);
        localStorage.setItem('user', JSON.stringify(inputValues));
        setTimeout(() => { history.push('/sign-in') }, 3000);

      })
      .catch((err) => {
        console.log(err)
        setResultMessage({ image: unSuccesImage, text: "Что-то пошло не так! Попробуйте ещё раз." });
        setIsInfoTooltipPopupOpen(true);
      }
      )
  }

  function handleLogin(email, password, resetForm) {
    auth.authorize(email, password, resetForm)
      .then((data) => {
        resetForm();
        setLoggedIn(true)
        localStorage.setItem('jwt', data.token);
        history.push('/main');

      })
      .catch((err) => {
        console.log(err)
        setResultMessage({ image: unSuccesImage, text: "Что-то пошло не так! Попробуйте ещё раз." });
        setIsInfoTooltipPopupOpen(true);
      }
      )
  }

  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true)
          setUserMail(res.data.email)
          history.push("/main")
        }
      }).catch((err) => {
        console.log(err)
      });
    }
  }, [history]);

  useEffect(() => {
    tokenCheck();
  }, [loggedIn, tokenCheck]);


  return isLoading ? (
    <Spinner />
  ) : (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
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
            userMail={userMail}
          />
          <Footer />
        </Switch>

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
        {isInfoTooltipPopupOpen && (
          <InfoTooltip
            onClose={infoToolTipClose}
            imageLink={resultMessage.image}
            textMessage={resultMessage.text}
            onOpen={isInfoTooltipPopupOpen}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

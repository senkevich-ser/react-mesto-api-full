import { url, token } from "./utils.js";

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }
  getInfoAboutUser() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    }).then(this._getResponseValue);
  }

  setInfoAboutUser({ name, about }) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._getResponseValue);
  }

  setAvatarUser(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getResponseValue);
  }

  getCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    }).then(this._getResponseValue);
  }

  addCard(data) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResponseValue);
  }
  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseValue);
  }
  likeCard(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._getResponseValue);
  }

  dislikeCard(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseValue);
  }
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._getResponseValue);
  }

  _getResponseValue(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }
}

const api = new Api({
  url: url,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});
export default api;

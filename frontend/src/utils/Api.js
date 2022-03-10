import { url } from "./utils.js";

class Api {
  constructor({ url }) {
    this._url = url;
  }
  _headers(token) {
    return {
      authorization: token,
      "Content-Type": "application/json",
    }
  }
  getInfoAboutUser(token) {
    return fetch(`${this._url}users/me`, {
      headers: this._headers(token),
    }).then(this._getResponseValue);
  }

  setInfoAboutUser({ name, about }, token) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers(token),
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._getResponseValue);
  }

  setAvatarUser(data, token) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers(token),
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getResponseValue);
  }

  getCards(token) {
    return fetch(`${this._url}cards`, {
      headers: this._headers(token),
    }).then(this._getResponseValue);
  }

  addCard(data, token) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers(token),
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResponseValue);
  }
  deleteCard(id, token) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers(token),
    }).then(this._getResponseValue);
  }

  changeLikeCardStatus(id, isLiked, token) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers(token),
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
  url: url
});
export default api;

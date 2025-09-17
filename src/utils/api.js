const baseUrl = "http://localhost:3001";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
};

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

const getItems = () => {
  return request(`${baseUrl}/items`).then((items) =>
    items.map((item) => ({
      ...item,
      imageUrl: item.imageUrl || item.link,
    }))
  );
};

const addItem = ({ name, imageUrl, weather }, token) =>
  request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((item) => ({
    ...item,
    imageUrl: item.imageUrl || item.link,
  }));

const deleteCard = (idToDelete, token) =>
  request(`${baseUrl}/items/${idToDelete}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

const updateUserProfile = (name, avatar) => {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};

const addCardLike = (cardId, token) =>
  request(`${baseUrl}/items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

const removeCardLike = (cardId, token) =>
  request(`${baseUrl}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

export {
  getItems,
  addItem,
  deleteCard,
  updateUserProfile,
  addCardLike,
  removeCardLike,
  baseUrl,
  checkResponse,
};

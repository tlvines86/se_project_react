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

const addItem = ({ name, imageUrl, weather }) =>
  request(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, link: imageUrl, weather }),
  }).then((item) => ({
    ...item,
    imageUrl: item.imageUrl || item.link,
  }));

const deleteCard = (idToDelete) =>
  request(`${baseUrl}/items/${idToDelete}`, {
    method: "DELETE",
  });

export { getItems, addItem, deleteCard, baseUrl, checkResponse };

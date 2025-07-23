import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

// Получить пользователей с пагинацией
export const getUsers = (page = 1, limit = 10) => {
  return axios.get(`${API_URL}?page=${page}&limit=${limit}`);
};

// Получить одного пользователя по ID
export const getUser = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Создать нового пользователя
export const createUser = (user) => {
  return axios.post(API_URL, user);
};

// Обновить пользователя
export const updateUser = (id, user) => {
  return axios.patch(`${API_URL}/${id}`, user);
};

// Удалить пользователя
export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// Загрузить фото пользователя
export const uploadPhoto = (file) => {
  const formData = new FormData();
  formData.append('photo', file);
  return axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
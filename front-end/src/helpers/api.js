import axios from "axios";

export const signupUser = user => {
  return axios.post("/auth/register", user);
};

export const signinUser = user => {
  return axios.post("/auth/login", user);
};

export const getUser = id => {
  return axios.get(`/users/${id}`);
};

export const addbook = book => {
  return axios.post("/add/books", book);
};

export const getbook = id => {
  return axios.get(`/books/${id}`);
};

export const addcomment = comment => {
  return axios.post("/add/comments", comment);
};

export const getcomment = id => {
  return axios.post("/add/comments", id);
};

import axios from "axios";

export const signupUser = user => {
  return axios.post("/auth/register", user);
};

export const signinUser = user => {
  return axios.post("/auth/login", user);
};

export const addbook = book => {
  return axios.post("/add/books", book);
};

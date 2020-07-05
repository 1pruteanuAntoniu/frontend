import { create } from 'apisauce';
import axios from 'axios';

const path = "http://localhost:1337/events";

export const getData = () => {
  return axios({
    method: "GET",
    url: path,
  })
  .then((response) => response)
  .catch((error) => error);
}

export const addEvent = (data) => {
  return axios({
    method: "POST",
    url: path,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
  .then((response) => response)
  .catch((error) => error);
}

export const updateEvent = (id, data) => {
  return axios({
    method: "PUT",
    url: `${path}/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
  .then((response) => response)
  .catch((error) => error);
}

export const deleteEvent = (data) => {
  return axios({
    method: "DELETE",
    url: `${path}/${data.id}`,
  })
  .then((response) => response)
  .catch((error) => error);
}
import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const url = `${baseUrl}/${id}`;
  return axios.delete(url).then((response) => console.log(response.status));
};

const update = (id, newObject) => {
  const url = `${baseUrl}/${id}`;
  const request = axios.put(url, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, remove, update };

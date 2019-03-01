import axios from 'axios';

const config = {
  baseURL: 'https://swapi.co/api/',
};

const connect = axios.create(config);

export default {
  getData() {
    return connect.get('people/')
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error));
  },
  getImage(x) {
    return axios.get('https://cdn.rawgit.com/akabab/starwars-api/0.2.1/api/id/'+x+'.json')
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error));
  },
};

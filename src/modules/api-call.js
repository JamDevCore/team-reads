import axios from 'axios';

const { REACT_APP_TEAM_READS_API_URL, REACT_APP_TEAM_READS_API_KEY } = process.env;

const api = axios.create({
  baseURL: REACT_APP_TEAM_READS_API_URL,
  mode: 'cors',
  headers: {
    'Content-type': 'application/json',
    'x-api-key': REACT_APP_TEAM_READS_API_KEY,
  },
});

export default api;

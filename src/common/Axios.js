import Axios from 'axios';
import axios from 'axios';
import ReadCookie from './ReadCookie';

const sucure = ReadCookie();

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
// axios.defaults.headers.common['Authorization'] = "Bearer" + sucure;

export default axios;
import HttpRequest from './axios';
import config from '@/config';
const baseUrl = config.baseUrl;

const axios = new HttpRequest(baseUrl);
export default axios;

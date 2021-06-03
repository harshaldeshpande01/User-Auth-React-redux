const { API_BASE_URL, API_TIMEOUT } = process.env;

const defaultConfig = {
  baseURL: 'http://localhost:3000/',
  timeout: API_TIMEOUT || 3000,
};

export default defaultConfig;

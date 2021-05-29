import axios from 'axios';
import defaultConfig from 'configurations/network/defaultConfig';
import SecureRequest from './SecureRequest';

class Api {
  static SecureRequest = SecureRequest();

  constructor() {
    this.authData = null;
    this.requestManager = axios.create({
      ...defaultConfig,
    });

    this.requestManager.interceptors.request.use(
      Api.requestInterceptor,
      Api.requestInterceptorError,
    );
    this.requestManager.interceptors.response.use(
      Api.responseInterceptor,
      Api.responseInterceptorError,
    );
  }

  static requestInterceptor = config => {
    const request = Api.SecureRequest.getSecureAuthRequest(config);
    return request;
  };

  static requestInterceptorError = error => {
    return Promise.reject(error);
  };

  static responseInterceptor = response => {
    const newResponse = Api.SecureRequest.getResponse(response);
    return newResponse;
  };

  static responseInterceptorError = error => {
    return Promise.reject(error);
  };

  fetch = (options, action) => {
    return this.requestManager.request(options);
  };

  errorHandling = (error, _action, _retries) => {
    if (!error.status) return false;

    if (error.status === 401) {
      // ApiInstance logout method
    }

    return error.status >= 400 && error.status < 500;
  };
}

export default Api;

window.Api = Api;

const SecureRequest = () => {
  let tokenData = null;
  const responseTokenKey = 'accessToken';
  const requestTokenKey = 'accessToken';

  const getAccessToken = () => {
    return tokenData;
  };

  const storeAccessToken = response => {
    if (response && response.headers) {
      tokenData = {
        // Replace with the key
        [requestTokenKey]: response.headers[responseTokenKey],
      };
    }
  };

  const getSecureAuthRequest = unsecuredRequest => {
    // mutate the reuest to pass auth data
    const accessToken = getAccessToken();
    // Implement Encryption Algo
    const securedRequest = {
      ...unsecuredRequest,
    };
    return {
      ...securedRequest,
      headers: {
        ...securedRequest.headers,
        ...accessToken,
      },
    };
  };

  const getResponse = securedResponse => {
    storeAccessToken(securedResponse);
    // Implement Decryption Algo
    const response = {
      ...securedResponse,
    };
    return response;
  };

  return {
    getSecureAuthRequest,
    getResponse,
  };
};

export default SecureRequest;

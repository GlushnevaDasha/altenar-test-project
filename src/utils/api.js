import { getError } from "./functions";

const URL = `https://itunes.apple.com/`;

const buildHeaders = (token, method, isFile = false) => {
  let headers = {
    Accept: "application/json",
    "cache-control": "no-cache",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": method
  };
  if (!isFile) {
    headers = {
      ...headers,
      "Content-Type": "application/json"
    };
  }

  if (!token) {
    return headers;
  }

  return {
    ...headers,
    Authorization: token
  };
};

export const buildBody = data => {
  if (!data) {
    return null;
  }

  let formBody = [];

  for (let property in data) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }

  return formBody.join("&");
};

const apiRequestWithBody = async (method, url, data, token = null) => {
  return await fetch(url, {
    method,
    headers: buildHeaders(token, method),
    body: JSON.stringify(data)
  })
    .then(function(response) {
      if (response.status !== 200) {
        return {
          error: true,
          code: response.status,
          message: getError(response.status)
        };
      } else {
        return Promise.resolve(response);
      }
    })
    .then(res => {
      if (res.error) {
        return res;
      } else {
        return res.json();
      }
    })
    .then(function(data) {
      return data;
    });
  // .catch(response => {
  //   return { error: true, message: response };
  // });
};

export const getSearchAll = async data => {
  return await apiRequestWithBody(
    "GET",
    `${URL}search?country=ru&term=${data}`
  );
};

export const getSearchByID = async id => {
  return await apiRequestWithBody("GET", `${URL}lookup?country=ru&id=${id}`);
};

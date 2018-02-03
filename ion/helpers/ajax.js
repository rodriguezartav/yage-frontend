var Ajax = {}
import Promise from "bluebird";
import Auth from "./auth";

Ajax.getURL = function(path, params) {
  if (!params) params = {};
  var url = process.env.API_URL;
  return url + path;
}

Ajax.logout = function() {
  Auth.setCookie("token", "");
  Auth.setCookie("userName", "");
  Auth.setCookie("namespace_id", "");
  window.location.reload();
}

Ajax.handleResponse = function(status, type, url, response, headers) {
  if (status < 300) return Promise.resolve(response);

  console.log(url);
  console.log(response);

  if (status == 402 || status == 401) return Promise.resolve({
    accessError: true
  });
  else if (status < 500) return Promise.resolve({
    apiError: true,
    error: response
  });
  else {
    return Promise.resolve({
      serverError: true,
      error: response
    });
  }
}

Ajax.checkStatus = function(path) {
  var status;
  var url = Ajax.getURL(path);
  var headers;
  return fetch(url, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': Ajax.authorization_code,
        'x-namespace': process.env.NODE_ENV
      }),
      mode: "cors",
      method: "GET",
    })
    .then(function(response) {
      headers = response.headers;
      status = response.status;
      return response.json();
    })
    .then(function(response) {
      return Ajax.handleResponse(status, "GET", url, response, headers);
    })
    .catch(function(err) {
      console.log(err)
      if (!headers) headers = {};
      if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) return {
        accessError: true,
        error: err
      };
      else return {
        httpError: true,
        error: err
      };
    })
}

Ajax.get = function(path, params) {
  var status;
  var headers;
  var url = Ajax.getURL(path, params);
  return fetch(url, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': Ajax.authorization_code,
        'x-namespace': process.env.NODE_ENV
      }),
      mode: "cors",
      method: "GET",
    })
    .then(function(response) {
      headers = response.headers;
      status = response.status;
      return response.json();
    })
    .then(function(response) {
      return Ajax.handleResponse(status, "GET", url, response, headers);
    })
    .catch(function(err) {
      if (!headers) headers = {};
      return {
        httpError: true,
        error: err
      };
    })
}

Ajax.post = function(path, body, params) {
  var status;
  var headers;
  var url = Ajax.getURL(path, params);
  return fetch(url, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': Ajax.authorization_code,
        'x-namespace': process.env.NODE_ENV
      }),
      body: JSON.stringify(body),
      mode: "cors",
      method: "POST",
    })
    .then(function(response) {
      headers = response.headers;
      status = response.status;
      return response.json();
    })
    .then(function(response) {
      return Ajax.handleResponse(status, "GET", url, response, headers);
    })
    .catch(function(err) {
      if (!headers) headers = {};
      return {
        httpError: true,
        error: err
      };
    })
}

Ajax.put = function(path, body, params) {
  var status;
  var headers;
  var url = Ajax.getURL(path, params);
  return fetch(url, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': Ajax.authorization_code,
        'x-namespace': process.env.NODE_ENV
      }),
      body: JSON.stringify(body),
      mode: "cors",
      method: "PUT",
    })
    .then(function(response) {
      headers = response.headers;
      status = response.status;
      return response.json();
    })
    .then(function(response) {
      return Ajax.handleResponse(status, "GET", url, response, headers);
    })
    .catch(function(err) {
      if (!headers) headers = {};
      return {
        httpError: true,
        error: err
      };
    })
}

Ajax.delete = function(path, params) {
  var status;
  var headers;
  var url = Ajax.getURL(path, params);
  return fetch(url, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': Ajax.authorization_code,
        'x-namespace': process.env.NODE_ENV
      }),
      mode: "cors",
      method: "DELETE",
    })
    .then(function(response) {
      headers = response.headers;
      status = response.status;
      return response.json();
    })
    .then(function(response) {
      return Ajax.handleResponse(status, "GET", url, response, headers);
    })
    .catch(function(err) {
      if (!headers) headers = {};
      return {
        httpError: true,
        error: err
      };
    })

}

export default Ajax;

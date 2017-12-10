import BpPromise from "bluebird";
import Ajax from "./ajax";
import React from 'react';
import ReactDOM from 'react-dom';
import LoginComponent from "../components/login";

var Auth = {}

Auth.checkAuth = function(){
  return new BpPromise.resolve({});
}

Auth.getAuthCookie = function(){
  var cookies = document.cookie.split('; ');
  cookies.forEach(function(cookie){
    var parts = cookie.split("=");
    if(parts[0] == "token") Ajax.authorization_code = parts[1];
  })
}

Auth.login = function(){
  var promise = function(resolve,reject){
    ReactDOM.render(
      <LoginComponent resolve={resolve} reject={reject} />
     , document.getElementById('login')
    );
  }
  return new BpPromise(promise);
}

Auth.getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return null;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

Auth.setCookie = function(authorization_code){
  var cookie = "token" + "=" + authorization_code +"; Path=/;";
  if(location.href.indexOf("localhost")==-1) cookie += " Domain=rodcocr.com; ";
  document.cookie = cookie
}


export default Auth;

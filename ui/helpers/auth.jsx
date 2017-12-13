import BpPromise from "bluebird";
import Ajax from "./ajax";
import React from 'react';
import ReactDOM from 'react-dom';
import LoginComponent from "../components/login";

var Auth = {}

Auth.checkAuth = function(){
  var access_key = Auth.getParameterByName("access_key");
  var loginOperation;
  if(access_key) loginOperation = Ajax.post("/login/login/loginWithCode",{code: access_key})
  .then(function(contact){
    Auth.setCookie(contact.authorization_code)
    Ajax.authorization_code = contact.authorization_code;
    return contact;
  })
  else loginOperation = Ajax.checkStatus("/login/checkstatus")
  .then(function(result){
    if(result == false) return Auth.login()
    .then(function(contact){
      document.getElementById('login').innerHTML ="";
      return contact;
    })
    else return result;
  })
  return loginOperation
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
  if(location.href.indexOf("localhost")==-1) cookie += " Domain=rodcostage.com; ";
  console.log("set cokkir", cookie);
  document.cookie = cookie
}


export default Auth;

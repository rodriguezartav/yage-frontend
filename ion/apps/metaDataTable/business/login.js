import React from 'react';
import {Ajax,Auth} from "../../../helpers";
import ReactDOM from 'react-dom';
import LoginComponent from "../../../components/login";
import Business from "./index";
import BpPromise from "bluebird";
import Logo from "./logo";

var app;
var onLoginComplete;

function Login(){
}

Login.init = function(_app, _onLoginComplete){
  app = _app;
  onLoginComplete = _onLoginComplete;
}

Login.onLoginRequested = function(){
  return Login.renderLoginModal()
  .then(function(response){
    document.getElementById('login').innerHTML ="";
    if(response){
      app.setState({ user: response })
      return onLoginComplete(response);
    }
    else return false;
  })
  .catch(function(loginError){
    console.log(loginError)
  })
}

Login.checkAuth = function(){

  return Ajax.checkStatus("/login/checkstatus")
  .then(function(result){
    Logo.httpEnd();
    if(result.httpError) return Business.handleHttpError();
    else if(result.serverError) return Business.handleServerError();
    else if( result.accessError || result.apiError ) return Login.onLoginRequested();

    return onLoginComplete(result);
  })
}

Login.renderLoginModal = function(){

  var promise = function(resolve,reject){

    ReactDOM.render(
      <LoginComponent
        loginWithPhone={Business.instance.loginWithPhone.bind(Business.instance) }
        loginWithEmail={Business.instance.loginWithEmail.bind(Business.instance) }
        loginWithCode={Business.instance.loginWithCode.bind(Business.instance) }
        register={Business.instance.register.bind(Business.instance) }
        resolve={resolve}
        reject={reject} />
     , document.getElementById('login')
    );
  }
  return new BpPromise(promise);
}

export default Login;

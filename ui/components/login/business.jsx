import Ajax from "../../helpers/ajax";
import Auth from "../../helpers/auth";

function Business(app){
  var _this = this;
  this.app = app;
  this.app.state={
    pendingSave: false,
    view: "form",
    message: null,
    spinner: false,
  };
  Business.instance = this;
}

Business.instance = null;

Business.prototype.registerWithSalesforce = function(){
  var _this = this;
  var clienteId = process.env.SF_CLIENT_ID;
  var redirectURL= process.env.SF_REDIRECT_URL;
  var url =
    'https://login.salesforce.com/services/oauth2/authorize'
    + '?response_type=code'
    + '&scope=openid'
    + '&state=' + encodeURI(this.app.state.redirect_uri)
    + '&nonce=abc'
    + '&client_id=' + clienteId
    + '&redirect_uri=' + redirectURL;

  window.location = url;
}

Business.prototype.register = function(contact){
  var _this = this;
  Ajax.post("/operations/login/register", {contact:contact, returnTo: this.app.state.redirect_uri})
  .then( function(contact){
    console.log(contact)
    Auth.setCookie(contact.authorization_code);
    Ajax.authorization_code = contact.authorization_code;
    _this.app.props.resolve(contact);
    return contact;
  })
  .catch(function(err){
    console.log(err);
    _this.app.setState({error: err})
  })
}

Business.prototype.loginWithEmail = function(email){
  var _this = this;
  return Ajax.post("/operations/login/loginWithEmail", { email: email })
}

Business.prototype.loginWithPhone = function(phone){
  var _this = this;
  return Ajax.post("/operations/login/loginWithPhone", {phone: phone})
}

Business.prototype.loginWithCode = function(code){
  var _this = this;
  return Ajax.post("/operations/login/loginWithCode",{code: code})
  .then( function(contact){
    Auth.setCookie(contact.authorization_code)
    Ajax.authorization_code = contact.authorization_code;
    _this.app.props.resolve(contact);
    return contact;
  })
  .catch(function(err){
    _this.app.setState({error: err})
  })
}

export default Business;

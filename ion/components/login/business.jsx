
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
  return this.app.props.register(contact)
  .then( function(results){
    if( !results ) return;
    var contact =results;
    _this.app.props.resolve(contact);
    return contact;
  })
}

Business.prototype.loginWithEmail = function(email){
  var _this = this;
  return this.app.props.loginWithEmail( email )
}

Business.prototype.loginWithPhone = function(phone){
  var _this = this;
  return this.app.props.loginWithPhone( phone )
}

Business.prototype.loginWithCode = function(code){
  var _this = this;
  return this.app.props.loginWithCode( code )
  .then( function(results){
    console.log(results)
    if( !results ) return;
    _this.app.props.resolve(results);
    return results;
  })
}


export default Business;

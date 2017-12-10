import moment  from "moment";
import Business from "./business";

var UI = {
  business: null
};

UI.onFormClick = function(email,phone){
  var operation;
  if(email) operation= Business.instance.loginWithEmail(email)
  else operation= Business.instance.loginWithPhone(phone)

  operation.then(function(result){
    Business.instance.app.setState({view:"code"})
  })
  .catch(function(e){
    Business.instance.app.setState({view:"register",email: email, phone:phone});
  })
}

UI.onLoginWithCode = function(code){
  Business.instance.loginWithCode(code);
}

UI.onRegister = function(contact){
  Business.instance.register(contact);
}

UI.backToLogin = function(){
  Business.instance.app.setState({view: "form"})
}

export default UI;

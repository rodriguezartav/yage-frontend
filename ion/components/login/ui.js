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
    if(!result) return; //Error ocurred
    else if(result.error && result.error.status == 404)  Business.instance.app.setState({view:"register",email: email, phone:phone});
    else if(result.error) return;
    else Business.instance.app.setState({view:"code"})
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

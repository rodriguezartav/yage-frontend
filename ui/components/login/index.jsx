import React from 'react';
import LoginForm from "./loginForm"
import LoginCode from "./loginCode"
import Register from "./loginRegister"
import Style from './style.css';
import Business from "./business";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.business = new Business(this);
  }

  renderForm(){
    if(this.state.view == "code") return <LoginCode email={this.state.email} phone={this.state.phone}></LoginCode>
    else if(this.state.view == "form") return <LoginForm/>
    else if(this.state.view == "register") return <Register/>

  }

  render(){
    return <div role="dialog" className="slds-modal slds-fade-in-open">
      <div className="slds-modal__container">
        <div className="slds-modal__header">
          <h2 id="header43" className="slds-text-heading--medium">Bienvenido a Rodco</h2>
        </div>
        <div className="slds-modal__content slds-p-around--medium">
          {this.renderForm()}
        </div>
      </div>
    </div>
  }
}

Login.demo = function(Highlight){
  return <div>
    <Login />
    <Highlight className='dark'>
      {`<Login />`}
    </Highlight>
  </div>
}

export default Login;

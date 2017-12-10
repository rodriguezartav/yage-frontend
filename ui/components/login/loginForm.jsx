import React from 'react';
import UI from "./ui";

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    // Manually bind this method to the component instance...
  }

  handleLoginClick(e) {
    UI.onFormClick(this.refs.email.value,this.refs.phone.value);
  }

  render() {
    return <div>

      <div className="slds-grid slds-grid_align-spread ">

        <div className="slds-size--8-of-12 slds-p-right--medium" style={{borderRight: "1px solid #ddd"}}>

        <label className="slds-form-element__label ">Ingrese su email o su celular</label>

        <div className="slds-form slds-form_horizontal ">
          <div className="slds-form-element">
            <label className="slds-form-element__label ">Email</label>
            <div className="slds-form-element__control slds-p-left--x-small">
              <input ref="email" type="text" className="slds-input " placeholder=""/>
            </div>
          </div>
          <label className="slds-form-element__label ">- o -</label>

          <div className="slds-form-element">
            <label className="slds-form-element__label ">Celular</label>
            <div className="slds-form-element__control slds-p-left--x-small">
              <input ref="phone" type="text" className="slds-input " placeholder=""/>
            </div>
          </div>

          </div>
          <button onClick={this.handleLoginClick.bind(this)} type="button"
          className="slds-button slds-button--brand slds-float--right slds-m-top--small">Login</button>
        </div>

        <div className="slds-size--4-of-12 slds-float--right" >



        </div>

  </div>


        <div className="slds-grid  slds-grid_align-center">

      </div>

    </div>



  }
}


export default LoginForm;

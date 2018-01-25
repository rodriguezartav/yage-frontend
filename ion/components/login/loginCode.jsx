import React from 'react';
import UI from "./ui";

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
  }

  handleLoginClick(e) {
    UI.onLoginWithCode(this.refs.code.value)
  }


  render() {
    return <div>

      <div className="slds-grid slds-grid_align-spread slds-p-horizontal_large">


        <div className="slds-size--8-of-12 slds-p-right--medium">

        <div className="slds-form slds-form_horizontal ">
          <div className="slds-form-element">
            <label className="slds-form-element__label" >Codigo</label>
            <div className="slds-form-element__control slds-p-left--x-small">
              <input ref="code" type="text" className="slds-input " placeholder=""/>
              <small>Codigo enviado via SMS o email</small>
            </div>
          </div>
          </div>

          <button onClick={this.handleLoginClick.bind(this)} type="button"
          className="slds-m-left--small slds-button slds-button--brand slds-float--right slds-m-top--small">Ingresar</button>


          <button onClick={UI.backToLogin} type="button"
          className="slds-button slds-button--neutral slds-float--right slds-m-top--small">Regresar</button>


        </div>


  </div>


        <div className="slds-grid  slds-grid_align-center">

      </div>

    </div>



  }
}


export default LoginForm;

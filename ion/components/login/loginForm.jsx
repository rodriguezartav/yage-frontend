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

      <div className="slds-grid slds-grid_align-spread slds-p-horizontal_large">

        <div className="slds-size--6-of-12 slds-p-right--medium" >
        <h2  className="slds-text-heading_medium slds-m-bottom_medium">Login con email</h2>

        <div className="slds-m-right_x-large">
        <div className="slds-form slds- ">
          <div className="slds-form-element">
            <label className="slds-form-element__label ">Email</label>
            <div className="slds-form-element__control slds-p-left--x-small">
              <input ref="email" type="text" className="slds-input " placeholder=""/>
            </div>
          </div>



          </div>
          <button onClick={this.handleLoginClick.bind(this)} type="button"
          className="slds-button slds-button--brand slds-float--right slds-m-top--small">Login</button>
          </div>
        </div>

        <div className="slds-size--6-of-12 " >
        <h2  className="slds-text-heading_medium slds-m-bottom_medium">Login con mobile</h2>

        <div className="slds-m-right_x-large">
        <div className="slds-form  ">
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
        </div>

  </div>


        <div className="slds-grid  slds-grid_align-center">

      </div>

    </div>



  }
}


export default LoginForm;

import React from 'react';
import UI from "./ui";

class LoginProvider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false
    }
  }

  handleClick(e) {
    var _this = this;
    var error=false;
    var keys = Object.keys(this.refs);
    var contact = {};
    keys.forEach(function(key){
      var ref = _this.refs[key];
      if(!ref.value || ref.value == "" || ref.value.length < 1) error=true;
      else contact[key] = ref.value;
    })
    if(error) this.setState({error: true})
    else UI.onRegister(contact)
  }

  renderError(){
    var error = this.state.error || this.props.error;
    if(!error) return null;
    return <div className="slds-theme--error slds-m-bottom--medium slds-p-around--x-small">
      {error.message || error.errorMessage || "Todos lo campos son requeridos, intente de nuevo."}
    </div>
  }

  render() {
    return <div>
     <div className="demo-only" >
      <div className="slds-text-heading--small slds-m-bottom--medium">No encontramos su email/telefono, registrese a continuacion</div>
       <div className="slds-form slds-form_stacked">
         <fieldset className="slds-form-element">
           <legend className="slds-form-element__label slds-text-title_caps">Identificación</legend>
           <div className="slds-form-element__group">
             <div className="slds-form-element__row">
               <div className="slds-form-element slds-size_1-of-2">
                 <label className="slds-form-element__label" htmlFor="input-01">Nombre</label>
                 <input ref="first_name" type="text" id="input-01" className="slds-input"/>
               </div>
               <div className="slds-form-element slds-size_1-of-2">
                 <label className="slds-form-element__label" htmlFor="input-02">Apellido</label>
                 <input ref="last_name" type="text" id="input-02" className="slds-input"/>
               </div>
             </div>
           </div>
         </fieldset>
         <fieldset className="slds-form-element">
           <legend className="slds-form-element__label slds-text-title_caps">Contacto</legend>
           <div className="slds-form-element__group">
             <div className="slds-form-element__row">
               <div className="slds-form-element slds-size_1-of-2">
                 <label className="slds-form-element__label" htmlFor="input-04">Email</label>
                 <input defaultValue={this.props.emailOrPhone} ref="email" type="email" id="email" name="email" className="slds-input"/>
               </div>
               <div className="slds-form-element slds-size_1-of-2">
                 <label className="slds-form-element__label" htmlFor="input-05">Celular</label>
                 <input ref="mobile_phone" type="text" id="input-05" className="slds-input"/>
               </div>
             </div>

           </div>

           {this.renderError()}

           <div className="slds-form-element slds-m-top--small">
             <button onClick={UI.backToLogin} type="button" className="slds-button slds-button--neutral slds-m-right--xx-large">Regresar</button>
             <button onClick={this.handleClick.bind(this)} type="button" className="slds-button slds-button--brand">Ingresar</button>
           </div>
         </fieldset>
       </div>
     </div>

    </div>



  }
}


export default LoginProvider;

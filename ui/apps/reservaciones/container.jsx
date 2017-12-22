import React from 'react'
import Style from './style.css';
import UI from "./ui";
import Menu from "./menu";
import Business from "./business";

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.business = new Business(this);
    this.onMontoChange = this.onMontoChange.bind(this);
    this.onDiaChange = this.onDiaChange.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onMontoChange(e){
    console.log(e)
    UI.onChangePersonas(parseInt(e.currentTarget.dataset.personas))
  }

  onDiaChange(e){
    UI.onChangeDia(this.refs)
  }

  onChangeText(e){
    UI.onChangeText(e.currentTarget.dataset.name, e.currentTarget.value)
  }

  onSave(){
    if(!UI.isNameValid()) return;
    if(!UI.isApellidoValid()) return;
    if(!UI.isEmailValid()) return;
    if(!UI.isPersonasValid()) return;
    if(!UI.isDiasValid()) return;
    this.business.onSave();
  }

  renderButtons(){
    if( this.state.saving ) return null;
    else return <div>
      <button style={{backgroundColor: "#fef200, color: #333"}} onClick={this.onSave} type="button" className="slds-button slds-button--brand">
        Reservar
      </button>
    </div>
  }

  renderError(){
    if(!this.state.error) return null;
    return  <div className="slds-notify_container">
      <div className="slds-notify slds-notify--alert slds-theme--error slds-theme--alert-texture" role="alert">
        <span className="slds-assistive-text">Error</span>
        <h2>
          <svg className="slds-icon slds-icon--small slds-m-right--x-small" aria-hidden="true">
            <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#ban"></use>
          </svg>
          {this.state.error}
          </h2>
      </div>
    </div>
  }

  renderComplete(){
    return <div>


    <div className="slds-text-heading--large slds-m-bottom--large">Gracias {this.state.nombre}!!</div>
    <div className="slds-">
      <div className="slds-notify slds-notify--alert slds-theme--success slds-theme--alert-texture" role="alert">
        <span className="slds-assistive-text">Listo!!!</span>
        <h2>
          <svg className="slds-icon slds-icon--small slds-m-right--x-small" aria-hidden="true">
            <use xlinkHref="/assets/icons/custom-sprite/svg/symbols.svg#custom29"></use>
          </svg>Su reservacion ha sido registrada</h2>
      </div>
    </div>
    <div className="slds-text-text--small slds-m-bottom--xx-small slds-m-top--small">Le estaremos enviando un correo con mas informacion. </div>

    <div className="slds-text-text--xx-small slds-m-bottom--large">Si no lo recibe, busquelo en su folder de SPAM o contacte a roberto@3vot.com para soporte tecnico con su reservacion.</div>
    </div>
  }

  renderForm() {
    return <div>
    {this.renderError()}

    <div className="slds-text-heading--large ">Ceremonia de Sanación del Taita Lucho {this.state.periodo}</div>


    <div className="slds-form--stacked slds-m-top--large" >
  <div className="slds-form-element">
    <label className="slds-form-element__label" >Nombre</label>
    <div className="slds-form-element__control">
      <input data-name="nombre" onChange={this.onChangeText} ref="nombre" type="text"  className="slds-input" placeholder="Nombre de quien reserva" />
    </div>
  </div>

  <div className="slds-form-element">
    <label className="slds-form-element__label" >Apellido</label>
    <div className="slds-form-element__control">
      <input data-name="apellido" onChange={this.onChangeText} ref="apellido" type="text"  className="slds-input" placeholder="(requerido)" />
    </div>
  </div>

  <div className="slds-form-element">
    <label className="slds-form-element__label">Email</label>
    <div className="slds-form-element__control">
    <input data-name="email" onChange={this.onChangeText} ref="email" type="text" className="slds-input" placeholder="Email (requerido)" />
    </div>
  </div>

  <fieldset className="slds-form-element">
    <legend className="slds-form-element__legend slds-form-element__label">Dias (Febrero 8, 10 y 11)</legend>
    <div className="slds-form-element__control">
      <div className="slds-checkbox--button-group">
        <span className="slds-button slds-checkbox--button" htmlFor="monday">
          <input ref="jueves" data-dia="jueves" onChange={this.onDiaChange}  type="checkbox" name="checkbox" id="monday" />
          <label className="slds-checkbox--button__label" htmlFor="monday">
            <span className="slds-checkbox--faux">Jueves</span>
          </label>
        </span>
        <span className="slds-button slds-checkbox--button" htmlFor="tuesday">
          <input ref="sabado" data-dia="jueves" onChange={this.onDiaChange} type="checkbox" name="checkbox" id="tuesday" />
          <label className="slds-checkbox--button__label" htmlFor="tuesday">
            <span className="slds-checkbox--faux">Sabado</span>
          </label>
        </span>
        <span className="slds-button slds-checkbox--button" htmlFor="wednesday">
          <input ref="domingo" data-dia="jueves" onChange={this.onDiaChange} type="checkbox" name="checkbox" id="wednesday" />
          <label className="slds-checkbox--button__label" htmlFor="wednesday">
            <span className="slds-checkbox--faux">Domingo</span>
          </label>
        </span>

      </div>
    </div>
  </fieldset>

  <fieldset className="slds-form-element">
    <legend className="slds-form-element__legend slds-form-element__label">Personas que van a asitir</legend>
    <div className="slds-form-element__control">
      <div className="slds-radio--button-group">
        <span className="slds-button slds-radio--button">
          <input  type="radio" name="radio" id="personas1" />
          <label data-personas="1" onClick={this.onMontoChange}  className="slds-radio--button__label" htmlFor="personas1">
            <span className="slds-radio--faux">1</span>
          </label>
        </span>
        <span className="slds-button slds-radio--button">
          <input  type="radio" name="radio" id="personas2" />
          <label data-personas="2" onClick={this.onMontoChange} className="slds-radio--button__label" htmlFor="personas2">
            <span className="slds-radio--faux">2</span>
          </label>
        </span>
        <span className="slds-button slds-radio--button">
          <input  type="radio" name="radio" id="personas3" />
          <label data-personas="3" onClick={this.onMontoChange} className="slds-radio--button__label" htmlFor="personas3">
            <span className="slds-radio--faux">3</span>
          </label>
        </span>
      </div>
    </div>
  </fieldset>

  <div className="slds-form-element">
    <label className="slds-form-element__label">Monto</label>
    <div className="slds-form-element__control">
      <div className="slds-text-heading--medium">${this.state.monto}</div>
    </div>
  </div>

  <div className="slds-text-heading--medium slds-m-top--large">Problemas?: Escribí a roberto@3vot.com</div>


    <div style={{backgroundColor: "#440e62"}} className="slds-docked-form-footer">
      {this.renderButtons()}
    </div>

  </div>
</div>
  }

  render(){
    var body;
    if(this.state.view == "home") body =  this.renderForm();
    if(this.state.view == "complete") body =  this.renderComplete();



    return <div>
    <Menu />
    <div  className="slds-m-around--x-large slds-size--5-of-12 slds-p-bottom--x-large">


    {body}
    </div>
    </div>
  }
}

export default Container;

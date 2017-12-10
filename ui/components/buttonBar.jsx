import React from 'react'

class ButtonBar extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e){
    this.props.onChange(this.props.datakey,e.currentTarget.dataset.option)
  }

  renderButtons(id){
    var _this = this;

    return this.props.options.map(function(option){
      var value = option.value;
      var defaultValue = _this.props.defaultValue || _this.props.value || "";

      if( option.label ){
        if(option.value == defaultValue) defaultValue = option.label;
        option = option.label;
      }else value = option;

      var id2 = "" + parseInt(Math.random()*1000);

      return  <span key={value} className="slds-button slds-radio_button">

        <input data-option={value} onChange={_this.onChange} checked={ defaultValue == option } type="radio" name="radio" id={id2+id} value="on"/>

        <label  className="slds-radio_button__label" htmlFor={id2+id}>
          <span className="slds-radio_faux slds-truncate">{option}</span>
        </label>
      </span>
    })
  }

  renderError(key){
    if( ( this.props.errors || [] ).indexOf(this.props.datakey)>-1) return <div className="slds-form-element__help slds-theme--error">El campo es requerido</div>
    else return null;
  }

  render(){
    var id = " " + parseInt(Math.random()*1000);

    return <form id={id}> <fieldset id={id} name={id} className="slds-form-element">
      <legend className="slds-form-element__legend slds-form-element__label">{this.props.label}</legend>
      <div className="slds-form-element__control">
        <div className="slds-radio_button-group">
          {this.renderButtons(id)}
        </div>
        {this.renderError()}
      </div>
    </fieldset>
    </form>
  }
}

export default ButtonBar;

ButtonBar.demo = function(Highlight){
  return <div>
    <ButtonBar
      errors={null}
      datakey="type"
      item={{}}
      onChange={null}
      label="En cual tipo calza mejor el proyecto?"
      options={["Residencial","Comercial"]} />

      <ButtonBar
        errors={null}
        datakey="type"
        item={{}}
        onChange={null}
        label="En cual tipo calza mejor el proyecto?"
        options={["Residencial","Comercial"]} />

    <Highlight className='dark'>
      {`<ButtonBar
      errors={null}
      datakey="type"
      item={null}
      onChange={null}
      label="En cual tipo calza mejor el proyecto?"
      options={["Residencial","Comercial"]} />`}
    </Highlight>
  </div>
}

import React from 'react'
import Style from './style.css'

class Input extends React.Component {

  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(e){
    this.props.onChange(this.props.datakey, e.currentTarget.value)
  }

  renderError(){
    if(this.props.errors && this.props.errors.indexOf(this.props.datakey)>-1) return <div className="slds-theme--error slds-form-element__help">
     El campo es requerido
    </div>
    else return null;
  }

  render(){
    return <div>
      <label className="slds-form-element__label rodco-label" >{this.props.label}</label>
      <br/>
      <input
        value={this.props.item[this.props.datakey] || ""}
        type={this.props.type || "text"}
        data-type={this.props.datakey}
        onChange={this.onChangeText}
        className={"slds-input " + ( this.props.size || "")}/>
      {this.renderError()}
    </div>

    }

}

Input.demo = function(Highlight){
  return <div>
    <Input label="Donde se instalarian los productos?"
      datakey="address"
      item={{}}
      size="slds-size--3-of-12"
      errors={null}
      onChange={null}/>
    <Highlight className='dark'>
      {`<Input label="Donde se instalarian los productos?"
      datakey="address"
      item={{}}
      size="slds-size--3-of-12"
      errors={{}}
      onChange={undefined}/>`}
    </Highlight>
  </div>
}

export default Input;




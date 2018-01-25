import React from 'react'
import Input from "./input";

class ColumnForm extends React.Component {

  constructor(props) {
    super(props);
  }

  renderChildren(){
    var children = this.props.children;
    if(!children.map) children=[children]
    return children.map(function(child){
      return <div key={child.props.datakey} className="slds-form-element slds-size_1-of-2">
        {child}
      </div>
    })
  }

  render(){
    return <div className="slds-form slds-form_compound">
        <fieldset className="slds-form-element">
        <legend className="slds-form-element__label slds-text-title_caps">{this.props.label}</legend>
        <div className="slds-form-element__group">
        <div className="slds-form-element__row">
          {this.renderChildren()}
        </div>
        </div>
        </fieldset>
    </div>
    }

}

ColumnForm.demo = function(Highlight){
  return <div>
    <ColumnForm item={{}} errors={null} label="Titulo de Categoria">
        <Input label="Quien es el cliente directo?"
          datakey="company"
          item={{}}
          errors={null}
          onChange={null}/>

          <Input label="Quien es el cliente directo?"
            datakey="other"
            item={{}}
            errors={null}
            onChange={null}/>

            <Input label="Quien es el cliente directo?"
              datakey="other1"
              item={{}}
              errors={null}
              onChange={null}/>
    </ColumnForm>

    <Highlight className='dark'>
      {` <ColumnForm item={{}} errors={null} label="Titulo de Categoria">
        <Input label="Quien es el cliente directo?"
          datakey="company"
          item={{}}
          errors={null}
          onChange={null}/>

          <Input label="Quien es el cliente directo?"
            datakey="other"
            item={{}}
            errors={null}
            onChange={null}/>
    </ColumnForm>`}
    </Highlight>
  </div>
}

export default ColumnForm;






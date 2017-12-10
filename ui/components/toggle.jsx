import React from 'react'


class Toggle extends React.Component {

  constructor(props) {
    super(props);
  }

  onChange(e){
    this.props.onChange(this.props.name, e.currentTarget.checked)
  }

  renderVertical(){
    return <div className="demo-only ">
      <div className="slds-form-element">
        <label className="slds-checkbox_toggle">
          <span style={{width: 100}} className="slds-form-element__label slds-m-bottom_xx-small">{this.props.label}</span>
          <input onChange={this.onChange.bind(this)} checked={this.props.isEnabled} type="checkbox" name="checkbox" aria-describedby="toggle-desc" value="on"/>
          <span id="toggle-desc" className="slds-checkbox_faux_container" aria-live="assertive">
            <span className="slds-checkbox_faux"></span>
            <span className="slds-checkbox_on">Enabled</span>
            <span className="slds-checkbox_off">Disabled</span>
          </span>
        </label>
      </div>
    </div>
  }

  renderEnabled(){
    if(this.props.hideEnabled) return null;
    else return <span>
      <span className="slds-checkbox_on">Enabled</span>
      <span className="slds-checkbox_off">Disabled</span>
    </span>
  }

  renderLabel(){
    if(!this.props.label) return null;
    return <span style={{width: 100, margin:10, display:"inline-table"}} className="slds-form-element__label slds-m-bottom_none">{this.props.label}</span>
  }

  render(){
    if(this.props.vertical) return this.renderVertical();
    return <div className="demo-only ">
      <div className="slds-form-element">
        <label className="slds-checkbox_toggle slds-grid">
          {this.renderLabel()}
          <input onChange={this.onChange.bind(this)} checked={this.props.isEnabled} type="checkbox" name="checkbox" aria-describedby="toggle-desc" value="on"/>
          <span id="toggle-desc" className="slds-checkbox_faux_container" aria-live="assertive">
                <span className="slds-checkbox_faux"></span>
                {this.renderEnabled()}
              </span>

        </label>
      </div>
    </div>
  }
}

Toggle.demo = function(Highlight){
  return <div>
    <Toggle isEnabled={false} onChange={null} label="Test"/>

    <Highlight className='dark'>
      {'<Toggle isEnabled={false} onChange={null} label="Test"/>'}
    </Highlight>
    <br/><br/><br/>
    <Toggle isEnabled={false} vertical={true} onChange={null} label="Test"/>

    <Highlight className='dark'>
      {'<Toggle isEnabled={false} vertical={true} onChange={null} label="Test"/>'}
    </Highlight>
  </div>
}


export default Toggle;

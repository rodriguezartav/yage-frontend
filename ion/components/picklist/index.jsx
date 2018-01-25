
import React from 'react'

class Picklist extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      isOpen: false
    };
  }

  onChange(e){
    this.props.onChange(this.props.datakey,e.currentTarget.dataset.option)
  }

  onClick(){
    if(this.state.isOpen) this.setState({isOpen: false});
    else this.setState({isOpen: true});
  }

  renderItems(){
    var _this = this;
    return this.props.options.map(function(option){
      return <li key={option} data-option={option} onClick={_this.onChange.bind(_this)} role="presentation" className="slds-listbox__item">
                <span className="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center slds-has-focus" role="option">
                  <span className="slds-media__figure">
                    <svg className="slds-icon slds-icon_x-small slds-listbox__icon-selected" aria-hidden="true">
                      <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#check" />
                    </svg>
                  </span>
                  <span className="slds-media__body">
                    <span className="slds-truncate" title={option}>{option}</span>
                  </span>
                </span>
              </li>
    })
  }

  render(){
    var classes = "slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click";
    if(this.state.isOpen) classes += " slds-is-open";

  return <div className="slds-form-element slds-m-bottom_small pickList">

            { this.props.label ? <label className="slds-form-element__label" htmlFor="combobox-unique-id">{this.props.label}</label> : null }

            <div className="slds-form-element__control">
              <div className="slds-combobox_container slds-size_small">
                <div onClick={this.onClick.bind(this)} className={classes} aria-expanded="true" aria-haspopup="listbox" role="combobox">
                  <div className="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
                    <input type="text" className="slds-input slds-combobox__input"  autoComplete="off" role="textbox" placeholder={this.props.item || "Select an Option"} readOnly=""/>
                    <span className="slds-icon_container slds-icon-utility-down slds-input__icon slds-input__icon_right" title="Description of icon when needed">
                      <svg className="slds-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                        <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#down" />
                      </svg>
                      <span className="slds-assistive-text">Description of icon</span>
                    </span>
                  </div>
                  <div id="listbox-unique-id" role="listbox">
                    <ul className="slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid" role="presentation">
                      {this.renderItems()}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
  }

}

export default Picklist;

Picklist.demo = function(Highlight){
  return <div>
    <Picklist
      errors={null}
      datakey="type"
      item={{}}
      onChange={(key, option) => {console.log(key+"-"+option)}}
      label="En cual tipo calza mejor el proyecto?"
      options={["Residencial","Comercial"]} />

      <Picklist
        errors={null}
        datakey="type1"
        item={{}}
        onChange={(key, option) => {console.log(key+"-"+option)}}
        label="En cual tipo calza mejor el proyecto?"
        options={["Residencial","Comercial"]} />

    <Highlight className='dark'>
      {`<Picklist
        errors={null}
        datakey="type"
        item={{}}
        onChange={(key, option) => {console.log(key+"-"+option)}}
        label="En cual tipo calza mejor el proyecto?"
        options={["Residencial","Comercial"]} />`}
    </Highlight>
  </div>
}




import React from 'react';
import classnames from "classnames"

class MiniLookup extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      open: false
    }
  }

  onOpen(){
    if(this.state.open) this.setState({open: false})
    else this.setState({open: true});
  }

  onClick(e){
    this.setState({open: false});
    this.props.onClick(this.props.field, e.currentTarget.dataset.option)
  }

  renderOptions(){
    var _this = this;
    return this.props.options.map(function(option){
      return <li key={option} onClick={_this.onClick.bind(_this)} data-option={option} role="presentation" className="slds-listbox__item">
        <span className="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta" role="option">
          <span className="slds-media__body">
            <span className="slds-listbox__option-meta slds-listbox__option-meta_entity">{option}</span>
          </span>
        </span>
      </li>
    })
  }

  render(){
    return <div className="slds-form-element">

      <div className="slds-form-element__control">
        <div className="slds-combobox_container slds-has-inline-listbox">
          <div className={classnames("slds-combobox","slds-dropdown-trigger","slds-dropdown-trigger_click","slds-combobox-lookup",{ "slds-is-open": this.state.open } ) } role="combobox">
            <div className="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
              <input
                onClick={this.onOpen.bind(this)}
                type="text"
                className="slds-input slds-combobox__input"
                id="combobox-unique-id"
                aria-autocomplete="list" aria-controls="listbox-unique-id"
                autoComplete="off" role="textbox"
                value={this.props.selected || ""} />
            </div>
            <div id="listbox-unique-id" role="listbox">
              <ul className=" slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid" role="presentation">
                {this.renderOptions()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

}

export default MiniLookup;
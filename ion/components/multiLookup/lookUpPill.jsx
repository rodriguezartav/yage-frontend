import React from 'react';

class LookUpPill extends React.Component{

  constructor(props) {
    super(props);
  }

  onItemSelect(){
    this.props.onItemSelect(this.props.item);
  }

  render(){
    return <span className="slds-pill slds-pill_link">
    <a  className="slds-pill__action" >
    <span className="slds-pill__label">{this.props.label}</span>
  </a>
  <button data-id={this.props.id} onClick={this.props.onRemove} className="slds-button slds-button_icon slds-button_icon slds-pill__remove" title="Remove">
    <svg className="slds-button__icon" aria-hidden="true">
      <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
    </svg>
    <span className="slds-assistive-text">Remove</span>
  </button>
</span>
  }
}

export default LookUpPill;
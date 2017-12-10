import React from 'react';

class LookUpItem extends React.Component{

  constructor(props) {
    super(props);
  }

  onItemSelect(){
    this.props.onItemSelect(this.props.item);
  }

  render(){
    var _this = this;
    return <li onClick={_this.onItemSelect.bind(this)} role="presentation" className="slds-listbox__item">
      <span className="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta " role="option">
        <span className="slds-media__body">
          <span className="slds-listbox__option-meta slds-capitalize slds-listbox__option-meta_entity">{this.props.item[_this.props.principalColumn].toLowerCase()}</span>
        </span>
      </span>
    </li>
  }
}

export default LookUpItem;
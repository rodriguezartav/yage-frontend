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
        <span className="slds-media__figure">
          <span className="slds-icon_container slds-icon-standard-account" title="Description of icon when needed">
            <svg className="slds-icon slds-icon_small" aria-hidden="true">
              <use xlinkHref="/assets/icons/standard-sprite/svg/symbols.svg#account"></use>
            </svg>
          </span>
        </span>
        <span className="slds-media__body">
        <span className="slds-listbox__option-text slds-listbox__option-text_entity">Acme</span>

          <span className="slds-listbox__option-meta slds-listbox__option-meta_entity">{this.props.item[_this.props.principalColumn]}</span>
        </span>
      </span>
    </li>
  }
}

export default LookUpItem;
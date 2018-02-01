import React from 'react'
//import Style from "./style.css";
import classnames from 'classnames';
class IconButtonWithDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  onClick(e){
    //e.preventDefault();
    //e.stopPropagation();
    //this.props.onClick(this.props.icon);
    if(this.state.isOpen) this.setState({ isOpen: false })
    else this.setState({ isOpen: true })
  }

  renderListIcon(item){
    if(item.icon) return <svg className="slds-icon slds-icon_x-small slds-icon-text-default slds-m-right_x-small" aria-hidden="true">
      <use xlinkHref={"/assets/icons/utility-sprite/svg/symbols.svg#"+item.icon}></use>
    </svg>
    else return null;
  }

  render(){
    var _this = this;
    return <div onClick={_this.onClick.bind(_this)} key="help"
    className={classnames("slds-m-left_xx-small","slds-dropdown-trigger","slds-dropdown-trigger_click",{"slds-is-open":this.state.isOpen})}>
    <button class="slds-button slds-button_icon slds-button_icon-border-filled" aria-haspopup="true" title="Show More">
    <svg class="slds-button__icon" aria-hidden="true">
      <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#question"></use>
    </svg>
  </button>
  <div class="slds-dropdown slds-dropdown_left slds-dropdown_small">
    <ul class="slds-dropdown__list" role="menu">
    { (_this.props.items || []).map(function(item){
      return <li key={item[_this.props.field]} className="slds-dropdown__item" role="presentation">
      <a role="menuitem" tabindex="0">
        <span className="slds-truncate">
          {_this.renderListIcon(item)}
          {item[_this.props.field]}
          </span>
      </a>
    </li>
    })}
    </ul>
  </div>
</div>

    }

}

export default IconButtonWithDropdown;




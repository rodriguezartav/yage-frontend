import React from 'react'
//import Style from "./style.css";

class IconButton extends React.Component {

  constructor(props) {
    super(props);
  }

  onClick(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.onClick(this.props.icon);
  }

  render(){
    return <button className={this.props.noBorder ? "noBorder" : ""} onClick={this.onClick.bind(this)}
    className="rodco-icon-button slds-button slds-button_icon" title={this.props.icon}>
  <svg className="slds-m-horizontal_x-small slds-button__icon" aria-hidden="true">
    <use xlinkHref={"/assets/icons/utility-sprite/svg/symbols.svg#"+this.props.icon} />
  </svg>
</button>

    }

}

export default IconButton;




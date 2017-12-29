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
    return <button onClick={this.onClick.bind(this)}
    className="rodco-icon-button slds-button slds-button_icon" title={this.props.icon}>
  <svg className="slds-m-horizontal_x-small slds-button__icon" aria-hidden="true">
    <use xlinkHref={"/assets/icons/utility-sprite/svg/symbols.svg#"+this.props.icon} />
  </svg>
</button>

    }

}

IconButton.demo = function(Highlight){
  return <div>
    <IconButton label="Donde se instalarian los productos?"
      icon="address"
      onClick={null}/>
    <Highlight className='dark'>
      {`<IconButton
      icon="address"
      onClick={undefined}/>`}
    </Highlight>
  </div>
}

export default IconButton;




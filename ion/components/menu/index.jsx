import React from 'react';
import Style from "./style.css";

class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      items: [],
    }
  }

  componentWillMount(){
  }

  componentDidMount(){
    var _this = this;
    this.setState({ items: this.props.items});
  }

  componentWillUnmount(){
  }

  componentWillReceiveProps(nextProps){
    var selectedItem;
    this.setState({ items: nextProps.items });
  }

  onClick(e){
    var open = true;
    if(this.state.isOpen) open=false
    e.preventDefault();
    e.stopPropagation();
    this.setState({isOpen: open})
  }

  onItemSelect(e){
    this.setState({isOpen: false})
    this.props.onSelect(e.currentTarget.dataset.item,this.props.context);
  }


  renderItems(){
    var _this = this;
    return this.props.items.map(function(item){
      return <li key={"menu-"+item} data-item={item} onClick={_this.onItemSelect.bind(_this)} className="slds-dropdown__item" role="presentation">
        <a role="menuitem" >
          <span className="slds-truncate" title="Menu Item One">{item}</span>
        </a>
      </li>
    })
  }

  render(){
    if(!this.props.items || this.props.items.length ==0) return null;

    var isOpen =" slds-is-open"
    var right = "";
    if( !this.state.isOpen ) isOpen = "";
    if(this.props.positionRight) right = " position-right"
    var classes = "menu slds-dropdown-trigger slds-dropdown-trigger_click " + isOpen + right;
    var dropDownClasses = "slds-dropdown";
    if(this.props.positionRight) dropDownClasses += " slds-dropdown_right"
    else dropDownClasses += " slds-dropdown_left"

  return <div onClick={this.onClick.bind(this)}
  className={classes}>
  <button className="slds-button slds-button_icon slds-button_icon-border-filled" aria-haspopup="true" title="Show More">
    <svg className="slds-button__icon" aria-hidden="true">
      <use xlinkHref={"/assets/icons/utility-sprite/svg/symbols.svg#"+(this.props.icon || "down")} />
    </svg>
    <span className="slds-assistive-text">Show More</span>
  </button>
  <div className={dropDownClasses}>
    <ul className="slds-dropdown__list" role="menu">
      {this.renderItems()}
    </ul>
  </div>
</div>
  }

}

Menu.demo = function(Highlight){

  var rows = [
  ]

  return <div>
    <Menu items={rows} onSelectColumn="rowId"  selectedItem={rows[0].id} onSelect={function(){console.log(arguments)}} label={"Buscar"} principalColumn="header"  />
    <Highlight className='dark'>
      {'<LookUp items={rows} onSelectColumn="rowId"  selectedItem={rows[0].id} onSelect={function(){console.log(arguments)}} label={"Buscar"} principalColumn="header"  />'}
    </Highlight>
  </div>
}

export default Menu;

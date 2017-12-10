import React from 'react';
import LookUpItem from "./lookUpItem";
import LookUpPill from "./lookUpPill";
import UI from "./ui";

class MultipleLookUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      items: [],
      searchText: "",
      filteredItems: [],
      selectedItems: []
    }
  }

  componentDidMount(){
    var _this = this;
    UI.updateProps(this.props);
    UI.updateLink(this);
    var selectedItems = [];
    if(this.props.selectedItems) selectedItems = this.props.selectedItems.split(",").map(function(item){
      var id = parseInt(item);
      if(id > 0 == false) id = item;
      return id;
    });
    this.setState({ items: this.props.items, selectedItems: selectedItems });
  }

  componentWillUnmount(){
   UI.updateProps(null);
  }

  componentWillReceiveProps(nextProps){
    UI.updateProps(nextProps);
    var selectedItems = [];
    if(nextProps.selectedItems) selectedItems = nextProps.selectedItems.split(",").map(function(item){
      var id = parseInt(item);
      if(id > 0 == false) id = item;
      return id;
    });
    this.setState({ items: nextProps.items, selectedItems: selectedItems });
  }

  onClose(){
    this.setState({isOpen: false, searchText: "" })
  }

  onOpen(){
    this.setState({isOpen: true, searchText: "",filteredItems: this.state.items })
  }

  onSelectedItemsChange(item){
    var items = this.state.selectedItems;
    if( items.indexOf(item.id) > -1 ) return false;
    items.push(item.id);
    this.setState({isOpen: false, selectedItems: items })
    this.props.onChange( this.props.onSelectColumn, items.join(",") );
  }

  onSearch(e){
    var _this = this;
    var text = e.currentTarget.value;
    var items = [];
    this.state.items.forEach(function(item){
      if( item[_this.props.principalColumn].indexOf(text) > -1 ) items.push(item);
    })
    this.setState({filteredItems: items, isOpen: true, searchText: text });
  }

  onRemovePill(id){
    var selectedItems = this.state.selectedItems;
    var index;
    var count = 0;
    selectedItems.forEach(function(item){
      if(item.id == id) index=count;
      count++;
    })
    selectedItems.splice(index,1);
    this.setState({selectedItems: selectedItems});
    this.props.onChange( this.props.onSelectColumn, selectedItems.join(",") );
  }

  renderItems(){
    var _this = this;
    return this.state.filteredItems.map(function(item){
      return <LookUpItem key={item.id} principalColumn={_this.props.principalColumn} item={item} onItemSelect={_this.onSelectedItemsChange.bind(_this)} />
    })
  }

  renderIcon(){
    if( this.state.isOpen ) return  <button onClick={this.onClose.bind(this)}  className="slds-button slds-button_icon slds-input__icon slds-input__icon_right">
      <svg className="slds-button__icon" aria-hidden="true">
        <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
      </svg>
      <span className="slds-assistive-text">Remove selected option</span>
    </button>
    else return <span onClick={this.onOpen.bind(this)} className="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_right">
        <svg className="slds-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
          <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#search"></use>
        </svg>
        <span className="slds-assistive-text">Description of icon</span>
      </span>
  }

  renderPills(){
    var _this = this;
    var pills = [];
    var items = this.state.items;
    items.forEach(function(item){
      if( _this.state.selectedItems.indexOf(item.id) > -1 ) pills.push(<LookUpPill key={item.id} onRemove={_this.onRemovePill.bind(_this)} label={item[_this.props.principalColumn]} id={item.id} />);
    })
    return pills;
  }

  render(){
    var isOpen =" slds-is-open"
    if( !this.state.isOpen ) isOpen = "";

    return <div className="slds-form-element">
      <label className="slds-form-element__label" htmlFor="combobox-unique-id">{this.props.label}</label>
      <div className="slds-form-element__control">
        <div className="slds-combobox_container slds-has-inline-listbox">
          <div className={"slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click " + isOpen} aria-expanded="true" aria-haspopup="listbox" role="combobox">
            <div className="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right">
              <input onChange={this.onSearch.bind(this)} type="text" className="slds-input slds-combobox__input" autoComplete="off" role="textbox" placeholder="Buscar" value={ this.state.searchText } />
              {this.renderIcon()}
            </div>
            <div id="listbox-unique-id" role="listbox">
              <ul className="slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid" role="presentation">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="slds-box slds-box_xx-small slds-m-bottom_small">
        {this.renderPills()}
      </div>
    </div>
  }

}

MultipleLookUp.demo = function(Highlight){

  var rows = [
    {id: 1, "header":"abcd"},
    {id: 2,"header":"dedfgh"},
    {id: 3,"header":"hjkl"},
    {id: 4,"header":"lpoiu"},
    {id: 5,"header":"uytre"},
    {id: 6,"header":"ytrew"},
    {id: 7,"header":"qazxc"},
    {id: 8,"header":"qxcvb"}
  ]

  return <div>
    <MultipleLookUp items={rows} onSelectColumn="rowId" onChange={function(name,value){ rows[0][name] = value }} label={"Buscar"} principalColumn="header"  />
    <Highlight className='dark'>
      {'<LookUp items={rows} onSelectColumn="rowId" selectedItems={rows[0].id} onChange={function(name,value){ rows[0][name] = value }} label={"Buscar"} principalColumn="header"  />'}
    </Highlight>
  </div>
}

export default MultipleLookUp;

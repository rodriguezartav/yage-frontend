import React from 'react';
import UI from "./ui";
import LookUpItem from "./lookUpItem"
import Data from "./data";
import AutoForm from "../autoForm";
import NewModal from "../newModal";


class DataLookup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      items: [],
      searchText: "",
      filteredItems: [],
      selectedItem: null
    }
  }

  componentWillMount(){
    Data.load(this);
  }

  componentDidMount(){
    var _this = this;
  }

  componentWillUnmount(){
  }

  componentWillReceiveProps(nextProps){
    var _this = this;
    var selectedItem;
    this.state.items.forEach(function(item){ if(item[_this.props.itemKey] == nextProps.selectedItem) selectedItem = item })
    this.setState({ selectedItem: selectedItem });
  }

  onNew(){
    this.setState({showModal: true})
  }

  onSaveModal(result){
    Data.load(this);
    this.props.onSelect(this.props.onSelectColumn, result[this.props.itemKey] , result);
    this.setState({ showModal:false });
  }

  onHideModal(){
    this.setState({showModal: false});
  }

  onClose(){
    this.setState({isOpen: false, selectedItem: null, searchText: "" })
    this.props.onSelect(this.props.onSelectColumn, null);
  }

  onItemSelect(item){
    this.setState({isOpen: false, selectedItem: item})
    this.props.onSelect(this.props.onSelectColumn, item[this.props.itemKey] , item);
  }

  onSearch(e){
    var _this = this;
    var text = e.currentTarget.value.toLowerCase();
    var items = [];
    this.state.items.forEach(function(item){
      var itemValue = item[_this.props.principalColumn];
      if(itemValue){
        itemValue =itemValue.toLowerCase();
        if( itemValue.indexOf(text) > -1 ) items.push(item);
      }
    })
    this.setState({filteredItems: items, isOpen: true, selectedItem: null, searchText: text });
  }

  renderModal(){
    if(!this.state.showModal) return null;
    return <NewModal
      route={this.props.column.route}
      onSave={this.onSaveModal.bind(this)}
      onClose={this.onHideModal.bind(this)}
      title={"Crear " + this.props.label}
    />
  }

  renderItems(){
    var _this = this;
    return this.state.filteredItems.map(function(item){
      if( _this.props.LookUpItem ){
        var Item = _this.props.LookUpItem;
        return <Item key={item.id} item={item} onItemSelect={_this.onItemSelect.bind(_this)} />
      }
      return <LookUpItem key={item.id} principalColumn={_this.props.principalColumn} item={item} onItemSelect={_this.onItemSelect.bind(_this)} />
    })
  }

  renderIcon(){
    if( this.state.isOpen || this.state.selectedItem ) return  <button onClick={this.onClose.bind(this)}  className="slds-button slds-button_icon slds-input__icon slds-input__icon_right">
      <svg className="slds-button__icon" aria-hidden="true">
        <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
      </svg>
    </button>
    else return <button onClick={this.onNew.bind(this)}  className="slds-button slds-button_icon slds-input__icon slds-input__icon_right">
      <svg className="slds-button__icon" aria-hidden="true">
        <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#add"></use>
      </svg>
    </button>
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
              <input onChange={this.onSearch.bind(this)} type="text" className="slds-input slds-combobox__input" autoComplete="off" role="textbox" placeholder="Buscar" value={ this.state.selectedItem ? this.state.selectedItem[this.props.principalColumn].toLowerCase() : this.state.searchText } />
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
      {this.renderModal()}
    </div>
  }

}

DataLookup.demo = function(Highlight){

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
    <DataLookup items={rows} onSelectColumn="rowId"  selectedItem={rows[0].id} onSelect={function(){console.log(arguments)}} label={"Buscar"} principalColumn="header"  />
    <Highlight className='dark'>
      {'<DataLookup items={rows} onSelectColumn="rowId"  selectedItem={rows[0].id} onSelect={function(){console.log(arguments)}} label={"Buscar"} principalColumn="header"  />'}
    </Highlight>
  </div>
}

export default DataLookup;

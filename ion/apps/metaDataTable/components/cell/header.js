import React, {PureComponent} from 'react';
import moment from "moment";
import UI from "../../ui";
import IconButton from "../../../../components/iconButton";


class HeaderCell extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onSort(e){
   var sortBy = e.currentTarget.dataset.col;
   UI.onSortBy(sortBy);
  }

  onFilter(){
    var text = this.refs.txt_filter.value;
    UI.onFilter(this.props.column, text);
  }

  toggleSearch(){
    var _this = this;
    if( this.state.isSearching ) return this.setState({isSearching: false})
    this.setState({isSearching: true})
    setTimeout( function(){ _this.refs.txt_filter.focus(); }, 50 );
  }

  onDelete(){
    this.setState({isSearching: false})
    this.refs.txt_filter.value = "";
    UI.onFilter(this.props.column, null);
  }

  renderContent(){
    if(this.state.isSearching) return <input
        onChange={this.onFilter.bind(this)}
        ref="txt_filter"
        className="slds-input"
        style={{ minHeight:"auto",lineHeight: 0, padding: 0, paddingLeft: 3, width: "95%",position: "absolute", left:3, top: 1, bottom: 1 }}/>
    return <div className="header-cell-label">{this.props.column.title}</div>
  }

  renderIcons(){

    if( this.state.isSearching ) return <button onClick={this.onDelete.bind(this)} className="slds-m-left_xx-small slds-button slds-float_right slds-button_icon" title="Buscar">
      <svg className="slds-button__icon" aria-hidden="true">
        <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
      </svg>
    </button>

    return <div className="slds-float_right"><button onClick={this.toggleSearch.bind(this)} data-col={this.props.column.title}  className="slds-m-left_xx-small slds-button  slds-button_icon" title="Buscar">
      <svg className="slds-button__icon" aria-hidden="true">
        <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#search"></use>
      </svg>
    </button>

    <button onClick={this.onSort.bind(this)} data-col={this.props.column.name}  className="slds-button slds-button_icon" title="Ordenar">
      <svg className="slds-button__icon" aria-hidden="true">
        <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#sort"></use>
      </svg>
    </button>
    </div>

  }

  renderHeaderCol(column, style){
    if( style.width > 0 == false ) return null;

   return <div key={"header-" + column.name} style={style} className="slds-col header-cell ">
    <div className={"header-cell-style slds-truncate header-cell-style_"+column.type}>
      {this.renderContent()}

      {this.renderIcons()}

    </div>
    </div>
  }

  render(){
    return this.renderHeaderCol(this.props.column,this.props.style);
  }
}


export default HeaderCell


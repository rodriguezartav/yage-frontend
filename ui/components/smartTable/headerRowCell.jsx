import React from 'react'
import UI from "./ui";

class HeaderRowCell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: "title"
    }
  }

  onSearch(){
    this.setState({mode: "search"})
  }

  onSearchCancel(){
   this.setState({mode: "title"})
   UI.onSearchCancel();
  }

  onSearchChange(e){
    var text = e.currentTarget.value;
    UI.onSearch(text, e.currentTarget.dataset.col);
  }

  onSort(e){
    UI.onSort(e.currentTarget.dataset.col);
  }

  renderSearchState(col){
    return <th className="header-cell_in-search-mode___th" scope="col" key={"header:" + col.title}>
      <div className="slds-form-element header-cell header-cell_in-search-mode" >
        <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon_right">
          <svg onClick={this.onSearchCancel.bind(this)} className="slds-icon slds-input__icon slds-input__icon_right slds-icon-text-default" aria-hidden="true">
            <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
          </svg>
          <input  data-col={col.title} onChange={this.onSearchChange.bind(this)} type="text" className="slds-input" placeholder={col.label || col.title} />
        </div>
      </div>

    </th>
  }

  renderTitleState(col){
    var title = col.label || col.title;
    return <th scope="col" key={"header:" + col.title}>
      <div className={"header-cell slds-truncate header-cell-style_"+col.type}>
        <div className="" style={{width: "50%", overflow: "hidden", float: "left"}}>{title}</div>

        <button data-col={col.title} onClick={this.onSearch.bind(this)} className="slds-m-left_xx-small slds-button slds-float_right slds-button_icon" title="Provide description of action">
          <svg className="slds-button__icon" aria-hidden="true">
            <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#search"></use>
          </svg>
          <span className="slds-assistive-text">Provide description of action</span>
        </button>

        <button data-col={col.title} onClick={this.onSort.bind(this)} className="slds-button slds-float_right slds-button_icon" title="Provide description of action">
          <svg className="slds-button__icon" aria-hidden="true">
            <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#sort"></use>
          </svg>
          <span className="slds-assistive-text">Provide description of action</span>
        </button>

      </div>

    </th>
  }

  render(){
    if(this.state.mode == "title") return this.renderTitleState(this.props.col);
    else return this.renderSearchState(this.props.col);
  }

}

export default HeaderRowCell;

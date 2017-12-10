import React from 'react';
import ContentRow from './contentRow';
import UI from "./ui";

class SmartTable extends React.Component {

  constructor(props) {
    super(props);
  }

  onGroupClick(e){
    UI.onGroupClick(this.props.rows);
  }

  renderGroupTitle(){
    var _this = this;
    var actions = (this.props.groupActions || []).map(function(action){
      return  <button key={"groupbutton_" + action} onClick={_this.onGroupClick.bind(_this)} className="slds-button slds-button_icon slds-button_icon-border" >
        <svg className="slds-button__icon" aria-hidden="true">
          <use xlinkHref={"/assets/icons/utility-sprite/svg/symbols.svg#"+action}></use>
        </svg>

      </button>
      })
    return <div className=" slds-m-top--large slds-p-top_xx-small slds-p-horizontal_x-small slds-border_all" style={{height: 40}}>
      <span className="slds-badge smart-table-group_name">{this.props.groupName}</span>
      <div className="slds-float_right">{actions}</div>
    </div>
  }

  renderRows(){
    var _this = this;
    return this.props.rows.map(function(row){
      return <ContentRow rowActions={_this.props.rowActions} key={"row:" + row.id} principalColumn={_this.props.principalColumn} groupBy={_this.props.groupBy}  isHeader={_this.props.isHeader} groupBy={_this.props.groupBy} principalColumn={_this.props.principalColumn} row={row} columns={_this.props.columns} />
    });
  }

  render(){
    return <div className="table-wrapper">

    {this.renderGroupTitle()}

    <table className="slds-table slds-table_bordered slds-table_cell-buffer slds-table_col-bordered">
      <thead>
      <tr className="slds-text-title_caps">

      </tr>
      </thead>
      <tbody>
        {this.renderRows()}
      </tbody>
    </table>
    </div>
  }
}
  export default SmartTable;

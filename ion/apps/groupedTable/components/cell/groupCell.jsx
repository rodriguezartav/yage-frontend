import React, {PureComponent} from 'react';
import moment from "moment";
import UI from "../../ui";
import IconButton from "../../../../components/iconButton";
import classnames from "classnames";
import Ops from "../../business/ops";
import numeral from "numeral"

class Cell extends React.PureComponent {

  constructor(props) {
    super(props);
  }


  onGroupHeaderClick(){
    if(this.props.isStatic) UI.onGroupHeaderClick(this.props.row.header, true);
  }


  onClick(e){
    UI.onRowClick(this.props.row.id)
  }

  onChecked(e){
    UI.onGroupSelected(this.props.row);
  }

  renderIcon(){
    var _this = this;
    var actions = this.props.listColumnsActions || [];
    if( this.props.scrollingY || actions.length == 0) return null;
    return <div className={classnames({"not-editing": !this.state.editing ,"editing": this.state.editing })} style={{position: "absolute", right: 3, top: 5}}>
      <IconButton noBorder="true" onClick={ _this.onIconClick.bind(_this) } icon="switch" />
    </div>
  }

  renderView(){
    var _this = this;
    if(!this.props.isStatic){
      if( this.props.row._headerOptions.hasTitle && ( this.props.column.type =="integer" || this.props.column.type == "number" ) && this.props.column.totalize ){
        return <div className="slds-text-align_right slds-text-title">{numeral(this.props.column.total).format("0,0.00")}</div>;
      }
      return null;
    }

    if(!this.props.row._headerOptions || !this.props.row._headerOptions.hasTitle) return null;

    return <div  className="" ref="src_icon_wrapper" style={{ position: "relative" }}>
      <div className="slds-truncate text-button ">
        <span className="slds-badge_wrapper">
          {this.props.row.isClosed ?
            <IconButton onClick={this.onGroupHeaderClick.bind(this)} noBorder="true" icon="switch" />
          : <input
            checked={this.props.row._headerOptions.selected ? "checked" : null}
            onChange={this.onChecked.bind(this)}
            className="slds-m-right_small" type="checkbox"  />
          }
          <span className={"slds-badge color" + this.props.row._headerOptions.index}>{this.props.row._headerOptions.name}</span>
        </span>
        {this.props.row.isClosed ?
        <span className="slds-m-right_small slds-float_right group-cell-header-count">
          <span className="slds-text-title group-cell-header-count-title">{this.props.row._headerOptions.count > 0 ? "Count " : ""}</span>
          <span className="slds-text-title">{this.props.row._headerOptions.count}</span>
          </span>
          : null }
      </div>

    </div>
  }



  getColor(){
    var sortedbyValue = this.props.sortedBy;
    if( !sortedbyValue ) return "color0";
    var groupFieldDetails = this.props.groupFields.details[sortedbyValue.formatValue];
    if(!groupFieldDetails) return "color0";
    return "color"+groupFieldDetails.index;
  }

  render(){
    var classes = "slds-col group-cell"
    if(this.props.row.header && this.props.isStatic) classes +=  " group-cell-static-header ";
    if(this.props.row.isClosed && this.props.isStatic ) classes += " group-cell-header_closed"
    if(this.props.row.header && !this.props.isStatic) classes +=  " group-cell-header ";

    return <div
      style={this.props.style}
      className={classes}
      onClick={this.onGroupHeaderClick.bind(this)}
    >
    {this.renderView()}
    </div>
  }
}

export default Cell

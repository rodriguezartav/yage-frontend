import React, {PureComponent} from 'react';
import moment from "moment";
import UI from "../../ui";
import IconButton from "../../../../components/iconButton";
import classnames from "classnames";
import Ops from "../../business/ops";

class Cell extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  onClick(e){
    UI.onRowClick(this.props.row.id)
  }

  onChecked(e){
    UI.onRowSelected(this.props.row.id);
  }

  render(){
    var _this = this;
    var value = this.props.row[this.props.column.name];
    var classes = "slds-col content-cell slds-truncate content-static-cell"

    return <div
      style={this.props.style}
      className={classes}
    >
      <div className="" ref="src_icon_wrapper" style={{ position: "relative" }}>

        <div className="slds-truncate text-button">

          <input checked={this.props.isSelected ? "checked" : null} onChange={this.onChecked.bind(this)} className="slds-m-right_small" type="checkbox"  />
          <a onClick={this.onClick.bind(this)}>{ value ? value.formatValue : "" }</a>
          </div>

      </div>

    </div>
  }
}

export default Cell

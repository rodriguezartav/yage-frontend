import React, {PureComponent} from 'react';
import moment from "moment";
import UI from "../../ui";
import Toggle  from '../../../../components/toggle';

import DateCell from "./cells/dateCell"
import BooleanCell from "./cells/booleanCell"
import StringCell from "./cells/stringCell"
import RadioCell from "./cells/radioCell"
import SelectCell from "./cells/selectCell"
import RelationCell from "./cells/relationCell"
import ListCell from "./cells/listCell"
import NumberCell from "./cells/numberCell"
import IntegerCell from "./cells/integerCell"
import TextCell from "./cells/textCell"
import ArrayList from "./cells/arrayListCell";
import JsonbPhoto from "./cells/jsonbPhotoCell";

import BaseCell from "./cells/base"

class Cell extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render(){
    var _this = this;
    var type = this.props.column.type || "string"
    var MappedCell = map[type];
    if( MappedCell ) return <MappedCell {...this.props} />

    return <div
      onClick={ function(){ console.log(_this.props) } }
      data-id={this.props.row.id}
      style={this.props.style}
      className="slds-col "
    >
      <div className="content-cell slds-truncate">
        {this.props.row[this.props.column.name].formatValue}
      </div>
    </div>
  }
}


var map = {
  "timestamp": BaseCell(DateCell),
  "date": BaseCell(DateCell),
  "boolean": BaseCell(BooleanCell),
  "string": BaseCell(StringCell),
  "text": BaseCell(StringCell),
  "select": BaseCell(SelectCell),
  "radio": BaseCell(RadioCell),
  "relation": BaseCell(RelationCell),
  "list": BaseCell(ListCell),
  "number": BaseCell(NumberCell),
  "integer": BaseCell(IntegerCell),
  "text": BaseCell(TextCell),
  "arrayList":BaseCell(ArrayList),
  "jsonbPhoto":BaseCell(JsonbPhoto)

}

export default Cell


import React, {PureComponent} from 'react';
import moment from "moment";
import UI from "../../../ui";
import Toggle  from '../../../../../components/toggle';


class BooleanCell extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  onToggle(name, value){
    UI.updateField( this.props.row,this.props.column,value );
    this.props.stopEditing();
  }

  renderEdit(){
    var value = this.props.row[this.props.column.name];
    return  <div><Toggle
      onChange={this.onToggle.bind(this)}
      name={"edit" + this.props.column.name + this.props.row.id}
      operation={"edit"}
      isEnabled={value.objectClass.isTrue()}
       />
    </div>
  }

  renderView(){
    var value = this.props.row[this.props.column.name];
    return <div onClick={this.props.onClick}>{ value.formatValue }</div>
  }

  render(){
    if(this.props.editing) return this.renderEdit()
    else return this.renderView()
  }
}

export default BooleanCell

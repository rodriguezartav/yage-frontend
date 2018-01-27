import React, {PureComponent} from 'react';
import UI from "../../../ui";

class RelationCell extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  renderView(){
    var value = this.props.row[this.props.column.name];
    var view = value.formatValue;
    if( value.formatValue != "Admin" ) view = <a>{ value.formatValue }</a>;
    return <div onClick={this.props.onClick}>{view}</div>
  }

  render(){

    return <div>
      { this.props.editing ? this.renderEdit() : this.renderView() }
    </div>
  }
}


export default RelationCell

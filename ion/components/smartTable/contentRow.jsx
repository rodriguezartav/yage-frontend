import React from 'react';
import ContentCell from './contentCell';

class ContentRow extends React.Component {

  constructor(props) {
    super(props);
  }

  renderCells(row){
    var _this = this;
    var cells = []
    this.props.columns.map(function(column){

      if( !_this.props.isHeader && column.title == _this.props.principalColumn ) return null;


      if( _this.props.isHeader && cells.length == 0 && _this.props.principalColumn == column.title){
        cells.push(<ContentCell rowActions={_this.props.rowActions} isHeader={true} key={"cellp:" + row.id + "_" + column.title} row={row} column={column} />);
      }
      else if(!_this.props.isHeader){
        cells.push(<ContentCell  key={"celll:" + row.id + "_" + column.title} row={row} column={column} />);
      }
    })
    return cells;
  }

  render(){
    return <tr>
      {this.renderCells(this.props.row)}
    </tr>
  }

}
  export default ContentRow;

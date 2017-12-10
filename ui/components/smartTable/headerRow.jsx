import React from 'react';
import HeaderRowCell from './headerRowCell';

class HeaderRow extends React.Component {

  constructor(props) {
    super(props);
  }

  renderCols(){
    var _this = this;
    return this.props.columns.map(function(col){

      if( _this.props.isHeader && _this.props.principalColumn == col.title ){
        return <HeaderRowCell key={"header-row-cell" + col.title} col={col} />
      }
      else if( !_this.props.isHeader && _this.props.principalColumn != col.title){
        return <HeaderRowCell  key={"header-row-cell" + col.title} col={col} />
      }

    })
  }

  render(){
    var _this = this;
    return <table  className="slds-table slds-table_bordered slds-table_cell-buffer slds-table_col-bordered">
    <thead>
        <tr className="slds-text-title_caps">
          {this.renderCols()}
        </tr>
      </thead>
    </table>
  }
}
  export default HeaderRow;

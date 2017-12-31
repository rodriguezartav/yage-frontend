import React from 'react';
import reformed from './reformed'
import compose from 'react-reformed/lib/compose'
import Toogle from '../toggle';
import ButtonBar from '../buttonBar';
import Lookup from '../lookup';
import MultiLookup from '../multiLookup';
import BpPromise from 'bluebird';
import validateSchema from 'react-reformed/lib/validateSchema'
import classnames from 'classnames'
import DatePicker from '../datepicker';
import moment from 'moment';
import Style from "./style.css";
import DataLookup from "../dataLookup"
import FormElement from "./formElement"


class AutoForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rowId: null
    }
  }

  setProperty(colName, value){
     this.props.setProperty(colName, value)
   }

   renderElements(){
      var _this=this;
      var columnMap ={};
      _this.props.columns.forEach(function(col){
        columnMap[col.name] = col;
      })

      var formElements = [];
      if( !_this.props.columnViews || _this.props.columnViews.length == 0 ) return formElements;

      formElements = _this.props.columnViews.map(function(columnView){
        if( !columnMap[columnView] ) return <div key={columnView}
          className="slds-text-heading_small slds-m-vertical_small slds-size--1-of-1 slds-col">
            {columnView}
          </div>
        var col = columnMap[columnView];

        if(col.name=="photos") return null;
        return <FormElement
          key={col.name}
          model={_this.props.model}
          column={col}
          setProperty={_this.setProperty.bind(_this)}
          viewHeight={_this.props.height}
          />
      })
      return formElements;
   }

  render(){
    var _this=this;

    return <div>
      <div className="smart-form" style={{height: this.props.height}} >
      <div className="slds-scrollable_y" style={{ height: this.props.height }} >
      <div className="slds-grid slds-p-left_small  slds-p-right_small slds-wrap">
      {this.renderElements()}
      </div>
      {this.props.children}
      </div>
      </div>

        </div>
  }
}

var AutoFormRef = reformed()(AutoForm);

export default AutoFormRef

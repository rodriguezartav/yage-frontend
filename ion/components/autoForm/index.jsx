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
import {debounce} from 'throttle-debounce';

class AutoForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rowId: null
    }
    this.callAjax = debounce(500, this.updateFieldOnChange );
  }

  updateFieldOnChange(col,row){
    var _this = this;
    console.log("pinting",col,row)
    this.props.onFieldUpdate(col,row)
    .then(function(result){
       var keys = Object.keys(result);
       keys.forEach(function(key){
         console.log("updating ",key,row[key],result[key])
         _this.props.setProperty(key, result[key]);
       })
     })
  }

  setProperty(colName, value, row){
    var _this = this;
     this.props.setProperty(colName, value)
     var columnMap ={};
     _this.props.columns.forEach(function(col){ columnMap[col.name] = col; })
     var col = columnMap[colName];

     row[colName] = value;
     if(row && col && col.pingOnChange ) this.callAjax(col,row)
     if(this.props.onUpdate) this.props.onUpdate();
   }

   renderElements(){
      var _this=this;
      var columnMap ={};
      _this.props.columns.forEach(function(col){ columnMap[col.name] = col; })

      var formElements = [];
      if( !_this.props.columnViews || _this.props.columnViews.length == 0 ) return formElements;

      formElements = _this.props.columnViews.map(function(columnView){
        if( !columnMap[columnView] ) return <div key={columnView}
          className="slds-text-heading_small slds-size--1-of-1 slds-m-vertical_small">
            {columnView}
          </div>
        else if(   columnMap[columnView].type =="label") return <div key={columnView}
          className="slds-text-heading_small slds-size--1-of-1 slds-m-vertical_small">
            {columnMap[columnView].title}
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

    if( this.props.columns.length ==0 ) return  <img className={"rotate"} style={{height: 30}} src="./assets/images/ion.svg" alt="" />

    return <div>
      <div className="smart-form" style={{height: this.props.height}} >
      <div className="slds-scrollable_y" style={{ height: this.props.height }} >
      <div className="slds-p-left_small slds-grid  slds-p-right_small slds-wrap">
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

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
import HtmlEditor from "./elements/html";

class FormElement extends React.Component {

  constructor(props) {
    super(props)
  }

  onChangeInput(e){
    this.props.setProperty(e.currentTarget.dataset.col, e.target.value, this.props.model)
   }

   onChangeHTML(name,value){
      this.props.setProperty(name, value, this.props.model);
    }

  onChangeInputNumber(e){
    this.props.setProperty(e.currentTarget.dataset.col, parseFloat(e.target.value),this.props.model)
  }

  onChangeBooleanInput(name,checked){
    this.props.setProperty(name,checked,this.props.model);
  }

  onChangeList(name, itemId){
    this.props.setProperty(name,itemId,this.props.model);
  }

  renderInputByType(col){

    var value = this.props.model[col.name];
    var colType = col.type;
    if(colType == "relation") colType = col.editType;

    if(!colType) colType = "text";

    if(colType =="label") return null;
    else if(colType == "number") return <input
      data-col={col.name}
      onChange={this.onChangeInputNumber.bind(this)}
      value={value}
      type="number"
      className="slds-input slds-m-bottom_small"
    />
    if(colType == "datalookup") return <DataLookup
      data-col={col.name}
      itemKey={col.itemKey}
      route= {col.route}
      view= {col.view}
      column={col}
      principalColumn={col.principalColumn}
      onSelectColumn={col.name}
      onSelect={ this.onChangeList.bind(this) }
      selectedItem={ value }
      viewHeight={this.props.viewHeight}
    />
    else if(colType == "textarea") return <textarea
      data-col={col.name}
      onChange={this.onChangeInput.bind(this)}
      value={value||""}
      type="number"
      className="slds-input slds-m-bottom_small"
    />
    else if(colType == "lookup" || colType == "select") return <Lookup
      items={col.items||col.options}
      data-col={col.name}
      principalColumn={col.principalColumn}
      onSelectColumn={col.name}
      onSelect={ this.onChangeList.bind(this) }
      selectedItem={ value }
    />
    else if(colType == "multilookup"){
        return <MultiLookup
        items={col.items}
        data-col={col.name}
        principalColumn={col.principalColumn}
        onSelectColumn={col.name}
        onChange={ this.onChangeList.bind(this) }
        selectedItems={ value }
      />
    }
    else if(colType == "date") return <input
      data-col={col.name}
      onChange={this.onChangeInput.bind(this)}
      value={moment(value).format("YYYY-MM-DD")}
      type="date"
      className="slds-input slds-m-bottom_small"
    />
    else if(colType == "boolean") return <Toogle
      name={col.name}
      isEnabled={value}
      onChange={this.onChangeBooleanInput.bind(this)}
    />
    else if(colType == "radio") return <ButtonBar
      errors={null}
      datakey={col.name}
      value={value}
      onChange={this.onChangeBooleanInput.bind(this)}
      options={col.options} />
    else if(colType == "html") return <HtmlEditor
      datakey={col.name}
      errors={null}
      value={value}
      onChange={this.onChangeHTML.bind(this)}
      options={col.options} />
    else return <input
      data-col={col.name}
      onChange={this.onChangeInput.bind(this)}
      value={value||""}
      type={colType || "text"}
      className="slds-input slds-m-bottom_small"
    />
  }

  render(){
    var col = this.props.column;
    if(col.type == "hidden") return null;
    var _this=this;
    var classError = "";
    var label = <label className="slds-form-element__label" htmlFor="input-unique-id">{col.title}</label>;
    var classes = classnames(
      "slds-col slds-p-left_small slds-form-element slds-m-top_xx-small",
      classError,
      {"slds-size--1-of-1 ": (!col.size || col.size=="full")},
      {"slds-size--1-of-2": col.size=="half"},
      {"slds-size--1-of-3": col.size=="third"}
    );

    return <div className={classes} >
      {  label }
      <div className="slds-form-element__control">
        {_this.renderInputByType(col)}
      </div>
    </div>
  }

};

export default FormElement;

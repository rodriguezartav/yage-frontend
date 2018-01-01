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

class FormElement extends React.Component {

  constructor(props) {
    super(props)
  }

  onChangeInput(e){
     this.props.setProperty(e.currentTarget.dataset.col, e.target.value)
   }

  onChangeInputNumber(e){
    this.props.setProperty(e.currentTarget.dataset.col, parseFloat(e.target.value))
  }

  onChangeBooleanInput(name,checked){
    this.props.setProperty(name,checked);
  }

  onChangeList(name, itemId){
    this.props.setProperty(name,itemId);
  }

  renderInputByType(col){
    var value = this.props.model[col.name];
    var colType = col.type;
    if(colType == "relation") colType = col.editType;

    if(!colType) colType = "text";
    if(colType == "number") return <input
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
    else if(colType == "lookup") return <Lookup
      items={col.items}
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
      label={col.name}
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

    return <div className={classnames("slds-col slds-p-left_small slds-size--1-of-3 slds-form-element", classError)} >
      { col.type == "radio" ? "" : label }
      <div className="slds-form-element__control">
        {_this.renderInputByType(col)}
      </div>
    </div>
  }

};

export default FormElement;

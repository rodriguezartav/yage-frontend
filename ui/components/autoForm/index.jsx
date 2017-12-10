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

class AutoForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rowId: null
    }
  }

  onSubmit(e){
    var _this = this;
    e.preventDefault();
    var keys = Object.keys(this.props.model);
    keys.forEach(function(key){
      if(key.indexOf(".")>-1 && _this.props.model[key]){
        var parts = key.split(".");
        if(!_this.props.model[parts[0]]) _this.props.model[parts[0]] = {};
        _this.props.model[parts[0]][parts[1]] = _this.props.model[key];
        delete _this.props.model[key];
      }
    })
    this.props.onSubmit(this.props.model)
  }

  onChangeInput(e){
     this.props.setProperty(e.currentTarget.dataset.col, e.target.value)
   }

  onChangeBooleanInput(name,checked){
    this.props.setProperty(name,checked);
  }

  onChangeList(name, itemId){
    this.props.setProperty(name,itemId);
  }

  onActionClick(e){
    this.props.onActionClick(this.state.rowId, e.currentTarget.dataset.action)
  }

  renderInputByType(col){
    var value = this.props.model[col.title];

    if( col.title.indexOf(".") > -1 ){
      var parts = col.title.split(".");
      if(!this.props.model[parts[0]]) value = '';
      else{
        value = this.props.model[parts[0]][parts[1]];
      }
    }

    if(!col.type) col.type = "text";
    if(col.type == "number") return <input
      data-col={col.title}
      onChange={this.onChangeInput.bind(this)}
      value={value}
      type="number"
      className="slds-input slds-m-bottom_small"
    />
    if(col.type == "datalookup") return <DataLookup
      data-col={col.title}
      itemKey={col.itemKey}
      route= {col.route}
      view= {col.view}
      principalColumn={col.principalColumn}
      onSelectColumn={col.title}
      onSelect={ this.onChangeList.bind(this) }
      selectedItem={ value }
    />
    else if(col.type == "textarea") return <textarea
      data-col={col.title}
      onChange={this.onChangeInput.bind(this)}
      value={value}
      type="number"
      className="slds-input slds-m-bottom_small"
    />
    else if(col.type == "lookup") return <Lookup
      items={col.items}
      data-col={col.title}
      principalColumn={col.principalColumn}
      onSelectColumn={col.title}
      onSelect={ this.onChangeList.bind(this) }
      selectedItem={ value }
    />
    else if(col.type == "multilookup"){
        return <MultiLookup
        items={col.items}
        data-col={col.title}
        principalColumn={col.principalColumn}
        onSelectColumn={col.title}
        onChange={ this.onChangeList.bind(this) }
        selectedItems={ value }
      />
    }
    else if(col.type == "date") return <input
      data-col={col.title}
      onChange={this.onChangeInput.bind(this)}
      value={moment(value).format("YYYY-MM-DD")}
      type="date"
      className="slds-input slds-m-bottom_small"
    />
    else if(col.type == "boolean") return <Toogle
      name={col.title}
      isEnabled={value}
      onChange={this.onChangeBooleanInput.bind(this)}
    />
    else if(col.type == "radio") return <ButtonBar
      errors={null}
      datakey={col.title}
      value={value}
      onChange={this.onChangeBooleanInput.bind(this)}
      label={col.name}
      options={col.options} />
    else return <input
      data-col={col.title}
      onChange={this.onChangeInput.bind(this)}
      value={value}
      type={col.type || "text"}
      className="slds-input slds-m-bottom_small"
    />
  }

  renderFormElement(col){
    var _this=this;
    var classError = "";
    var label = <label className="slds-form-element__label" htmlFor="input-unique-id">{col.name}</label>;

    return <div key={col.title} className={classnames("slds-col slds-p-left_small slds-size--1-of-3 slds-form-element", classError)} >
      { col.type == "radio" ? "" : label }
      <div className="slds-form-element__control">
        {_this.renderInputByType(col)}
      </div>
    </div>
  }

  render(){
    var _this=this;
    var columnMap ={};
    _this.props.columns.forEach(function(col){
      columnMap[col.title] = col;
    })

    var formElements = [];
    if( _this.props.columnViews && _this.props.columnViews.length > 0 ) formElements = _this.props.columnViews.map(function(columnView){
      if( !columnMap[columnView] ) return <div key={columnView}
        className="slds-text-heading_small slds-m-bottom_small slds-size--1-of-1 slds-col">
          {columnView}
        </div>
      var col = columnMap[columnView];

      if(col.title=="photos") return null;
      return  _this.renderFormElement(col);
    })



    return <div>
              <div className="smart-form" style={{height: this.props.height}} >
              <div className="slds-page-header slds-m-bottom_small"  >
                <div className="slds-grid">
                  <div className="slds-col slds-has-flexi-truncate">
                    <div className="slds-media slds-no-space slds-grow">
                      <div className="slds-media__figure">
                        <span className="slds-icon_container slds-icon-standard-user" title="Description of icon when needed">
                          <svg className="slds-icon" aria-hidden="true">
                            <use  xlinkHref="/assets/icons/standard-sprite/svg/symbols.svg#user"></use>
                          </svg>
                        </span>
                      </div>
                      <div className="slds-media__body">
                        <p className="slds-text-title_caps slds-line-height_reset">Record Type</p>
                        <h1 className="slds-page-header__title slds-m-right_small slds-align-middle slds-truncate" >{this.props.initialModel[this.props.principalColumn]}</h1>
                      </div>
                    </div>
                  </div>
                  <div className="slds-col slds-no-flex slds-grid slds-align-top">
                    <div className="slds-button-group" role="group">
                      <button onClick={_this.props.onBack} className="slds-button slds-button_neutral">Cancelar</button>
                      <button key={"save"} onClick={_this.onSubmit.bind(_this)} className="slds-button slds-button_brand">Guardar</button>
                    </div>
                  </div>
                </div>
              </div>
                <div className="slds-scrollable_y" style={{ height: this.props.height }} >
                <div className="slds-grid slds-p-left_small  slds-p-right_small slds-wrap">
                  {formElements}
                </div>
                {this.props.children}
              </div>
              </div>
        </div>
  }
}

var AutoFormRef = reformed()(AutoForm);


AutoFormRef.demo = function(Highlight){

  var validations = {
    header: {
      required: true,
      maxLength: 8,
      // note: you can optionally generate custom errors via `formatError`
      // by providing a string or a function that receives context
      formatError: (context) => {
        // e.g. return a message id for use with `react-intl` or similar
        return `errors.username.${context.condition}`;
      }
    },
    type: {
      // note: my `test` implementation is super basic, `fail` can
      // only be used synchronously. Write your own to suit your needs!
      test: (value, fail) => {
        if (!value || value.length < 5) {
          return fail('Password must be at least 5 characters')
        } else if (value.length > 12) {
          return fail('Password must be no longer than 12 characters')
        }
      }
    }
  }


  var listItems = [{name: "abcd",id: 33},{name: "fggh",id:2}];
  var columns = [{title: "header"},
    {title:"type"},
    {title:"b",type:"date"},
    {title:"c",type: "boolean"},
    {title:"d",type: "number"},
    {title: "radio", options: ["a","b","c"],type:"radio" },
    {title: "option", options: ["l","o","p"],type:"radio" },
    {title: "lookup", items: listItems ,type:"lookup", principalColumn: "name" },
    {title: "multilookup", items: listItems ,type:"multilookup", principalColumn: "name" }
  ]

  var columnViews=["title","type","b","c"];

  var item = { id: 1, "header":"title a","type":"aa","b":"2017-05-05","c": true, "d": 55, "radio": "a", "lookup": 33,multilookup: "33,2" }

  function getItems(id){
    return BpPromise.resolve([{id:1,name:"aaaa",other: "otheritem"},{id:2,name:"bbb",other: "other item"}])
  }

  return <div>
    <AutoFormRef
    columnViews
      height={"500px"}
      onSubmit={function(model){console.log(model)}}
      onBack={() => {console.log("back")}}
      initialModel={item}
      principalColumn="header"
      onActionClick={function(){console.log(arguments)}}
      itemActions={[{name:"save",title: "Guardar"}, {name:"return",title: "Return"}]}
      columns={columns}
      columnViews={columnViews}
    />
    <Highlight className='dark'>
      {'<AutoFormRef data={item} height={"500px"} onSubmit={function(model){console.log(model)}} onBack={() => {console.log("back")}} initialModel={item} principalColumn="header" onActionClick={function(){console.log(arguments)}} itemActions={[{name:"save",title: "Guardar"}, {name:"return",title: "Return"}]} columns={columns} /> '}
    </Highlight>
  </div>
}

export default AutoFormRef

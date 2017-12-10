import React from 'react';
import HeaderRow from './headerRow';
import Table from './table';
import Style from "./style.css";
import UI from "./ui";
import Util from "./util";
import BpPromise from 'bluebird';


class SmartTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      left: 269,
      rowId: null,
      renderChildren: null,
      rows: [],
      rowsMap:{},
      columnsMap: {},
      sortBy: {column: null, direction: 1},
      groupBy: null,
      searchCriteria: null
    }
  }

  onScroll(e){
    //if(this.state.renderChildren) return;
    //document.getElementById("headerRow").style.setProperty("left", (e.target.scrollLeft - 263) * -1 + "px");
  }

  componentWillMount(){
    var columnsMap = {};
    this.props.columns.forEach( function(column){
      columnsMap[column.title] = column;
    })

    this.setState({ renderChildren: this.props.renderChildren, rowId: this.props.initRowId, rows: this.props.rows, rowsMap: this.getRowsMap(this.props.rows), columnsMap: columnsMap, groupBy: this.props.groupBy});
  }

  componentDidMount(){
    UI.updateProps(this.props);
    UI.updateLink(this);
    UI.setSize();
  }

  componentWillUnmount(){
   UI.updateProps(null);
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    this.setState({ renderChildren: nextProps.renderChildren, rowId: nextProps.initRowId, rows: nextProps.rows, rowsMap: this.getRowsMap(nextProps.rows) });
    UI.updateProps(nextProps);
  }

  getRowsMap(rows){
    var rowsMap = {};
    rows.forEach(function(row){
      rowsMap[row.id] = row;
    })
    return rowsMap;
  }

  getRowGroups(){
    var _this = this;

    var rowsByTypes = {}
    this.state.rows.forEach(function(row){
      var value = row[_this.state.groupBy];
      if( _this.state.groupBy && _this.state.groupBy.indexOf(".") > -1 ){
        var parts = _this.state.groupBy.split(".");
        value = row[parts[0]][parts[1]];
      }

      var rowByType = rowsByTypes[ value ];
      if(!rowByType) rowByType = {name: value, rows: [] }
      rowByType.rows.push( row );
      rowsByTypes[ value ] = rowByType;
    })
    return rowsByTypes;
  }

  getRows(rowsByTypes, isHeader){
    var _this = this;

    var keys = Object.keys(rowsByTypes);
    return keys.map(function(key){
      var rows = rowsByTypes[key].rows;
      if(_this.state.sortBy.column) Util.sort(rows, _this.state.sortBy, _this.state.columnsMap[_this.state.sortBy.column] )
      if(_this.state.searchCriteria) rows = Util.filter(rows, _this.state.searchCriteria, _this.state.columnsMap[_this.state.searchCriteria.column] )

      if(isHeader) return <Table
        rowActions={_this.props.rowActions}
        groupActions={_this.props.groupActions}
        key={"table header:" + rowsByTypes[key].name }
        principalColumn={_this.props.principalColumn}
        groupBy={_this.state.groupBy}
        groupName={rowsByTypes[key].name || "Sin Asignar"}
        columns={_this.props.columns}
        rows={rows}
        isHeader={true} />
      else return <Table
        key={"table content:" + rowsByTypes[key].name }
        principalColumn={_this.props.principalColumn}
        groupBy={_this.state.groupBy}
        columns={_this.props.columns}
        rows={rows}
        isHeader={false} />
    })
  }

  renderContent(rowsByTypes){
    var _this = this;
    var Component = this.props.editComponent;
    if(this.props.editValidator) Component = this.props.editValidator(this.props.editComponent);

    if(this.state.renderChildren){
      return <div style={{height: this.state.height}} className="content-container-wrapper content-container-wrapper-full ">
        {React.cloneElement(this.props.children, { height: this.state.height || 300 })}
    </div>
    }
    return <div className="slds-scrollable_x">
      <div id="headerRow" className="content-container-wrapper">
          <HeaderRow columns={this.props.columns}  groupBy={this.state.groupBy} principalColumn={this.props.principalColumn} />
        </div>
        <div className="slds-m-top--xx-large">
          {this.getRows(rowsByTypes,false)}
        </div>
      </div>
  }

  render(){
    console.log("rendering")
    var _this = this;
    var rowsByTypes = this.getRowGroups();

    return <div className="smart-table" style={{height: this.state.height}}>
        <div  className="principal-container slds-border_right">
          <div className="principal-container-wrapper">
            <HeaderRow columns={this.props.columns} groupBy={this.state.groupBy} principalColumn={this.props.principalColumn} isHeader={true}/>
          </div>
          <div className="slds-m-top--xx-large">
            {this.getRows(rowsByTypes,true)}
          </div>
        </div>
        <div  className="content-container">
          {this.renderContent(rowsByTypes)}
      </div>
  </div>
  }
}

SmartTable.demo = function(Highlight){
  var items = [{id:1,name:"a"},{id:2, name:"b"}];
  var itemsMap = {};
  items.forEach(function(s){itemsMap[s.id]=s;})

  var columns = [
    {title: "lookup", items: items, itemsMap: itemsMap ,type:"lookup", principalColumn:"name"},
    {title: "multilookup", items: items, itemsMap: itemsMap, type:"multilookup", principalColumn:"name"},
    {title: "header"},
    {title:"type"},
    {title:"radio",type:"radio", options: ["a","b","c"] },
    {title:"b"},{title:"c"},{title:"d"},{title:"e"},{title:"f"},{title:"g"},{title:"h"},{title:"i"}
  ]

  var rows = [
    {id: 1, "header":"title a", "multilookup":"1,2", "type":"aa","b":"bb","c":"cc","d":"dd","e":"ee","f":"ff","g":"gg","h":"hh","i":"ii","j":33,"lookup":1},
    {id: 2,"header":"title","type":"cc","b":"bb","c":"cc","d":"dd","e":"ee","f":"ff","g":"gg","h":"hh","i":"ii",j:22, "lookup":2},
    {id: 3,"header":"title","type":"aa","b":"bb","c":"cc","d":"dd","e":"ee","f":"ff","g":"gg","h":"hh","i":"ii","j":33,"lookup":1},
    {id: 4,"header":"title","type":"cc","b":"bb","c":"cc","d":"dd","e":"ee","f":"ff","g":"gg","h":"hh","i":"ii",j:22, "lookup":2},
    {id: 5,"header":"title","type":"aa","b":"bb","c":"cc","d":"dd","e":"ee","f":"ff","g":"gg","h":"hh","i":"ii","j":33,"lookup":1},
    {id: 6,"header":"title","type":"cc","b":"bb","c":"cc","d":"dd","e":"ee","f":"ff","g":"gg","h":"hh","i":"ii",j:22,lookup: 2},
    {id: 7,"header":"title","type":"aa","b":"bb","c":"cc","d":"dd","e":"ee","f":"ff","g":"gg","h":"hh","i":"ii","j":33,lookup:1},
    {id: 8,"header":"title","type":"cc","b":"bb","c":"cc","d":"dd","e":"ee","f":"ff","g":"gg","h":"hh","i":"ii",j:22,lookup:2}
  ]

  function getItems(id){
    return BpPromise.resolve([{id:1,name:"aaaa",other: "otheritem"},{id:2,name:"bbb",other: "other item"}])
  }

  var relatedLists= [
    {name: "relatedList 1", items: getItems , columns: [{title: "name"},{title: "other"}]},
  ]

  return <div>
    <SmartTable relatedLists={relatedLists} onGroupClick={function(){console.log(arguments)}} onActionClick={function(){console.log(arguments)}} rowActions={[{name:"test","description":"test"}]} groupActions={["merge","lock"]} rows={rows} groupBy="type" principalColumn="header" columns={columns} />
    <Highlight className='dark'>
      {'Content Header does not work inside a grid like in this sandbox. It will work when used full width.'}<br/>
      {'<SmartTable onGroupClick={function(){console.log(arguments)}} onActionClick={function(){console.log(arguments)}} rowActions={[{name:"test","description":"test"}]} groupActions={["merge","lock"]} rows={rows} groupBy="type" principalColumn="header" columns={columns} />'}
    </Highlight>
  </div>
}

export default SmartTable;

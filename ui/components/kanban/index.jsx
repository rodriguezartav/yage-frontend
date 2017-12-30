import React from 'react';
import AutoForm from "../autoForm";
import UI from "./ui";
import Card from "./card";
import Style from "./style.css";
import Menu from "../menu"
import numeral from "numeral";

class Kanban extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      left: 269,
      rowId: null,
      renderChildren: null,
      rows: [],
      rowsMap: {},
      rowsByColumn: {},
      groupBy: null,
      searchCriteria: null,
      addon: null
    }
  }

  componentWillMount(){
    this.setState({
      renderChildren: this.props.renderChildren,
      rows: this.props.rows,
      rowsMap: this.getRowsMap(this.props.rows),
      groupBy: this.props.groupBy,
      rowsByColumn: this.getRowsByColumn(this.props.rows,this.props.groupBy)
    });
  }

  componentDidMount(){
    UI.updateProps(this.props);
    UI.updateLink(this);
  }

  componentWillUnmount(){
   UI.updateProps(null);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      renderChildren: nextProps.renderChildren,
      rows: nextProps.rows,
      rowsMap: this.getRowsMap(nextProps.rows),
      rowsByColumn: this.getRowsByColumn(nextProps.rows,nextProps.groupBy)
    });
    UI.updateProps(nextProps);
  }

  getRowsMap(rows){
    var rowsMap = {};
    rows.forEach(function(row){
      rowsMap[row.id] = row;
    })
    return rowsMap;
  }

  getRowsByColumn(rows, groupBy){
    var _this = this;
    var rowsByTypes = {}

    rows.forEach(function(row){
      var rowByType = rowsByTypes[ row[ groupBy] ];
      if(!rowByType) rowByType = {name: row[groupBy], rows: [] }
      rowByType.rows.push( row );
      rowsByTypes[ row[groupBy] ] = rowByType;
    })
    return rowsByTypes;
  }

  onGroupActionClick(action, context){
    //context = column
    UI.onGroupActionClick(action, this.state.rowsByColumn[context].rows)
  }

  onRowActionClick(action,context){
    //context = row
    UI.onRowActionClick(action,context);
  }

  onItemClick(e){
    UI.onRowClick(parseInt(e.currentTarget.dataset.id));
  }


  onShowAddOn(addon, id){

  }

  closeAddOn(){
    this.setState({ addon: null, addonId: null });
  }

  ignoreEvent(e){
    e.preventDefault();
    e.stopPropagation();
  }

  renderColumnCards(kanbanColumn){
    var _this = this;
    var kanbanRows = this.state.rowsByColumn[kanbanColumn.key];
    if(kanbanRows && kanbanRows.rows) return kanbanRows.rows.map(function(row){
      return <Card key={row.id} row={row}
        kanbanColumn={kanbanColumn}
        onItemClick={_this.props.onRowClick}
        rowActions={kanbanColumn.rowActions || _this.props.rowActions}
        onRowAction={_this.onRowActionClick.bind(this)}
        icon={_this.props.icon}
        principalColumn={_this.props.principalColumn}
        principalColumnAction={_this.props.principalColumnAction}
        onShowAddOn={_this.onShowAddOn.bind(_this)}
      />
    })
    return null;
  }

  renderSums(kanbanColumn){
    var columnRows = this.state.rowsByColumn[kanbanColumn.key];
    if(!columnRows) return null;
    if( !kanbanColumn.sum ) return null;

    var sum = 0;
    columnRows.rows.forEach( function(row){
      if(row[kanbanColumn.sum]) sum += row[kanbanColumn.sum];
    })
    return <div>
    <dl className="slds-list_horizontal slds-wrap slds-text-body_small">
      <dt

            className="slds-item_label slds-text-color_weak slds-truncate">
            {kanbanColumn.sum}
            </dt>
            <dd className="slds-item_detail slds-text-color_weak slds-truncate">
             {numeral(sum).format("0,0.00")}
            </dd>

    </dl>
    </div>
  }

  renderCards(){
    var _this = this;
    var kanbanColumns = this.props.kanbanColumns.map(function(kanbanColumn){
      var classes = "slds-col kanban-column";
      var sums = _this.renderSums(kanbanColumn);
      return <div key={kanbanColumn.name} className={classes} style={{width:100/_this.props.kanbanColumns.length}}>
      <div className="slds-m-right_medium">
          <div className="kanban-column-header ">
            <div className="kanban-column-header_title">
              {kanbanColumn.name}
              </div>
            <Menu
              context={kanbanColumn.name}
              onSelect={_this.onGroupActionClick.bind(_this)}
              positionRight={true}
              items={  kanbanColumn.groupActions || _this.props.groupActions }
            />
          </div>
          <div className="kanban-column-header-sum">
            {sums}
          </div>
          <div className="kanban-column-rows">
            {_this.renderColumnCards(kanbanColumn)}
          </div>
        </div>
      </div>
    })

    if(this.state.addon){
      var Addon = this.state.addon;
      kanbanColumns.push( <div
        style={{ position: "absolute",width: 300, maxWidth: 300, overflowX: "hidden", right: 0, top: 5, bottom: 5, borderLeft: "1px solid #ddd",boxShadow: "-5px 0px 5px -3px #616161" }}
        className="">
          <Addon onClose={_this.closeAddOn.bind(_this)} id={this.state.addonId} />
        </div>
        )
    }

    return <div className="slds-grid slds-p-horizontal_medium kanban-columns slds-scrollable_y">
      {kanbanColumns}
    </div>
  }

  renderForm(){
    var _this = this;
    return <div style={{height: _this.props.height}}>
      {React.cloneElement(_this.props.children, { height: _this.props.height || 300 })}
    </div>
  }

  render(){
    var content;
    if(this.state.renderChildren) content= this.renderForm()
    else content = this.renderCards();

    return <div className="kanban">
      {content}
    </div>
  }

}

Kanban.demo = function(Highlight){

  var rows = [
    {id: 1, "header":"title a","type":"aa","b":"bb","c":"cc","d":"dd","e":"ee","f":"ff","g":"gg","h":"hh","i":"ii","j":33},
    {id: 2,"header":"title","type":"cc","b":"bb","c":"cc","d":"dd","e":"ee","f":"ff","g":"gg","h":"hh","i":"ii",j:22},
    {id: 3,"header":"title","type":"aa","b":"bb","c":"cc","d":"dd","e":"ee","f":"ff","g":"gg","h":"hh","i":"ii","j":33},
    {id: 4,"header":"title","type":"cc","b":"bb","c":"cc","d":"dd","e":"ee","f":"ff","g":"gg","h":"hh","i":"ii",j:22},
    {id: 5,"header":"title","type":"aa","b":"bb","c":"cc","d":"dd","e":"ee","f":"ff","g":"gg","h":"hh","i":"ii","j":33},
    {id: 6,"header":"title","type":"dd","b":"bb","c":"cc","d":"dd","e":"ee","f":"ff","g":"gg","h":"hh","i":"ii",j:22},
    {id: 7,"header":"title","type":"aa","b":"bb","c":"cc","d":"dd","e":"ee","f":"ff","g":"gg","h":"hh","i":"ii","j":33},
    {id: 8,"header":"title","type":"ee","b":"bb","c":"cc","d":"dd","e":"ee","f":"ff","g":"gg","h":"hh","i":"ii",j:22}
  ]

  var kanbanColumns=[{"column":"aa","data":["type","b"]},{"column":"cc","data":["type"]},,{"column":"dd","data":["h"]},{"column":"ee","data":["j"]}];

  return <div>
    <Kanban
      height={"87%"}
      icon="contact"
      kanbanColumns={kanbanColumns}
      onGroupActionClick={function(){console.log(arguments)}}
      onRowActionClick={function(){console.log(arguments)}}
      onRowClick={function(){console.log(arguments)}}
      rows={rows}
      rowActions={[{name:"test",title: "Test"}]}
      groupActions={["merge","lock"]}
      groupBy="type"
      principalColumn="nombreproveedor__c"
      />

    <Highlight className='dark'>
      {'<Kanban height={"87%"} icon="contact"  kanbanColumns={kanbanColumns} onGroupActionClick={function(){console.log(arguments)}} onRowActionClick={function(){console.log(arguments)}} onRowClick={function(){console.log(arguments)}} rows={rows} rowActions={[{name:"test",title: "Test"}]} groupActions={["merge","lock"]} groupBy="type" principalColumn="nombreproveedor__c" />'}<br/>
      {'columnsOrder have this estructure: var columnsOrder=[{"column":"aa","data":["type","b"]},{"column":"cc","data":["type"]},,{"column":"dd","data":["h"]},{"column":"ee","data":["j"]}]; '}
    </Highlight>
  </div>
}

export default Kanban;

import moment from "moment";
import Business from "./business";
import Contents from "./business/contents";

var UI = {
  business: null,
  editingCell: null,
  staticCell: null
};

UI.setSize = function(){
  var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  var padding = 100;
  var viewportHeight = y - padding;
  Business.instance.app.setState({ viewportHeight: viewportHeight, viewportWidth: x });
}
window.onresize = UI.setSize;


UI.onScrollGroupClick = function(field){
  Business.instance.app.refs.grid.scrollToField(field);
}

UI.onActionClick = function(id, action){
  Business.instance.app.setState({ content: Contents.one( id ), action: action })
}

UI.onRowClick = function(id){
  UI.gridScrolledY = Business.instance.app.refs.grid.state.scrolled;
  var app = Business.instance.app;
  var edit = app.props.edit||[];
  var editColumns = app.props.editColumns;
  var action = "save";

  var content = Contents.one( id );
  edit.forEach(function(editState){
    var keys = Object.keys(editState.state);
    var equalCheck = keys.map(function(key){
      return editState.state[key] == content[key];
    })
    if(equalCheck.indexOf(false) == -1){
      editColumns = editState.columns;
      action = editState.action;
    }
  })
  if( editColumns.length == 0 ) return;
  return app.setState({ content: content, action: action, editColumns: editColumns })
}

UI.onFilter = function(column, text){
  Business.instance.filter( column, text );
}

UI.onSortBy = function(sortBy){
  Business.instance.sort(sortBy);
}

UI.onChangeView = function(view){
  Contents.clear();
  Business.instance.app.setState({dataView: view, contents: [] });
  Business.instance.load(view);
}

UI.showSave = function(){
  Business.instance.app.setState({toast: "Se guardaron los cambios"});
}

UI.registerEditCell = UI.resetEditingCells = function(cell){
  if(UI.editingCell ) UI.editingCell.resetEdit();
  UI.editingCell=cell;
}

UI.deRegisterEditCell = function(cell){
  if(UI.editingCell === cell ) UI.editingCell=null;
}

UI.registerStaticCell = UI.resetStaticCells = function(cell){
  if(UI.staticCell ) UI.staticCell.resetEdit();
  UI.staticCell=cell;
}

UI.deRegisterStaticCell = function(cell){
  if(UI.staticCell === cell ) UI.staticCell=null;
}

UI.updateField = function(row,col,value){
  var obj = Contents.one( row.id );
  obj[col.name] = value;
  if(col.onEdit) Business.instance.rowAction(col.onEdit, obj);
  else Business.instance.save(obj);
}

export default UI;

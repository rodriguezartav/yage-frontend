var props;
var component
import createHistory from 'history/createHashHistory'
const history = createHistory()

function UI(){
}

UI.setSize = function(){
  if(!component) return;
  var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  var padding = 100;
  if( props.paddingFromTop ) padding = props.paddingFromTop;
  var tableHeight = y - padding;
  if( props.height ) tableHeight = props.height;
  component.setState({height: tableHeight });
}
window.onresize = UI.setSize;

UI.updateLink = function(comp){
  component = comp;
}

UI.updateProps = function(nextProps){
  props = nextProps;
}

UI.onActionClick = function(rowId, action){
  props.onActionClick(rowId,action);
  component.setState({rowId: null})
}

UI.onSubmit = function(model){
  props.onActionClick(component.state.rowId,"save",model);
  component.setState({rowId: null})
}

UI.onGroupClick = function(rows){
  props.onGroupClick(rows);
}

UI.onRowClick = function(rowId){
  component.props.onRowClick(rowId);
}

UI.onBackToTable = function(){
 component.setState({rowId: null})
}

UI.onSort = function(columnTitle){
  var currentSort = component.state.sortBy;
  if(currentSort && currentSort.column == columnTitle){
    component.setState({ sortBy: {column: columnTitle, direction: currentSort.direction * -1 } });
  }
  else component.setState({ sortBy: {column: columnTitle, direction: 1 } });
}

UI.onSearchCancel = function(){
  component.setState({searchCriteria: null})
}

UI.onSearch = function(text, columnTitle){
  component.setState({ searchCriteria: { text: text, column: columnTitle } });
}

export default UI;

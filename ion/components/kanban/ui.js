var props;
var component

function UI(){

}

UI.updateLink = function(comp){
  component = comp;
}

UI.updateProps = function(nextProps){
  props = nextProps;
}

UI.onSubmit = function(model){
  props.onActionClick(component.state.rowId,"save",model);
  component.setState({rowId: null})
}

UI.onGroupActionClick = function(action, rows){
  props.onGroupActionClick(action, rows);
}

UI.onRowActionClick = function(rowId, action){
  props.onRowActionClick(rowId,action);
  //component.setState({rowId: null})
}


UI.onRowClick = function(rowId){
  component.setState({rowId: rowId})
  props.onRowClick( rowId );
}

UI.onBackToTable = function(){
 component.setState({rowId: null})
}


export default UI;

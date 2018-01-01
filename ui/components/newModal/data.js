import {Ajax} from  '../../helpers';

var Data = {};


Data.onSave = function(app,item){
  var _this = this;
  var error = "";
  app.setState({modalError: ""})

  var columns = app.state.columns;
  columns.forEach(function(column){
    if(column.type=="hidden") item[column.name] = column.value;
  })

  return Ajax.post("/"+app.props.route+"_"+app.state.saveRoute, item)
  .then(function(result){
    app.setState({columns: [], saveRoute:null });
    return result;
  })

}

Data.onNew = function(app){
  var _this = this;
  return Ajax.post("/"+app.props.route+"_onNew",app.props.payload||{})
  .then(function(results){
    app.setState({columns: results.columns, saveRoute: results.saveRoute});
  })
}

export default Data;

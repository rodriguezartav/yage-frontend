import {Ajax} from  '../../helpers';

var Data = {};


Data.onSave = function(app,item){
  var _this = this;
  var error = "";
  app.setState({modalError: ""})
  return Ajax.post("/"+app.props.route+"/"+app.props.column.saveRoute, item)
  .then(function(){
    app.setState({showModal: false,modalColumns: [] });
    return Data.load(app);
  })
  .catch(function(err){
    app.setState({ modalError: JSON.stringify(err) });
  })
}

Data.onNew = function(app){
  var _this = this;
  return Ajax.get("/"+app.props.route+"/"+app.props.column.newColumnsRoute)
}

Data.load = function(app){
  var _this = this;
  return Ajax.get("/"+app.props.route+"/"+app.props.column.viewRoute)
  .then(function(results){
    var selectedItem=null;
    results.forEach(function(result){
      if(result[app.props.itemKey] == app.props.selectedItem) selectedItem=result;
    })
    app.setState({items: results, selectedItem: selectedItem});
  })
}


export default Data;

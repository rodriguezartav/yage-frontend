import {Ajax} from  '../../helpers';

var Data = {};


Data.load = function(app){
  var _this = this;
  return Ajax.get("/"+app.props.route)
  .then(function(results){
    var selectedItem=null;
    results.forEach(function(result){
      if(result[app.props.itemKey] == app.props.selectedItem) selectedItem=result;
    })
    app.setState({items: results, selectedItem: selectedItem});
  })
}


export default Data;

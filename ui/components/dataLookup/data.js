import {Ajax} from  '../../helpers';


export default function(app){
  var _this = this;
  return Ajax.get("/operations/"+app.props.route+"?name=get"+app.props.view)
  .then(function(results){
    var selectedItem=null;
    results.forEach(function(result){
      if(result[app.props.itemKey] == app.props.selectedItem) selectedItem=result;
    })
    app.setState({items: results, selectedItem: selectedItem});
  })
}

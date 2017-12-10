import moment from "moment";
import Business from "./business";
import Contents from "./business/contents";

var UI = {
  business: null
};


UI.onChangeView = function(view){
  Contents.clear();
  Business.instance.app.setState({dataView: view, contents: [] });
  Business.instance.load(view);
}

UI.onFilterClick = function(fbFilter, dateFilter){
  var contents = [];
  Contents.all().map(function(content){
    if(content.tipo_de_facebook == fbFilter && content.delivery_date > dateFilter){ contents.push(content) }
    else if(fbFilter == 'Todo' && content.delivery_date > dateFilter){ contents.push(content) }
    else if(content.tipo_de_facebook == fbFilter && dateFilter == 'Todo'){ contents.push(content) }
    else if(fbFilter == 'Todo' && dateFilter == 'Todo'){ contents.push(content) }
  })
  Business.instance.app.setState({ contents: contents });
}

export default UI;

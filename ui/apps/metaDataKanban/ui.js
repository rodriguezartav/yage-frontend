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

UI.onUploadPhoto = function(file){
  Business.instance.uploadImage(file)
}

UI.onDeletePhoto = function(photo){
  var content = Business.instance.app.state.content;
  var photos = content.photos.list;
  var count = 0;
  var index;
  photos.forEach(function(loopPhoto){
    if(photo.id == loopPhoto.id) index = count;
    count++;
  });
  photos.splice(index,1);
  content.photos.list = photos;
  Business.instance.app.setState({ content: content });
}

UI.onUploadImageURL = function(url){
  var content = Business.instance.app.state.content;
  if(!content.photos) content.photos = {list: []};
  content.photos.list.push({ url: url });
  Business.instance.app.setState({ content: content });
}


export default UI;

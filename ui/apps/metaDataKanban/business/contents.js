import assign from 'object-assign';

var originalMap={}
var data = [];
var map = {};
var app;
var key;

function Contents(){
}

Contents.clear = function(){
  originalMap={};
  data = [];
  map = {};
}

Contents.load = function(items, srcApp, srcKey){
  data = items;
  data.forEach(function(item){
    map[item.id] = item;
  })
  key=srcKey;
  app=srcApp;
  originalMap = JSON.parse(JSON.stringify(map));
  Contents.update();
}

Contents.all = function(){
  return data;
}

Contents.one = function(id){
  id = parseInt(id);
  var item = map[id];
  return JSON.parse(JSON.stringify(item));
}

Contents.save = function(item){
  map[item.id] = item;
  var count = 0;
  var index = null;
  data.forEach(function(loopItem){
    if( item.id ==  loopItem.id) index = count;
    count++;
  })
  if(index==null) data.push(item);
  else data[index] = item;
  Contents.update();
}

Contents.delete = function(item){
  delete map[item.id];
  var count = 0;
  var index = 0;
  data.forEach(function(loopItem){
    if( item.id ==  loopItem.id) index = count;
    count++;
  })
  data.splice(index,1);
  Contents.update();
}

Contents.update = function(){
  var state = app.state;
  state[key] = Contents.all();
  app.setState(state);
}

//TODO: TEST OBJECT INSIDE OBJECT
Contents.getDeltaObject = function(item){
  if(!item.id && !item.sfid) return item;
  var originalItem = originalMap[item.id];
  if(!originalItem) return item;

  var keys = Object.keys(item);
  var deltaKeys = [];
  keys.forEach(function(key){
    if( item[key] === Object(item[key]) ){
      var objKeys = Object.keys(item[key]);
      objKeys.forEach(function(objKey){
        if( !originalItem[key] || !originalItem[key][objKey] ) deltaKeys.push(key);
        else if( originalItem[key] && originalItem[key][objKey] && item[key][objKey] !== originalItem[key][objKey] ) deltaKeys.push(key);
      })
    }
    else if( item[key] !== originalItem[key] ) deltaKeys.push(key);
  })
  var deltaObject = {id: item.id};
  if(item.sfid) deltaObject.sfid = item.sfid;
  deltaKeys.forEach(function(key){
    deltaObject[key] = item[key];
  })
  return deltaObject;
}

Contents.updateOriginal = function(item){
  originalMap[item.id] = JSON.parse(JSON.stringify(item));
}

export default Contents

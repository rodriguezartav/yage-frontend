import assign from 'object-assign';
import Format from "./format";
import Columns from "./columns";

var originalMap = {}
var data = [];
var groupedData = {}
var map = {};
var app;
var key;
import Business from "./";
import Dynamic from "./dynamic";

function Contents() {}

Contents.groupBy = function(fieldName) {

  var _this = this;

  var rowsByTypes = {}
  data.forEach(function(row) {
    var value = row[fieldName] || "*";

    //    if( fieldName && fieldName.indexOf(".") > -1 ){ // For Deep Objects
    //     var parts = fieldName.split(".");
    //      value = row[parts[0]][parts[1]];
    //    }

    var rowByType = rowsByTypes[value];
    if (!rowByType) rowByType = {
      name: value,
      rows: []
    }
    rowByType.rows.push(row);
    rowsByTypes[value] = rowByType;
  })
  groupedData = rowsByTypes;
}

Contents.clear = function() {
  originalMap = {};
  data = [];
  map = {};
}

Contents.load = function(items, srcApp, srcKey) {
  var dynamicColumns = Business.instance.app.props.dynamicColumns || [];
  data = items;
  data.forEach(function(item) {
    dynamicColumns.forEach(function(column) {
      if (column.type == "concat") item[column.name] = Dynamic.concat(item, column).formatValue;
    })
    map[item.id] = item;
  })

  key = srcKey;
  app = srcApp;
  originalMap = JSON.parse(JSON.stringify(map));
  Contents.update();
}

Contents.all = function() {
  return data;
}

Contents.one = function(id) {
  id = parseInt(id);
  var item = map[id];
  if (!item) return null;
  return JSON.parse(JSON.stringify(item));
}

Contents.save = function(item) {
  map[item.id] = item;
  var count = 0;
  var index = null;
  data.forEach(function(loopItem) {
    if (item.id == loopItem.id) index = count;
    count++;
  })
  if (index == null) data.push(item);
  else data[index] = item;
  Contents.update();
}

Contents.delete = function(item) {
  delete map[item.id];
  delete originalMap[item.id];

  var count = 0;
  var index = 0;
  data.forEach(function(loopItem) {
    if (item.id == loopItem.id) index = count;
    count++;
  })
  data.splice(index, 1);
  Contents.update();
}

Contents.update = function() {
  var dynamicColumns = Business.instance.app.props.dynamicColumns || [];
  var state = app.state;
  var all = Contents.all();
  var enrichedData = [];
  all.forEach(function(item, index) {
    var newData = {
      id: item.id
    }
    dynamicColumns.forEach(function(column) {
      if (column.type == "concat") newData[column.name] = Dynamic.concat(item, column)
    })
    Columns.getAsArray().forEach(function(column) {
      if (!newData[column.name]) newData[column.name] = Format.init(item, column, index);
    })
    enrichedData.push(newData);
  })

  state[key] = enrichedData;
  app.setState(state);
}

//TODO: TEST OBJECT INSIDE OBJECT
Contents.getDeltaObject = function(item) {
  if (!item.id && !item.sfid) return item;
  var originalItem = originalMap[item.id];
  if (!originalItem) return item;

  var keys = Object.keys(item);
  var deltaKeys = [];
  keys.forEach(function(key) {
    if (item[key] === Object(item[key])) {
      var objKeys = Object.keys(item[key]);
      objKeys.forEach(function(objKey) {
        if (!originalItem[key] || !originalItem[key][objKey]) deltaKeys.push(key);
        else if (originalItem[key] && originalItem[key][objKey] && item[key][objKey] !== originalItem[key][objKey]) deltaKeys.push(key);
      })
    } else if (item[key] !== originalItem[key]) deltaKeys.push(key);
  })
  var deltaObject = {
    id: item.id
  };
  if (item.sfid) deltaObject.sfid = item.sfid;
  deltaKeys.forEach(function(key) {
    deltaObject[key] = item[key];
  })
  return deltaObject;
}

Contents.updateOriginal = function(item) {
  originalMap[item.id] = JSON.parse(JSON.stringify(item));
}

export default Contents

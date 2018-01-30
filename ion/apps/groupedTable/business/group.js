import Ops from "./ops";
import Columns from "./columns";
import Sort from "./sort";

var groupInfo = {};
var props;

function Group() {}

Group.init = function(rows, groupByName, propsSrc, sortBy, sortDirection) {
  props = propsSrc;
  groupInfo = {}
  var groupByColumn = Columns.getColumnByName(groupByName);
  var groupFields = [];
  if (!rows) rows = [];
  var groupArray = [];
  var index = 1;


  rows.forEach(function(row, index) {
    var groupId;
    if (row[groupByName] && row[groupByName].formatValue != "") groupId = row[groupByName].formatValue;
    else groupId = "n/d";

    var group = groupInfo[groupId];
    if (!group) {
      group = {
        name: groupId,
        count: 0,
        rows: []
      }
      groupArray.push(group);
    }
    group.count++;
    group.rows.push(row);
    groupInfo[groupId] = group;
  })

  groupArray.forEach(function(group, index) {
    group.rows = Sort(group.rows, Columns.getColumnByName(sortBy), sortDirection);
    group.rows.unshift(getRow(group, true));
    group.rows.unshift(getRow(group));
    group.rows[2].isFirst = true;
    group.rows[group.rows.length - 1].isLast = true;
    group.index = index;
  })

  groupArray.sort(function(a, b) {
    if (a.name == "n/d") return -1;
    if (b.name == "n/d") return 1;
    if (a.name > b.name) return -1;
    if (b.name > a.name) return 1;
    return 0;
  })

  return {
    unique: groupFields,
    list: groupArray,
    map: groupInfo
  }
}

function getRow(group, addTitle) {
  var row = {
    id: Math.random() * 1000000,
  }

  Columns.getAsArray().forEach(function(column) {
    row[column.name] = "";
  })

  if (addTitle) {
    row.header = group.name
    row._headerOptions = {
      isHeader: true,
      name: group.name,
      index: group.index,
      count: group.count,
      rows: group.rows,
      hasTitle: true
    }
  } else {
    row._headerOptions = {
      isHeader: true
    };
  }


  return row;
}

export default Group;

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


  rows.forEach(function(row) {
    var groupId;
    if (row[groupByName] && row[groupByName].formatValue != "") groupId = row[groupByName].formatValue;
    else groupId = "" + Math.random() + 10000;

    var group = groupInfo[groupId];
    if (!group) {
      group = {
        name: groupId,
        index: 0,
        sum: 0,
        count: 0,
        width: 0,
        height: 0,
        rows: [],
        isFirst: false,
        isLast: false
      }
      groupArray.push(group);
    }
    console.log(group)
    group.count++;
    group.rows.push(row);
    if (groupByColumn.sumOnSort) {
      var sum = row[groupByColumn.sumOnSort];
      if (!sum) sum = {
        originalValue: 0
      }
      group.sum += sum.originalValue;
    }
    groupInfo[groupId] = group;
  })


  var totalHeight = 0;
  groupArray.forEach(function(group, index) {
    group.rows = Sort(group.rows, Columns.getColumnByName(sortBy), sortDirection);
    group.rows.unshift(getRow(group, true));
    group.rows.unshift(getRow(group));
    group.rows[0].isFirst = true;
    group.rows[group.rows.length - 1].isLast = true;
    group.index = index;
    group.height = group.rows.length * Ops.rowHeight;
    totalHeight += group.height;
  })

  return {
    totalHeight: totalHeight,
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
    row.isHeader = true;
    row[column.name] = "";
  })

  row.isHeader = true;
  if (addTitle) row.header = group.name


  console.log(row);
  return row;
}

export default Group;

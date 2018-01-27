import Ops from "./ops";

var props;
var columnsArray = [];

function Columns() {}

Columns.init = function(propsSrc) {
  props = propsSrc;
  columnsArray = Object.keys(props.columns).map(function(columnName) {
    var column = props.columns[columnName];
    column.name = columnName;
    column.labelWidth = Columns.getTextWidth(column.title || column.name);
    return column;
  })
}

Columns.getAsArray = function() {
  return columnsArray;
}

Columns.getDistintFields = function(rows, groupBy) {
  var groupByColumn = Columns.getColumnByName(groupBy);
  var groupFields = [];
  if (!rows) rows = [];
  var details = {};
  var index = 1;
  rows.forEach(function(row) {

    if (row[groupBy] && row[groupBy].formatValue != "") {
      var formaValue = row[groupBy].formatValue;
      if (!details[formaValue]) details[formaValue] = {
        index: -1,
        sum: 0,
        count: 0
      }
      details[formaValue].count++;

      if (groupByColumn.sumOnSort) details[formaValue].sum += (row[groupByColumn.sumOnSort] || {
        originalValue: 0
      }).originalValue;

      if (groupFields.indexOf(formaValue) == -1) {
        groupFields.push(formaValue);
        details[formaValue].index = index;
        index++;
      }
    }
  })
  return {
    unique: groupFields,
    details: details
  }
}

Columns.getColumnByName = function(columnsName) {
  return props.columns[columnsName];
}

Columns.getPrincipalColumn = function() {
  return props.columnsArray[0];
}

Columns.getColumnsArrayFromList = function(listName) {
  return Columns.getColumnsArrayFromArray(props[listName]);
}

Columns.getColumnsArrayFromArray = function(arr) {
  var columns = [];
  arr.forEach(function(columnKey) {
    var column = props.columns[columnKey];
    if (column) {
      column.name = columnKey;
      columns.push(column);
    }
  })
  return columns;
}

Columns.getTextWidth = function(text) {
  // re-use canvas object for better performance
  var canvas = Columns.getTextWidth.canvas || (Columns.getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = "bold " + Ops.fontSize + "pt arial";
  var metrics = context.measureText(text);
  return metrics.width;
}

Columns.getColumnWidths = function(rows, columns) {
  var columnWidths = {};
  var groupFields = [];
  rows.forEach(function(row) {
    columns.forEach(function(column) {
      var col = column.name;
      var colValue = row[col] || "";

      var labelCount = column.labelWidth + 70;
      var contentCount = colValue.contentWidth;

      if (labelCount < Ops.minColumnWidth) labelCount = Ops.minColumnWidth;
      if (contentCount > Ops.maxColumnWidth) contentCount = Ops.maxColumnWidth;
      if (!columnWidths[col]) columnWidths[col] = labelCount;

      if (column.maxWidth && contentCount > column.maxWidth) contentCount = column.maxWidth;

      if (col == props.principalColumn) {
        contentCount += 50;
        if (contentCount < 200) contentCount = 200;
      }

      if (contentCount > columnWidths[col]) columnWidths[col] = contentCount;
    })
  })

  var totalWidth = 0;
  Object.keys(columnWidths).forEach(function(width) {
    totalWidth += columnWidths[width];
  });

  return {
    columnWidths: columnWidths,
    totalWidth: totalWidth
  };

}

export default Columns;

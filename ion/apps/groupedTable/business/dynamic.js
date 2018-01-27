import Columns from "./columns";


function Dynamic(){}

Dynamic.concat = function(item, column){
  var values = column.columns.map( function(field){
    return item[field] || "";
  })

  var formatValue = values.join(" ");
  return {
    isDynamic: true,
    editable: false,
    columns: column.columns,
    originalValue: null,
    formatValue: formatValue,
    objectClass: values,
    contentWidth: Columns.getTextWidth(formatValue)
  }

  return values.join(" ");
}

export default Dynamic;

import moment from "moment";
import Columns from "./columns";
import numeral from "numeral";
function Format(){

}

Format.init = function(item, column){
  var value = item[column.name];
  if( column.name == "id" ) return item.id;
  if(value == null) value = "";

  var formatFunction = Format[column.type];
  if( formatFunction ) return formatFunction(value, column,item);

  var formatValue = "" + value.toString();
  return {
    originalValue: value,
    formatValue: formatValue,
    objectClass: new String(value),
    contentWidth: Columns.getTextWidth(formatValue)
  }
}

Format.onetoone = function(value,column,row){
  if(!value || value == "") return { originalValue: "", formatValue: "", objectClass: {}, contentWidth:0 };

  var objectClass = {}
  var formatValue = value[column.field];

  return {
    originalValue: value,
    formatValue: formatValue,
    objectClass: value,
    contentWidth: Columns.getTextWidth(formatValue)
  }
}

Format.number = function(value,column,row){
  value = parseFloat(value);
  var objectClass = numeral(value);
  var formatValue = objectClass.format('0.0a');
  return {
    originalValue: value,
    formatValue: formatValue,
    objectClass: objectClass,
    formatModule: numeral,
    formatModuleFormatter: "0.0a",
    contentWidth: Columns.getTextWidth(formatValue)
  }
}

Format.integer = function(value,column,row){
  value = parseInt(value);
  var objectClass = numeral(value);
  var formatValue = objectClass.format('0');
  return {
    originalValue: value,
    formatValue: value,
    objectClass: value,
    formatModule: numeral,
    formatModuleFormatter: "0",
    contentWidth: Columns.getTextWidth(formatValue)
  }
}

Format.relation = function(value, column, row){
  var formatValue = ""
  if( value > 1 ){
    formatValue = row[column.titleField];
  }

  return {
      originalValue: value,
      formatValue: formatValue,
      objectClass: { getId: function(){ return value }, getTitle: function(){return formatValue;} },
      contentWidth: Columns.getTextWidth(formatValue)
  }
}

Format.timestamp = function(value, column){
  var momentValue = moment(value);

  var formatValue = momentValue.fromNow();
  return {
      originalValue: value,
      formatValue: formatValue,
      objectClass: momentValue,
      contentWidth: Columns.getTextWidth(formatValue)
    }
}

Format.date = function(value, column){
  var momentValue = moment(value);
  var formatValue;
  var format = column.format || "DD MMM YY";
  if(format == "toNow") formatValue = momentValue.fromNow();
  else formatValue = momentValue.format("DD MMM YY");

  return {
      originalValue: value,
      formatValue: formatValue,
      objectClass: momentValue,
      contentWidth: Columns.getTextWidth(formatValue)
    }
}

Format.boolean = function(value, column){
  var formatValue;
  if(value.toLowerCase) value = value.toLowerCase();
  if( value == true || value == "true") formatValue = "Si";
  if( value == false || value == "false") formatValue = "No";

  return {
      originalValue: value,
      formatValue: formatValue,
      objectClass: {
        isTrue: function(){
          if( value == true || value == "true") return true;
          if( value == false || value == "false") return false;
          return false;
        }
      },
      contentWidth: 10
    }
}

Format.select = function(value, column){
  var formatValue = value;
  return {
    originalValue: value,
    formatValue: formatValue,
    objectClass: new String(value),
    contentWidth: Columns.getTextWidth(formatValue)
  }
}

Format.list = function(value, column){
  var separator = column.separator || ","
  var items;

  if( Array.isArray(value) ) items = value;
  else  items = value.split(separator);

  if(items.length ==1 && items[0] == "") items=[];
  var formatValue = items.join(" ");

  return {
    originalValue: value,
    formatValue: formatValue,
    objectClass: items,
    contentWidth: Columns.getTextWidth(formatValue)
  }
}

Format.arrayList = function(value, column){
  var formatValue="";
  var array = value;
  if( column.key ) array = array[key];
  if(!array) array = [];


  return {
    originalValue: value,
    formatValue: array,
    objectClass: value,
    contentWidth: array.length * 20
  }
}

Format.jsonbPhoto = function(value, column){
  var formatValue="";
  var array = value;
  if( column.key ) array = array[column.key]; // for JSONB
  if(!array) array = [];


  return {
    originalValue: value,
    formatValue: array,
    objectClass: value,
    contentWidth: array.length * 25
  }
}


export default Format;

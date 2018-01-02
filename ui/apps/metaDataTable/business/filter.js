import moment from "moment";

function Filter(rows, filter){
  if( !filter || !filter.column || !filter.text || filter.text == "") return rows;

  var type = filter.column.type || "string";
  if(Filter[type]) return Filter[type](rows, filter);
  else return rows;
}

Filter.boolean = function(rows, filter){
  //if( filter.text != "si" || filter.text != "no" ) return rows;

  var filteredRows = rows.filter(function(item){
    var value = item[filter.column.name];
    if( filter.text == "si"  && value.objectClass.isTrue() ) return true;
    else if( filter.text == "no"  && !value.objectClass.isTrue() ) return true;
    else return false;
  })
    return filteredRows;
}

Filter.timestamp = function(rows, filter){
  if( filter.text == "-" ) return rows;
  var asInt = parseInt(filter.text);
  var filteredRows = rows.filter(function(item){
    var value = item[filter.column.name];
    if(!value) return false;
    if( filter.text == "hoy" && moment().isSame(value.objectClass,"day") ) return true;
    if( asInt  > 0 || asInt < 0 || asInt === 0){
      if( moment().add(asInt,"d").isSame(value.objectClass,"day") ) return true;
      return false
    }
    return false;
  })
    return filteredRows;
}

Filter.string = function(rows, filter){
  var filteredRows = rows.filter(function(item){
    var value = item[filter.column.name].formatValue;
    if(!value) return false;
    value = value.toLowerCase();

    if( value.indexOf( filter.text.toLowerCase() ) > -1 ) return true;
    return false;
  })
    return filteredRows;
}

Filter.relation = function(rows, filter){
  var filteredRows = rows.filter(function(item){
    var value = item[filter.column.name].formatValue;
    if(!value) return false;
    value = value.toLowerCase();

    if( value.indexOf( filter.text.toLowerCase() ) > -1 ) return true;
    return false;
  })
    return filteredRows;
}

export default Filter;

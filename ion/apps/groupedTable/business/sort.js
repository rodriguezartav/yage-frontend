function Sort(rows, column, sortDirection){
  if(!column) return rows;
  var type = column.type || "string";
  if(!Sort[type]) return rows;
  return Sort[type](rows, column, sortDirection||1);
}


Sort.number = Sort.integer = function(rows,column, sortDirection){
  rows.sort(function(a,b){
    var aValue = a[column.name];
    var bValue = b[column.name];
    if( aValue.originalValue == bValue.originalValue ) return 0;
    else if( aValue.originalValue > bValue.originalValue) return 1 * sortDirection;
    else return -1 * sortDirection;
  });
  return rows;
}

Sort.onetoone = function(rows,column,sortDirection){
  rows.sort(function(a,b){
    var aValue = a[column.name];
    var bValue = b[column.name];
    if( !aValue.formatValue & bValue ) return 1 * sortDirection;
    else if( aValue.formatValue & !bValue ) return -1 * sortDirection;
    else if( aValue.formatValue == bValue.formatValue ) return 0;
    else if( aValue.formatValue > bValue.formatValue) return 1 * sortDirection;
    else return -1 * sortDirection;
  });
  return rows;
}

Sort.boolean = function(rows, column, sortDirection){
  rows.sort(function(a,b){
    var aValue = a[column.name];
    var bValue = b[column.name];
    if( aValue.formatValue == bValue.formatValue ) return 0;
    else if( aValue.objectClass.isTrue() ) return 1 * sortDirection;
    else return -1 * sortDirection;
  });
  return rows;
}

Sort.string = Sort.select = function(rows, column, sortDirection){
  if( column.order ){
    rows.sort(function(a,b){
      var aValue = a[column.name].formatValue;
      var bValue = b[column.name].formatValue;
      var aIndex = column.order.indexOf(aValue);
      var bIndex = column.order.indexOf(bValue);
      if(aIndex & bIndex==-1) return -1;
      else if(aIndex==-1 & bIndex) return -1;
      else if(aIndex == bIndex) return 0;
      else if( aIndex > bIndex ) return 1;
      else if( aIndex <= bIndex ) return -1;
      else return 0;
    });
    return rows;
  }
  else{
    rows.sort(function(a,b){
      var aValue = a[column.name].formatValue;
      var bValue = b[column.name].formatValue;
      if(!aValue) aValue = "";
      if(!bValue) bValue = "";
      if( aValue > bValue  ) return -1 * sortDirection;
      if( aValue <= bValue ) return 1 * sortDirection;
      else return 0;
    });
    return rows;
  }
}

Sort.timestamp = Sort.date = function(rows, column, sortDirection){
  rows.sort(function(a,b){
    var aValue = a[column.name].objectClass;
    var bValue = b[column.name].objectClass;
    if( aValue.isBefore(bValue,"day") ) return 1 * sortDirection;
    else if( aValue.isAfter(bValue,"day") ) return -1 * sortDirection;
    else return 0;
  });
  return rows;
}

Sort.list = function(rows, column, sortDirection){
  rows.sort(function(a,b){
    var aValue = a[column.name].objectClass.length;
    var bValue = b[column.name].objectClass.length;
    if(aValue == bValue) return 0;
    else if( aValue > bValue ) return 1 * sortDirection
    else return -1 *sortDirection
  });
  return rows;
}


export default Sort;

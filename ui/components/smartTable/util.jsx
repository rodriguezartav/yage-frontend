
function Util(){
}

Util.sort = function(rows,sort,column){
  if( !column.type || column.type == "text" ) return Util.sortText(rows,sort)
}

Util.sortText = function(rows, sort){
  return rows.sort( function(a,b){
    console.log(sort);
    var aString;
    var bString;
    if( sort.column.indexOf(".") == -1 ){
     aString = a[sort.column];
     bString = b[sort.column];
    }else{
      var parts = sort.column.split(".");
      if( !a[parts[0]] ) aString = null;
      else aString = a[parts[0]][parts[1]];

      if( !b[parts[0]] ) bString = null;
      else bString = b[parts[0]][parts[1]];
    }

    if(aString) aString = aString.toLowerCase();
    if(bString) bString = bString.toLowerCase();

    if(aString && !bString) return sort.direction;
    if(bString && !aString) return sort.direction*-1;

    if(aString > bString) return sort.direction;
    else if(aString < bString) return sort.direction*-1;
    else return 0;
  })
}

Util.sortNumeric = function(rows, sort){
  return rows.sort( function(a,b){
    var aInt = a[sort.column];
    var bInt = b[sort.column];

    if(aInt > bInt) return sort.direction;
    else if(bInt < aInt) return sort.direction*-1;
    else return 0;
  })
}

Util.filter = function(rows, sort, column){
  var filteredRows = [];
  rows.forEach(function(row){
    if( ( !column.type || column.type == "text" ) && row[ sort.column ] )
      var value = row[ sort.column ];
      if( sort.column.indexOf(".") > -1 ){
        var parts = sort.column.split(".");
        if( !row[parts[0]] ) value = null;
        else value = row[parts[0]][parts[1]];
      }
      if(value && value.toLowerCase().indexOf( sort.text ) > -1 ) filteredRows.push(row);
  })
  return filteredRows;
}

export default Util

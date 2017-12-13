var moment = require("moment");
var Business = require("./business");

var UI = {
  business: null
};

UI.onChangeDia = function(refs){
  var _this = this;
  var dias = [];
  var stats = Business.instance.app.state.stats;
  var state = Business.instance.app.state
  state.error = null;

  function checkStat(dia){
    if( stats[dia] > 45 ){
      state.error= `El ${dia} ya llego a su capacidad maxima, favor escoja otro dia.`;
      return false;
    }
    return true;
  }

  if(refs["jueves"].checked && checkStat("jueves")) dias.push("jueves");
  if(refs["sabado"].checked && checkStat("sabado")) dias.push("sabado");
  if(refs["domingo"].checked && checkStat("domingo")) dias.push("domingo");
  state.dias= dias;
  this.updateMonto(state);
}

UI.onChangePersonas = function(personas){
  console.log(personas)
  var state = Business.instance.app.state;
  state.personas = personas;
  this.updateMonto(state);
}



UI.onChangeText = function(type,value){
  Business.instance.app.state[type] = value;
  Business.instance.app.setState(Business.instance.app.state);
}

UI.updateMonto = function(state){
  var dias = state.dias.length;
  var personas = state.personas;
  var valorUnitario = 0;
  if( dias == 1 ) valorUnitario = 150;
  else if( dias == 2 ) valorUnitario = 350;
  else if( dias == 3 ) valorUnitario = 500;
  state.monto = valorUnitario * state.personas;
  Business.instance.app.setState( state )
}





UI.isEmailValid = function(){
  if(!Business.instance.app.state.email || Business.instance.app.state.email.length < 4 || Business.instance.app.state.email.indexOf("@") < 2 || Business.instance.app.state.email.indexOf(".") < 3){
    Business.instance.app.setState({error: "Error, el email parece no ser valido"})
    return false;
  }
  return true;
}

UI.isCelularValid = function(){
  var isNumber = function(str) {
    var pattern = /^\d+$/;
    return pattern.test(str);  // returns a boolean
  }
  if( !Business.instance.app.state.celular || !isNumber(Business.instance.app.state.celular) ){
    Business.instance.app.setState({error: "Error, el celular solo puede tener numeros"})
    return false;
  }
  return true;
}

UI.isNameValid = function(){

  if( !Business.instance.app.state.nombre || Business.instance.app.state.apellido == "" || Business.instance.app.state.nombre.length < 3){
    Business.instance.app.setState({error: "Falto ingresar su nombre"})
    return false;
  }
  return true;
}

UI.isApellidoValid = function(){

  if( !Business.instance.app.state.apellido || Business.instance.app.state.apellido == "" || Business.instance.app.state.apellido.length < 3){
    Business.instance.app.setState({error: "Falto ingresar su apellido"})
    return false;
  }
  return true;
}

UI.isDiasValid = function(){
  if(Business.instance.app.state.dias.length < 1){
    Business.instance.app.setState({error: "Escoja un al menos un dia"})
    return false;
  }
  return true;
}

UI.isPersonasValid = function(){
  if(!Business.instance.app.state.personas|| Business.instance.app.state.personas < 1){
    Business.instance.app.setState({error: "Debe escoger cuantas personas van en esta reservacion"})
    return false;
  }
  return true;
  return true;
}

function replaceAll(target, search, replacement) {
  return target.replace(new RegExp(search, 'g'), replacement);
}


module.exports= UI;

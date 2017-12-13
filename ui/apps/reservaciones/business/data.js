var Ajax = require( '../../../helpers').Ajax;

module.exports = function(Business){

  Business.prototype.getAll = function(email,password){
    var _this = this;
    Ajax.get("/public/reservacion/getStat")
    .then( function(json){
      _this.app.setState({stats: json});
      console.log(json)
    })
    .catch( function(err){
      console.log(err);
      _this.app.setState({error: "Occurio un error cargando los pacientes, vuelva a cargar. Si continuan los problemas escriba a roberto@3vot.com. " + JSON.stringify(err)})
    })
  }

  Business.prototype.onSave = function(){
    var _this = this;
    var state = this.app.state;
    if(!this.isNameValid()) return;
    if(!this.isApellidoValid()) return;
    if(!this.isEmailValid()) return;
    if(!this.isCelularValid()) return;
    if(!this.isPersonasValid()) return;
    if(!this.isDiasValid()) return;
    this.app.setState({error: null, saving: true})

    var body = {
      "paciente":{
        "nombre": state.nombre + ' ' + state.apellido,
        "email": state.email,
        "telefono":state.celular,
      },
      "reservacion":{
        "jueves": state.dias.indexOf("jueves") > -1 ? state.personas : 0,
        "sabado": state.dias.indexOf("sabado") > -1 ? state.personas : 0,
        "domingo": state.dias.indexOf("domingo") > -1 ? state.personas : 0,
        "monto":state.monto,
        "saldo": state.monto,
        "total_personas": state.personas
      }
    }
    Ajax.post("/pacientes",body)
    .then( function(response){
      if(response.status==403) _this.app.setState({saving: false, error: "Ya existe una reservacion con ese email! Contacte a carolinadada@hotmail.com" });
      else if(response.status==409) _this.app.setState({saving: false, error: "Ya existe una reservacion con este telefono, si no tiene telefono use su numero de pasaporte; o Contacte a carolinadada@hotmail.com" });
      else if( !response.ok ) _this.app.setState({saving: false, error: "Ocurrio un error de conexion, favor intente de nuevo o contacte a roberto@3vot.com" });
      return response.json();
    })
    .then( function(json){
      if(!json) return true;
      if(!json.message) _this.app.setState({view: "complete",saving: false});
    })
    .catch( function(e){
      _this.app.setState({saving: false, error: "Ocurrio un error de conexion, favor intente de nuevo o contacte a roberto@3vot.com" });
      console.log(e);
    })
  }

  Business.prototype.onLogin = function(email,password){
    var _this = Business.this;
    _this.app.state.users.forEach( function(user){
      if( user.username == email && user.password == password ){
        _this.app.setState({user: user, view: "home"})
        _this.getAll();
      }
    })
  }

}

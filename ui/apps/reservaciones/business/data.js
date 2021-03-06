var Ajax = require('../../../../ion/helpers').Ajax;
var UI = require("../ui");

module.exports = function(Business) {


  Business.prototype.getAll = function(email, password) {
    var _this = this;
    Ajax.get("/public/reservacion/getStat?periodo=" + this.app.state.periodo)
      .then(function(json) {
        _this.app.setState({
          stats: json
        });
        console.log(json)
      })
      .catch(function(err) {
        console.log(err);
        _this.app.setState({
          error: "Occurio un error cargando los pacientes, vuelva a cargar. Si continuan los problemas escriba a roberto@3vot.com. " + JSON.stringify(err)
        })
      })
  }

  Business.prototype.onSave = function() {
    var _this = this;
    var state = this.app.state;

    this.app.setState({
      error: null,
      saving: true
    })

    var body = {
      "paciente": {
        "nombre": state.nombre + ' ' + state.apellido,
        "email": state.email,
        "telefono": state.celular,
      },
      "reservacion": {
        "periodo": state.periodo,
        "jueves": state.dias.indexOf("jueves") > -1 ? state.personas : 0,
        "sabado": state.dias.indexOf("sabado") > -1 ? state.personas : 0,
        "domingo": state.dias.indexOf("domingo") > -1 ? state.personas : 0,
        "monto": state.monto,
        "saldo": state.monto,
        "total_personas": state.personas
      }
    }
    Ajax.post("/public/reservacion/book", body)
      .then(function(response) {
        if (response.httpError) throw new Error("Error")
        else if (response.serverError) throw new Error("Error")
        else if (response.apiError) throw new Error(response.message)
        else if (response.accessError) throw new Error("Error")

        _this.app.setState({
          view: "complete",
          saving: false
        });
      })
      .catch(function(e) {
        console.log(e)
        var message = e.message || "Ocurrio un error de conexion, favor intente de nuevo o contacte a roberto@3vot.com";
        _this.app.setState({
          saving: false,
          error: e.message || message
        });
      })
  }

  Business.prototype.onLogin = function(email, password) {
    var _this = Business.this;
    _this.app.state.users.forEach(function(user) {
      if (user.username == email && user.password == password) {
        _this.app.setState({
          user: user,
          view: "home"
        })
        _this.getAll();
      }
    })
  }

}

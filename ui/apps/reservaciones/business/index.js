var Ajax = require("@rodco/ion81/helpers/ajax");
var Data = require("./data");

function Business(app) {
  var _this = this;
  this.app = app;
  this.app.state = {
    periodo: "2018-1",
    view: "home",
    personas: 0,
    dias: [],
    monto: 0,
    nombre: null,
    apellido: null,
    email: null,
    celular: null,
    error: null,
    saving: false,
    stats: {
      jueves: 0,
      sabado: 0,
      domingo: 0
    }
  };
  Business.this = this;
  this.getAll();
  Business.business = Business.instance = this;
}

Business.business = Business.instance = null;

Data(Business);
module.exports = Business;

import {
  Ajax,
  Auth
} from "../../../../ion/helpers";

import createHistory from 'history/createHashHistory';

const history = createHistory();

function Business(app) {
  var _this = this;
  this.app = app;

  this.app.state = {
    view: "home"
  };
  Business.business = Business.instance = this;
  Business.instance.history = history;

}



Ajax.onUnauthorized = function() {
  alert("Parece que ha pasado mucho tiempo desde su ingreso, debemos volver a cargar la pagina.")
  window.location.reload();
}

Ajax.onNoACL = function() {
  alert("No tiene los accessos necesarios para usar este app. Comuniquese con it@rodcocr.com")
}

Ajax.onLogon = function() {
  alert("No tenemos registado su acceso, lo llevaremos al porton de entrada.")
}

Business.business = Business.instance = null;

export default Business

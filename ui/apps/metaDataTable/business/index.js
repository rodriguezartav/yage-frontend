import Ajax from "../../../helpers/ajax";
import Auth from "../../../helpers/auth";
import Data from "./data";
import createHistory from 'history/createHashHistory';
import Contents from "./contents";

const history = createHistory();

function Business(app){
  var _this = this;

  this.app = app;
  Auth.getAuthCookie();

  this.app.state={
    contents: Contents.all(),
    content: null,
    dataView: app.props.views[0].name,
    errors: []
  };
  Business.business = Business.instance = this;
  Business.instance.history = history;

  Auth.checkAuth(true)
  .then(function(success){
    if(success) return _this.init();
    else return false;
  })
}

Business.prototype.init = function(){
  var _this = this;
  var location = history.location.pathname;
  location = location.replace("/","");

  const unlisten = history.listen((location, action) => {});

  if( location == "" || location.length == 0  ) this.load(this.app.state.dataView);
  else{
    this.load(this.app.state.dataView)
    .then(function(){
      var rowId = parseInt( history.location.pathname.replace("/","") );
      _this.app.setState({ content: Contents.one(rowId) });
    })

  }
}

Ajax.onUnauthorized = function(){
  alert("Parece que ha pasado mucho tiempo desde su ingreso, debemos volver a cargar la pagina.")
  window.location.reload();
}

Ajax.onNoACL = function(){
  alert("No tiene los accessos necesarios para usar este app. Comuniquese con it@rodcocr.com")
}

Ajax.onLogon = function(){
  alert("No tenemos registado su acceso, lo llevaremos al porton de entrada.")
}

Business.business = Business.instance = null;
Data(Business);

export default Business

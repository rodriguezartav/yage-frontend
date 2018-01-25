import {Ajax,Auth} from "../../../helpers";
import UI from "../ui";
import Contents from "./contents";
import shortid from 'shortid';
import Logo from "./logo";
import Promise from "bluebird";


export default function(Business){

  Business.handleHttpError = function(){
    Logo.httpError();
    UI.toastError(new Error("(ion-e)Error de conexión a internet, revise su WIFI e intente de nuevo"));
  }

  Business.handleServerError = function(){
    Logo.httpError();
    UI.toastError(new Error("(ion-e)Ocurrio un error en el servidor, nuestro equipo ha sido notificado. Pongase en contacto con su asesor de tecnología ION."));
  }

  Business.handleApiError = function(err){
    Logo.httpError();
    UI.toastWarning(err);
  }

  Business.handleAccessError = function(){
    Logo.httpError();
    UI.toastError(new Error("(ion-e)Parece que no tiene acceso para realizar esta operación, consulte con su asesor de tecnología"));
  }

  Business.prototype.load = function(dataView){
    var _this = this;
    Logo.httpStart();
    return Ajax.get("/"+this.app.props.route+"/"+dataView)
    .then(function(results){
      if( results.httpError ) return Business.handleHttpError(results.error);
      else if( results.serverError ) return Business.handleServerError(results.error);
      else if( results.apiError ) return Business.handleApiError(results.error);
      else if( results.accessError ) return Business.handleAccessError(results.error);

      Logo.httpEnd();
      Contents.load(results, _this.app, "contents");
      if(results.length == 0) _this.app.setState({ content: {} });
      else _this.computeRows();
    })
    .catch(function(err){
      Logo.httpError();
      UI.toastError(err);
      console.log(err.stack);
    })
  }


  Business.prototype.groupActions = function(action, rows){
    var _this = this;
    var error = "";
    var deltaRows = [];
    rows.forEach(function(row){
      deltaRows.push( Contents.getDeltaObject(row) );
    })
    return Ajax.post("/"+this.app.props.route + "?name=group/"+action, deltaRows)
    .then(function(results){
      if( results.httpError ) return Business.handleHttpError(results.error);
      else if( results.serverError ) return Business.handleServerError(results.error);
      else if( results.apiError ) return Business.handleApiError(results.error);
      else if( results.accessError ) return Business.handleAccessError(results.error);

      var contents = results;
      contents.forEach(function(content){
        Contents.save(content);
        Contents.updateOriginal(content);
      })
    })
    .catch(function(err){
      UI.toastError(err);
      console.log(err.stack);
    })
  }

  Business.prototype.rowAction = function(action, row){
    var _this = this;
    var error = "";
    return Ajax.post("/"+action.route,row)
    .then(function(results){
      console.log(results);

      if( results.httpError ) return Business.handleHttpError(results.error);
      else if( results.serverError ) return Business.handleServerError(results.error);
      else if( results.apiError ) return Business.handleApiError(results.error);
      else if( results.accessError ) return Business.handleAccessError(results.error);

      var item = results;
      if(item.destroy){
        Contents.delete(item);
        Business.instance.reComputeRows();
      }
      else if( item.id ){
        Contents.save(item);
        Contents.updateOriginal(item);
        Business.instance.reComputeRows();
      }

      UI.toastSuccess("Se completo la operación");
      return item;
    })
    .catch(function(err){
      UI.toastError(err);
      console.log(err.stack);
    })
  }

  Business.prototype.save = function(content){
    var _this = this;
    var error = "";
    var delta = Contents.getDeltaObject(content);

    return Ajax.post("/"+this.app.props.route + "/save",delta)
    .then(function(results){
      if( results.httpError ) return Business.handleHttpError(results.error);
      else if( results.serverError ) return Business.handleServerError(results.error);
      else if( results.apiError ) return Business.handleApiError(results.error);
      else if( results.accessError ) return Business.handleAccessError(results.error);

      var content = results;
      Contents.save(content);
      Contents.updateOriginal(content);
      _this.app.setState({ content: null })
      _this.reComputeRows();
      UI.toastSuccess("Se guardaron los cambios");
    })
    .catch(function(err){
      UI.toastError(err);
      console.log(err.stack);
    })
  }

  Business.prototype.uploadImage = function(file){
    var _this = this;
    var fileType = file.type.split("/")[1];
    var fileName = shortid.generate() + "." + fileType;
    var query = `?file-name=${fileName}&file-type=${file.type}`
    return Ajax.get("/assets/sign"+query)
    .then(function(response){
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', response.signedRequest);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            var content = _this.app.state.content;
            if(!content.photos) content.photos = {list: []};
            content.photos.list.push({ url: "https://rodcocr.com/assets/"+ fileName });
            _this.app.setState({ content: content });
          }
          else alert("Error cargando foto")
        }
      };
      xhr.send(file);
    })
  }

  Business.prototype.onFieldUpdate = function(col,row){
    var _this = this;
    var error = "";

    return Ajax.post("/"+col.pingOnChange, row)
    .then(function(results){
      if( results.httpError ) return Business.handleHttpError(results.error);
      else if( results.serverError ) return Business.handleServerError(results.error);
      else if( results.accessError ) return Business.handleAccessError(results.error);
      else if( results.apiError ) return Business.handleApiError(results.error);

      return results;
    })

  }

  Business.prototype.loadColumns = function(route, payload){
    var _this = this;

    var promise = Ajax.post("/"+route,payload||{})
    .then(function(results){
      if( results.httpError ) return Business.handleHttpError(results.error, promise);
      else if( results.serverError ) return Business.handleServerError(new Error("Ocurrio un error en el servidor, favor intente de nuevo."), promise);
      else if( results.accessError ) return Business.handleAccessError(results.error, promise);
      else if( results.apiError ) return Business.handleApiError(results.error);

      return results;

    })
    .catch(function(err){
      UI.toastError(err);
      console.log(err.stack);
    })
    return promise;
  }


  Business.prototype.register = function(contact){
    var _this = this;
    return Ajax.post("/login/login/register", contact)
    .then( function(results){
      console.log(results);

      if( results.httpError ) return Business.handleHttpError(results.error);
      else if( results.serverError ) return Business.handleServerError(results.error);
      else if( results.accessError ) return Business.handleAccessError(results.error);
      else if( results.apiError ) return Business.handleApiError(results.error);

      Auth.setCookie("token",results.authorization_code);
      Ajax.authorization_code = results.authorization_code;

      return results;
    })
    .catch(function(err){
      UI.toastError(err);
      console.log(err.stack);
    })
  }

  Business.prototype.loginWithEmail = function(email){
    var _this = this;
    return Ajax.post("/login/login/loginWithEmail", { email: email })
    .then( function(results){
      if( results.httpError ) return Business.handleHttpError(results.error);
      else if( results.serverError ) return Business.handleServerError(results.error);
      else if( results.accessError ) return Business.handleAccessError(results.error);
      //else if( results.apiError ) return Business.handleApiError(results.error);

      return results;
    })
    .catch(function(err){
      UI.toastError(err);
      console.log(err.stack);
    })
  }

  Business.prototype.loginWithPhone = function(phone){
    var _this = this;
    return Ajax.post("/login/login/loginWithPhone", {phone: phone})
    .then( function(results){
      if( results.httpError ) return Business.handleHttpError(results.error);
      else if( results.serverError ) return Business.handleServerError(results.error);
      else if( results.accessError ) return Business.handleAccessError(results.error);
      //else if( results.apiError ) return Business.handleApiError(results.error);

      return results;
    })
    .catch(function(err){
      UI.toastError(err);
      console.log(err.stack);
    })
  }

  Business.prototype.loginWithCode = function(code){
    var _this = this;
    return Ajax.post("/login/login/validateCode",{code: code})
    .then( function(results){
      if( results.httpError ) return Business.handleHttpError(results.error);
      else if( results.serverError ) return Business.handleServerError(results.error);
      else if( results.accessError ) return Business.handleAccessError(results.error);
      else if( results.apiError ) return Business.handleApiError(new Error("(ion-e)El codigo no es valido, intente de nuevo."));

      var userId = results.first_name + " " + results.last_name;
      Auth.setCookie("token",results.authorization_code)
      Auth.setCookie("user_name",userId);
      Auth.setCookie("namespace_id", results.namespace_id);
      Ajax.authorization_code = results.authorization_code;
      Ajax.userName = userId;
      Ajax.namespace_id = results.namespace_id;

      return results;
    })
    .catch(function(err){
      UI.toastError(err);
      console.log(err.stack);
    })
  }

}

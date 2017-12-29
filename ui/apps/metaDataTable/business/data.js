import {Ajax} from "../../../helpers";
import UI from "../ui";
import Contents from "./contents";
import shortid from 'shortid';

export default function(Business){

  Business.prototype.load = function(dataView){
    var _this = this;
    return Ajax.get("/"+this.app.props.route+"/"+dataView)
    .then(function(results){
      Contents.load(results, _this.app, "contents");
      if(results.length == 0) _this.app.setState({ content: {} });
      else _this.computeRows();
    })
    .catch(function(err){
      var errors = _this.app.state.errors;
      errors.push({location: "data.js/load",error: err});
      _this.app.setState({toast: "Error cargando datos.",errors: errors})
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

  Business.prototype.groupActions = function(action, rows){
    var _this = this;
    var error = "";
    var deltaRows = [];
    rows.forEach(function(row){
      deltaRows.push( Contents.getDeltaObject(row) );
    })
    return Ajax.post("/"+this.app.props.route + "?name=group/"+action, deltaRows)
    .then(function(contents){
      contents.forEach(function(content){
        Contents.save(content);
        Contents.updateOriginal(content);
      })
    })
    .catch(function(err){
      var errors = _this.app.state.errors;
      errors.push({location: "data.js/groupActions",error: err});
      _this.app.setState({toast: "Error guardando datos.",errors: errors})
      console.log(err);
    })
  }

  Business.prototype.rowAction = function(action, row){
    var _this = this;
    var error = "";
    var delta = Contents.getDeltaObject(row);
    return Ajax.post("/"+this.app.props.route + "/"+action,delta)
    .then(function(content){
      Contents.save(content);
      Contents.updateOriginal(content);
      _this.app.setState({ content: null });
    })
    .catch(function(err){
      var errors = _this.app.state.errors;
      errors.push({location: "data.js/rowAction",error: err});
      _this.app.setState({toast: "Error guardando datos.",errors: errors})
      console.log(err);
    })
  }

  Business.prototype.save = function(content){
    var _this = this;
    var error = "";
    var delta = Contents.getDeltaObject(content);

    return Ajax.post("/"+this.app.props.route + "/save",delta)
    .then(function(content){
      Contents.save(content);
      Contents.updateOriginal(content);
      _this.app.setState({ content: null })
      _this.reComputeRows();
    })
    .catch(function(err){
      var errors = _this.app.state.errors;
      errors.push({location: "data.js/save",error: err});
      _this.app.setState({toast: "Error guardando datos.",errors: errors})
      console.log(err);
    })
  }

}

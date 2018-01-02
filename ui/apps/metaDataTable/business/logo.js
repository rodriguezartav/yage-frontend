var app;

function Logo(){
}

Logo.init = function(srcApp){
  app = srcApp
}

Logo.httpStart= function(){
  app.setState({logoAnimation: "rotate"});
}

Logo.httpEnd= function(){
 app.setState({logoAnimation: "done"});
}

Logo.httpError= function(){
 app.setState({logoAnimation: "error"});
}



module.exports = Logo;

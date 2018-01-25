import BpPromise from "bluebird";
import Ajax from "./ajax";


var Auth = {}

Auth.getAuthCookie = function(){
  var cookies = document.cookie.split('; ');
  cookies.forEach(function(cookie){
    var parts = cookie.split("=");
    if(parts[0] == "token__"+process.env.NODE_ENV) Ajax.authorization_code = parts[1];
    else if(parts[0] == "user_name__"+process.env.NODE_ENV) Ajax.userName = parts[1];
    else if(parts[0] == "namespace_id__"+process.env.NODE_ENV) Ajax.namespace_id = parts[1];
  })
}

Auth.getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return null;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

Auth.setCookie = function(name, value){
  name = name+ "__" + process.env.NODE_ENV;
  var cookie = name + "=" + value +"; Path=/;";
  if(location.href.indexOf("localhost")==-1) cookie += " Domain="+process.env.DOMAIN+"; ";
  console.log("set cookie", cookie);
  document.cookie = cookie
}


export default Auth;

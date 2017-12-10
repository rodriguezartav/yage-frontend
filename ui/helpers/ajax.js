var Ajax = {}
import Promise from "bluebird";


Ajax.getURL = function(path,params){
  if(!params) params = {};
  var url = process.env.API_URL;

  return url + path;
}

Ajax.logout = function(){
  window.location = Ajax.getURL("/operations/login/logout");
}

Ajax.checkStatus = function(path){
  var status;
  return fetch(Ajax.getURL(path),{
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': Ajax.authorization_code
    }),
    mode: "cors",
    method: "GET",
  })
  .then(function(response){
    if( response.status < 300 ) return response.json();
    else return false
  })
}

Ajax.get = function(path, params){
  var status;
  return fetch(Ajax.getURL(path,params),{
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': Ajax.authorization_code
    }),
    mode: "cors",
    method: "GET",
  })
  .then(function(response){
    status = response.status;
    if (response.status == 401 && Ajax.onUnauthorized){
      Ajax.onUnauthorized();
      throw new Error(401);
    }
    else if (response.status == 402 && Ajax.onNoACL){
      Ajax.onNoACL();
      throw new Error(402);
    }
    return response.json()
  })
  .then(function(response){
    if( status < 300 ){ return Promise.resolve( response ) }
    else return Promise.reject( new Error(response,status) )
  })
}

Ajax.post = function(path, body, params){
  var status;
  return fetch(Ajax.getURL(path,params),{
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': Ajax.authorization_code
    }),
    body: JSON.stringify(body),
    mode: "cors",
    method: "POST",
  })
  .then(function(response){
    status = response.status;
    if (response.status == 401 && Ajax.onUnauthorized){
      Ajax.onUnauthorized();
      throw new Error(401);
    }
    else if (response.status == 402 && Ajax.onNoACL){
      Ajax.onNoACL();
      throw new Error(402);
    }
    return response.json()
  })
  .then(function(response){
    if( status < 300 ){ return Promise.resolve( response ) }
    else return Promise.reject( new Error(response,status) )  })
}

Ajax.put = function(path, body, params){
  var status;
  return fetch(Ajax.getURL(path,params),{
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': Ajax.authorization_code
    }),
    body: JSON.stringify(body),
    mode: "cors",
    method: "PUT",
  })
  .then(function(response){
    status = response.status;
    if (response.status == 401 && Ajax.onUnauthorized){
      Ajax.onUnauthorized();
      throw new Error(401);
    }
    else if (response.status == 402 && Ajax.onNoACL){
      Ajax.onNoACL();
      throw new Error(402);
    }
    return response.json()
  })
  .then(function(response){
    if( status < 300 ){ return Promise.resolve( response ) }
    else return Promise.reject( new Error(response,status) )
  })
}

Ajax.delete = function(path,params){
  var status;
  return fetch(Ajax.getURL(path,params),{
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': Ajax.authorization_code
    }),
    mode: "cors",
    method: "DELETE",
  })
  .then(function(response){
    status = response.status;
    if (response.status == 401 && Ajax.onUnauthorized){
      Ajax.onUnauthorized();
      throw new Error(401);
    }
    else if (response.status == 402 && Ajax.onNoACL){
      Ajax.onNoACL();
      throw new Error(402);
    }
    return response.json()
  })
  .then(function(response){
    if( status < 300 ){ return Promise.resolve( response ) }
    else return Promise.reject( new Error(response,status) )
  })

}

export default Ajax;

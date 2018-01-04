import React from 'react';
import ReactDOM from 'react-dom';
import App from 'ion81/apps/metaDataTable/app';
import { AppContainer } from 'react-hot-loader';
import Metadata from '../../metadata';
import Menu from "../../metadata/menu.json";

const render = (Component) => {
  var App = Metadata(getParameterByName("app")||"reservaciones");
  if(!App) return document.getElementById('root').innerHTML("App Not Found");

  ReactDOM.render(
    <AppContainer>
      <Component ionName="Yage" menu={Menu} {...App} />
    </AppContainer>

   , document.getElementById('root')
  );
};


render(App);

if (module.hot){
  module.hot.accept('ion81/apps/metaDataTable/app', () => {
    render(App);
  })
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

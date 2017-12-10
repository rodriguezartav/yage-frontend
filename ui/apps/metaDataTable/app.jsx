import React from 'react'
import MetaTableApp from "./container";
import Metadata from '../../metadata';


class CxpEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount(){
    var _this = this;
    var App = Metadata(this.props.appName);

    setTimeout( function(){
      if( App.editComponent ) import(/* webpackChunkName: "clientes" */ '../../custom/' + App.editComponent ).then(Edit => {
        _this.setState({ editComponent: Edit.default });
        }).catch(error => 'An error occurred while loading the component');

      if( App.newComponent ) import(/* webpackChunkName: "clientes" */ '../../custom/' + App.newComponent ).then(New => {
        _this.setState({ newComponent: New.default });
        }).catch(error => 'An error occurred while loading the component');

    },5000 );
  }

  onPreSave(cxpItem){
    return cxpItem;
  }

 render(){
    var App = Metadata(this.props.appName);

    if(!App) return <div>App not found, sorry</div>

    return <MetaTableApp
      principalColumn={App.principalColumn}
      groupBy={App.groupBy}
      route={App.route}
      views={App.views}
      editColumns={App.editColumns}
      newColumns={App.newColumns}
      columns={App.columns}
      preSave={this.onPreSave}
      edit={this.state.editComponent}
      new={this.state.newComponent}
    />
  }

}

export default CxpEdit;

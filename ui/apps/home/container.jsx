import React from 'react'
import {GlobalHeader,PageHeader,GlobalHeaderTabs,SmartTable,AutoForm,ButtonBar}  from '../../components';
import Business from "./business"
import Menu from './menu';

import Home from "./home";
import Taita from "./taita";
import Ceremonia from "./ceremonia";
import Costos from "./reserve";
import Codigo from "./codigo";
import Style from "./style.css";

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.business = new Business(this);
  }

  onChange(type){
    this.setState({view: type});
  }

  renderContent(){
    if(this.state.view == "home") return <Home onChange={this.onChange.bind(this)} />
    else if(this.state.view == "taita") return <Taita onChange={this.onChange.bind(this)} />
    else if(this.state.view == "ceremonia") return <Ceremonia onChange={this.onChange.bind(this)} />
    else if(this.state.view == "costos") return <Costos onChange={this.onChange.bind(this)} />
    else if(this.state.view == "codigo") return <Codigo onChange={this.onChange.bind(this)} />
  }

  render(){


    return <div className="slds-m-around--large" style={{width: "60%",fontSize: 14, margin: "10px auto"}}>

      <Menu onChange={this.onChange.bind(this)} />

        {this.renderContent()}

          </div>
  }
}

export default Container;

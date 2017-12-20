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


    return <div>
    <Menu onChange={this.onChange.bind(this)} />
    <div style={{margin: "auto" }}
    className="slds-m-around--large slds slds-small-size_2-of-2 slds-large-size_6-of-12 slds-p-bottom--x-large" >


        <div className="slds-m-horizontal_small slds-m-bottom_xx-large">
        {this.renderContent()}
        </div>
          </div>


          <div style={{borderTop: "1px solid #440e62"}} className="slds-docked-form-footer">

          <a href="/reservaciones.html" className="slds-button slds-button_brand slds-m-top_xx_small">Reservar</a>
          </div>

          </div>
  }
}

export default Container;

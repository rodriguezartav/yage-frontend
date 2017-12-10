import React from 'react'
import Ajax from '../../helpers/ajax';
import numeral from "numeral";
import moment from "moment";

class ClienteAddOn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cliente: {}
    }
  }

  componentWillReceiveProps(nextProps){
      var _this = this;
      _this.setState({cliente: {} })
      return Ajax.get("/operations/salesforce/cliente?name=getOneBySfid&id="+nextProps.id)
      .then(function(result){
        _this.setState({cliente: result})
      })
      .catch(function(err){
      })
  }

  renderFields(){
    var _this = this;
    var descriptions = [];

    var keys = Object.keys(_this.state.cliente);
    keys.forEach(function(key){

      descriptions.push( <div
        key={"addonkey_"+key}
        className="slds-col slds-size--1-of-2 slds-text-color_weak slds-truncate">
        {key.replace("__c","")}
        </div>
      );

      descriptions.push( <div
        key={"addonvalue_"+ ( Math.random() * 100000 ) }
        className="slds-col slds-size--1-of-2 slds-text-color_weak slds-truncate">
          {_this.state.cliente[key] || "-"}
        </div>
      );

    })
    return descriptions;
  }

render(){
    return <div className="" onClick={this.props.onClose} >
      <div className="demo-only slds-grid">
        <div className="slds-panel slds-grid slds-grid_vertical slds-nowrap">
          <div className="slds-form slds-form_stacked slds-grow slds-scrollable_y">
            <div className="slds-panel__section slds-border_bottom">
              <h2 className="slds-truncate slds-text-heading_small slds-truncate" title={this.state.cliente.name}>
              <a className="slds-truncate">{this.state.cliente.name}</a></h2>
              <p className="slds-truncate slds-text-body_small" title="Jun 18">{this.state.cliente.direccion__c} {this.state.cliente.provincia__c}</p>
            </div>
            <div className="slds-panel__section">
              <ul>
                <li className="slds-form-element slds-hint-parent slds-border_bottom">
                  <span className="slds-form-element__label">Credito</span>
                  <div className="slds-form-element__control">
                    <span className="slds-form-element__static">{numeral(this.state.cliente.creditoasignado__c||0).format("0 a")} a {(this.state.cliente.diaspago__c ||"0")}  días, pagando {this.state.cliente.diaspago__c || this.state.cliente.plazopago__c || "n/d" } días</span>
                  </div>
                </li>
                <li className="slds-form-element slds-hint-parent slds-border_bottom">
                  <span className="slds-form-element__label">Ruta</span>
                  <div className="slds-form-element__control">
                    <span className="slds-form-element__static">{ this.state.cliente.ruta__c } de {this.state.cliente.vendedor__c }</span>
                  </div>
                </li>
                <li className="slds-form-element slds-hint-parent slds-border_bottom">
                  <span className="slds-form-element__label">Saldo</span>
                  <div className="slds-form-element__control">
                    <span className="slds-form-element__static">{ numeral(this.state.cliente.saldo__c||0).format("0 a") } ( { numeral(this.state.cliente.saldovencido__c||0).format("0 a") } vencido )</span>
                  </div>
                </li>
                <li className="slds-form-element slds-hint-parent slds-border_bottom">
                  <span className="slds-form-element__label">Visita</span>
                  <div className="slds-form-element__control">
                    <span className="slds-form-element__static">{moment(this.state.cliente.ultimavisita__c).format("MMM DD")} - {moment(this.state.cliente.proximavisita__c).format("MMM DD")}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default ClienteAddOn;

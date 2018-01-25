import React from 'react';

import AutoForm from "../autoForm";
import Toast from "../toast";
import classnames from "classnames";

class NewModal extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      columns:[],
      model: {}
    };
  }

  componentWillMount(){
    var _this = this;
    this.props.onLoadColumns(this.props.route, this.props.payload)
    .then(function(results){
      if(!results) return null;
      var model = {};
      results.columns.forEach(function(column){
        if( column.value != null ){
          model[column.name] = column.value;
        }
      })
      return _this.setState({model: model, columns: results.columns, saveRoute: results.saveRoute, title: results.title});
    })
  }

  onSave(){
    var _this = this;
    var model = this.refs.autoForm.state.model;

    var columns = this.state.columns;
    columns.forEach(function(column){
      if(column.type=="hidden" && !column.filledByPing) model[column.name] = column.value;
    })

    this.props.onSaveAction({route:this.state.saveRoute}, model)
    .then(function(result){
      if(!result) return;
      _this.setState({columns: [], saveRoute:null });
      return _this.props.onSave(result);
    })
  }

  onHideModal(){
    this.setState({columns: [], saveRoute: null });
    this.props.onClose();
  }

  onModalErrorHide(){
    this.setState({modalError: null})
  }

  onUpdate(){
    var model = this.refs.autoForm.state.model;
    this.setState({model: model})
  }

  renderError(){
    if(!this.state.modalError) return null;
    var errors = Toast.parseError(this.state.modalError);
    return <Toast onExpire={this.onModalErrorHide.bind(this)} notifications={errors} />
    return <div>{ this.state.modalError.replace("(ion-e)","") }</div>
  }

  render(){
    var height = this.props.viewHeight * 0.75;
    var columnViews = this.state.columns.map(function(column){ return column.name; })

    return <div>
    <section role="dialog" tabIndex="-1" aria-labelledby="modal-heading-01" aria-modal="true" aria-describedby="modal-content-id-1"
    className={classnames("slds-modal","slds-fade-in-open", {"slds-modal_large": this.props.size =="large"})}>
    <div className="slds-modal__container">
    <header className="slds-modal__header">

    <h2 id="modal-heading-01" className="slds-text-heading_medium slds-hyphenate">{this.state.title}</h2>
    </header>
    <div className="slds-modal__content slds-p-around_medium" id="modal-content-id-1">

      {this.renderError()}

      <AutoForm
        ref="autoForm"
        height={height}
        initialModel={this.state.model}
        columns={this.state.columns}
        columnViews={ columnViews }
        onFieldUpdate={this.props.onFieldUpdate}
        onUpdate={this.onUpdate.bind(this)}

        >
      </AutoForm>

    </div>
    <footer className="slds-modal__footer">
    <button onClick={this.onHideModal.bind(this)} className="slds-button slds-button_neutral">Cancelar</button>
    <button onClick={this.onSave.bind(this)} className="slds-button slds-button_brand">Guardar</button>
    </footer>
    </div>
    </section>
    <div className="slds-backdrop slds-backdrop_open"></div>
    </div>
  }
}

export default NewModal;

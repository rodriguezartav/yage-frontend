import React from 'react';
import Data from "./data";
import AutoForm from "../autoForm";
import Toast from "../toast";


class NewModal extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      columns:[]
    };
  }

  componentWillMount(){
    Data.onNew(this)
  }

  onNewSave(){
    var _this = this;
    var model = this.refs.autoForm.state.model;
    Data.onSave(this, model)
    .then(function(result){
      _this.props.onSave(result);
    })
    .catch(function(err){
      _this.setState({ modalError: err });
    })
  }

  onHideModal(){
    this.setState({columns: [], saveRoute: null });
    this.props.onClose();
  }

  onModalErrorHide(){
    this.setState({modalError: null})
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

    return <div  style={{height: height}}>
    <section role="dialog" tabIndex="-1" aria-labelledby="modal-heading-01" aria-modal="true" aria-describedby="modal-content-id-1" className="slds-modal slds-fade-in-open">
    <div className="slds-modal__container">
    <header className="slds-modal__header">
    <button onClick={this.onHideModal.bind(this)} className="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" title="Close">
    <svg className="slds-button__icon slds-button__icon_large" aria-hidden="true">
    <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close" />
    </svg>
    <span className="slds-assistive-text">Close</span>
    </button>
    <h2 id="modal-heading-01" className="slds-text-heading_medium slds-hyphenate">{this.props.title}</h2>
    </header>
    <div className="slds-modal__content slds-p-around_medium" id="modal-content-id-1">

      {this.renderError()}

      <AutoForm
        ref="autoForm"
        height={height}
        initialModel={{}}
        columns={this.state.columns}
        columnViews={ columnViews }
        >
      </AutoForm>

    </div>
    <footer className="slds-modal__footer">
    <button onClick={this.onHideModal.bind(this)} className="slds-button slds-button_neutral">Cancelar</button>
    <button onClick={this.onNewSave.bind(this)} className="slds-button slds-button_brand">Guardar</button>
    </footer>
    </div>
    </section>
    <div className="slds-backdrop slds-backdrop_open"></div>
    </div>
  }
}

export default NewModal;

import React from 'react';
import AutoForm from "../autoForm";
import Toast from "../toast";


class NewModal extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      columns:[],
      title: "...",
      model: {}
    };
  }

  componentWillMount(){
    var _this = this;
    this.props.onLoadColumns(this.props.route, this.props.payload)
    .then(function(results){
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
      if(column.type=="hidden") model[column.name] = column.value;
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

  renderError(){
    if(!this.state.modalError) return null;
    var errors = Toast.parseError(this.state.modalError);
    return <Toast onExpire={this.onModalErrorHide.bind(this)} notifications={errors} />
    return <div>{ this.state.modalError.replace("(ion-e)","") }</div>
  }

  onUpdate(){
    var model = this.refs.autoForm.state.model;
    this.setState({model: model})
  }

  renderWrapper(){

  }

  render(){
    var height = this.props.viewHeight * 0.75;
    var columnViews = this.state.columns.map(function(column){ return column.name; })
    return <div>
    <div className="slds-page-header slds-m-bottom_small"  >
          <div className="slds-grid">
            <div className="slds-col slds-has-flexi-truncate">
              <div className="slds-media slds-no-space slds-grow">
                <div className="slds-media__figure">
                  <span className="slds-icon_container slds-icon-standard-user" >
                    <svg className="slds-icon" aria-hidden="true">
                      <use  xlinkHref="/assets/icons/standard-sprite/svg/symbols.svg#user"></use>
                    </svg>
                  </span>
                </div>
                <div className="slds-media__body">
                  <p className="slds-text-title_caps slds-line-height_reset">Titulo</p>
                  <h1 className="slds-page-header__title slds-m-right_small slds-align-middle slds-truncate" >{this.state.title}</h1>
                </div>
              </div>
            </div>
            <div className="slds-col slds-no-flex slds-grid slds-align-top">
              <div className="slds-button-group" role="group">
                <button onClick={this.onHideModal.bind(this)} className="slds-button slds-button_neutral">Cancelar</button>
                <button onClick={this.onSave.bind(this)}  key={"save"} className="slds-button slds-button_brand">Guardar</button>
              </div>
            </div>
          </div>
        </div>
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

  }
}

export default NewModal;

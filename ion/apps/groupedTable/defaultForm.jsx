import React from 'react'
import AutoForm  from '../../components/autoForm';
import BpPromise from 'bluebird';
import Contents from "./business/contents";
import Columns from "./business/columns";

class EditForm extends React.Component {

  constructor(props) {
    super(props);
  }

  onSubmit(){
    this.props.onSubmit(this.refs.autoForm.state.model);
  }

  renderHeader(title){
    return  <div className="slds-page-header slds-m-bottom_small"  >
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
              <p className="slds-text-title_caps slds-line-height_reset">Record Type</p>
              <h1 className="slds-page-header__title slds-m-right_small slds-align-middle slds-truncate" >{title || this.props.title}</h1>
            </div>
          </div>
        </div>
        <div className="slds-col slds-no-flex slds-grid slds-align-top">
          <div className="slds-button-group" role="group">
            <button onClick={this.props.onBack} className="slds-button slds-button_neutral">Cancelar</button>
            <button key={"save"} onClick={this.onSubmit.bind(this)} className="slds-button slds-button_brand">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  }

  render(){
    var _this = this;
    var model = Contents.one(this.props.initialModel.id) || {};
    var columns = Columns.getAsArray();
    var columnViews;
    var title = ""
    if( model.id){
      columnViews = this.props.editColumns;
      title="Editando " + model[this.props.appProps.principalColumn];
    }
    else{
      title="Creando Nuevo"
      columnViews = this.props.appProps.newColumns;
    }

    return <div>
      {this.renderHeader(title)}
      <AutoForm
        ref="autoForm"
        height={this.props.height}
        initialModel={model}
        principalColumn={this.props.appProps.principalColumn}
        columns={columns}
        columnViews={ columnViews }
        onUpdateField={this.props.onFieldUpdate}
        >
      </AutoForm>

    </div>
  }
}

export default EditForm;

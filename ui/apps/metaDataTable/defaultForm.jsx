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

  renderHeader(){
    return  <div className="slds-page-header slds-m-bottom_small"  >
      <div className="slds-grid">
        <div className="slds-col slds-has-flexi-truncate">
          <div className="slds-media slds-no-space slds-grow">
            <div className="slds-media__figure">
              <span className="slds-icon_container slds-icon-standard-user" title="Description of icon when needed">
                <svg className="slds-icon" aria-hidden="true">
                  <use  xlinkHref="/assets/icons/standard-sprite/svg/symbols.svg#user"></use>
                </svg>
              </span>
            </div>
            <div className="slds-media__body">
              <p className="slds-text-title_caps slds-line-height_reset">Record Type</p>
              <h1 className="slds-page-header__title slds-m-right_small slds-align-middle slds-truncate" >{this.props.initialModel[this.props.principalColumn]}</h1>
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
    if( model.id) columnViews = this.props.editColumns;
    else columnViews = this.props.appProps.newColumns;

    return <div>
      {this.renderHeader()}
      <AutoForm
        ref="autoForm"
        height={this.props.height}
        initialModel={model}
        principalColumn={this.props.appProps.principalColumn}
        columns={columns}
        columnViews={ columnViews }
        >
      </AutoForm>

    </div>
  }
}

export default EditForm;

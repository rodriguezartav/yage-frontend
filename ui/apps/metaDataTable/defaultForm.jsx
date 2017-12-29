import React from 'react'
import AutoForm  from '../../components/autoForm';
import BpPromise from 'bluebird';
import Contents from "./business/contents";
import Columns from "./business/columns";

class EditForm extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    var _this = this;

      var model = Contents.one(this.props.initialModel.id) || {};
      var columns = Columns.getAsArray();
      var columnViews;
      if( model.id) columnViews = this.props.editColumns;
      else columnViews = this.props.appProps.newColumns;

      return <div>
        <AutoForm
          height={this.props.height}
          onSubmit={this.props.onSubmit.bind(this)}
          onBack={this.props.onBack.bind(this)}
          initialModel={model}
          principalColumn={this.props.appProps.principalColumn}
          itemActions={this.props.appProps.itemActions}
          columns={columns}
          columnViews={ columnViews }
          >
        </AutoForm>

      </div>
    }
}

export default EditForm;




import React from 'react'
import {AutoForm}  from '../../components';
import BpPromise from 'bluebird';

class EditForm extends React.Component {

  constructor(props) {
    super(props);
  }

render(){
  var _this = this;

    return <div>

      <AutoForm
      height={this.props.height}
      onSubmit={this.props.onSubmit.bind(this)}
      onBack={this.props.onBack}
      initialModel={this.props.initialModel}
      principalColumn="name"
      onActionClick={function(){console.log(arguments)}}
      itemActions={this.props.itemActions}
      columns={this.props.columns}
      columnViews={this.props.columnViews}
      >

      </AutoForm>

    </div>
  }
}

export default EditForm;




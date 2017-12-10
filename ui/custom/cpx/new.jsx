import React from 'react'
import {AutoForm}  from '../../components';
import BpPromise from 'bluebird';
import moment from "moment";


class NewForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initialModel: {
        "tipo_cambio":1,
        "tipo_de_documento":"FA",
        "plazo": 0,
        "impuesto": 0,
        "descuento": 0,
        "subtotal": 0,
        "total": 0,
        "fecha_facturacion": moment(Date.now())
      }
    }
  }

  render(){
    var _this = this;
    return <div>
      <AutoForm
      height={this.props.height}
      onSubmit={this.props.onSubmit.bind(this)}
      onBack={this.props.onBack}
      initialModel={this.state.initialModel}
      principalColumn="nombre"
      onActionClick={function(){console.log(arguments)}}
      itemActions={this.props.itemActions}
      columns={this.props.columns}
      columnViews={this.props.columnViews}
      >
      </AutoForm>
    </div>
  }
}

export default NewForm;




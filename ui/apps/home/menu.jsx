import React from 'react'

class Menu extends React.Component {

  constructor(props) {
    super(props);
  }

  onClick(e){
    this.props.onChange(e.currentTarget.dataset.type);
  }

  render(){
    var menuStyle = { padding: 5, borderBottom: "1px solid #ddd" };
    return <div className="slds-grid slds-grid_align-spread slds-m-bottom_large">

        <div style={menuStyle} className="slds-col "><a  data-type="home" onClick={this.onClick.bind(this)}>Inicio</a></div>
        <div style={menuStyle} className="slds-col "><a  data-type="ceremonia" onClick={this.onClick.bind(this)}>Sobre la Ceremonia</a></div>
        <div style={menuStyle} className="slds-col "><a   data-type="taita" onClick={this.onClick.bind(this)}>Taita Lucho</a></div>
        <div style={menuStyle} className="slds-col "><a   data-type="codigo" onClick={this.onClick.bind(this)}>Codigo de Conducta</a></div>
        <div style={menuStyle} className="slds-col "><a    data-type="costos" href="/reservaciones.html">Resevaciones</a></div>

    </div>
  }
}

export default Menu;

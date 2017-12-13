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

        <div style={menuStyle} className="slds-col "><a    data-type="costos" href="/index.html">Inicio</a></div>
        <div style={menuStyle} className="slds-col "><a    data-type="costos" href="/reservaciones.html">Resevaciones y Costos</a></div>

    </div>
  }
}

export default Menu;

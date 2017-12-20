import React from 'react'

class Menu extends React.Component {

  constructor(props) {
    super(props);
  }

  onClick(e){
    this.props.onChange(e.currentTarget.dataset.type);
  }

  render(){
    var menuStyle = { padding: 5, borderBottom: "1px solid #ddd", color: "#fff", fontSize: 12 };
    return <div style={{marginLeft: "auto",marginRight: "auto", backgroundColor: "rgb(68, 14, 98)", borderRadius: "4px",  }}
    className="slds-p-around_small slds slds-small-size_2-of-2 slds-large-size_6-of-12
    slds-m-bottom_large" >

    <div className="slds-grid slds-grid_align-spread">

        <div style={menuStyle} className="slds-col "><a    data-type="costos" href="/index.html">Inicio</a></div>
        <div style={menuStyle} className="slds-col "><a    data-type="costos" href="/reservaciones.html">Resevaciones y Costos</a></div>
        </div>

    </div>
  }
}

export default Menu;

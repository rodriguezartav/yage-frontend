import React from 'react'

class Menu extends React.Component {

  constructor(props) {
    super(props);
  }

  onClick(e){
    var type;
    var dataset = e.currentTarget.dataset;
    if(dataset && dataset.type) type = dataset.type;
    else type = e.currentTarget.getAttribute("type");
    console.log(type);
    this.props.onChange(type);
  }

  render(){
    var menuStyle = { padding: 5, borderBottom: "1px solid #ddd", color: "#fff", fontSize: 12 };
    return <div style={{marginLeft: "auto",marginRight: "auto", backgroundColor: "rgb(68, 14, 98)", borderRadius: "4px",  }}
    className="slds-p-around_small slds slds-small-size_2-of-2 slds-large-size_6-of-12
    slds-m-bottom_large" >


    <div className="slds-grid slds-grid_align-spread">

        <div style={menuStyle} className="slds-col "><a  data-type="home" onClick={this.onClick.bind(this)}>Inicio</a></div>
        <div style={menuStyle} className="slds-col "><a  data-type="ceremonia" onClick={this.onClick.bind(this)}>Sobre la Ceremonia</a></div>
        <div style={menuStyle} className="slds-col "><a   data-type="taita" onClick={this.onClick.bind(this)}>Taita Lucho</a></div>
        <div style={menuStyle} className="slds-col "><a   data-type="codigo" onClick={this.onClick.bind(this)}>Codigo de Conducta</a></div>
        <div style={menuStyle} className="slds-col "><a    data-type="costos" href="/reservaciones.html">Resevaciones</a></div>

    </div>
    </div>
  }
}

export default Menu;

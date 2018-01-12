import React from 'react'

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick(){
    if(this.props.type == "reservacion") return;
    this.props.onChange(this.props.type);
  }

  render(){
    var menuStyle = { padding: 5, borderBottom: "1px solid #ddd", color: "#fff", fontSize: 12 };

    return <div style={menuStyle} className="slds-col ">
      <a href={this.props.link || ""} onClick={this.onClick.bind(this)}>{this.props.label}</a>
    </div>

  }

}

class Menu extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){

    return <div style={{marginLeft: "auto",marginRight: "auto", backgroundColor: "rgb(68, 14, 98)", borderRadius: "4px",  }}
    className="slds-p-around_small slds slds-small-size_2-of-2 slds-large-size_6-of-12
    slds-m-bottom_large" >

      <div className="slds-grid slds-grid_align-spread">
        <MenuItem onChange={this.props.onChange} type="home" label="Inicio"/>
        <MenuItem onChange={this.props.onChange} type="ceremonia" label="Sobre la Ceremonia"/>
        <MenuItem onChange={this.props.onChange} type="taita" label="Taita Lucho"/>
        <MenuItem onChange={this.props.onChange} type="codigo" label="Codigo de Conducta"/>
        <MenuItem link="/reservaciones.html" onChange={this.props.onChange} type="reservacion" label="Reservaciones"/>
      </div>
    </div>
  }
}

export default Menu;

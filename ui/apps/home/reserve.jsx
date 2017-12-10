import React from 'react'
import Menu from './menu';

class Container extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){


    return <div className="slds-m-around--large" style={{width: "70%"}}>
            <h1>Costs y Reservaciones</h1>

            <p>Somos un grupo de amigos que traemos al Taita Lucho todos los años, lo hacemos voluntariamente
            y en nuestro tiempo libre. De esa manera les pedimos que nos avisen con tiempo si van a venir para
            organizar el hotel, la alimentación y todo lo demas de la mejor manera.</p>



          </div>
  }
}

export default Container;

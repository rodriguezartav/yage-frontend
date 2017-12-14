import React from 'react'

import Menu from './menu';

class Container extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    return <div className="slds-text-body_regular">
      <p className="slds-text-heading_small">En esta pagina encontra información acerca de la Ceremonia de Ayahuasca
      del Taita Lucho en Costa Rica.</p>

      <p>Queremos contarles que ya estan definidas las fechas para la próxima ceremonia de Ayahuasca, que serán:</p>

      <ul>
        <li>JUEVES 8 de Febrero, en la NOCHE, lleguen a las 5PM.</li>
        <li>SABADO 10 de Febrero en a las 8 AM. </li>
        <li>DOMINGO 11 de Febrero a las 7 AM. </li>
      </ul>

<br/>
      <p>La ceremonia se va realizar en una finca con bosque en Guapiles, en el mismo lugar donde se han realizado mas de
      30 ceremonias.</p>

      <p>Para participar recuerden realizar una reservacion en esta pagina lo antes posible, y
      realizar el deposito via transferencia durante el mes de Enero 2018.</p>

      <p><strong>Recuerden que este evento es realizado voluntariamente y debemos cubrir gastos a priori. Nos ayuda mucho que hagan
      sus reservaciones</strong></p>

      <p>Para los que han participado en esta experiencia ya saben del hermoso aporte que puede hacer en sus vidas, y para
      los de primera vez pueden encontrar mas información en los links de esta pagina o preguntarnos personalmente.</p>

      <p>Carolina carolina@hotmail.com</p>
      <p>Roberto roberto@3vot.com</p>
      <p>Jane janeseglau@hotmail.com</p>


      <a className="slds-button slds-button_brand slds-m-top--medium">Reservar</a>

  </div>
  }
}

export default Container;

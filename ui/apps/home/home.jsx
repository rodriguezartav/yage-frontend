import React from 'react'

import Menu from './menu';

class Container extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    return <div className="slds-text-body_regular">
      <p className="slds-text-heading_small">Ceremonias de Ayahuasca del Taita Lucho en Costa Rica.</p>

       <p>En esta página encontrará información acerca de la Ceremonia de Ayahuasca del Taita Lucho en Costa Rica.
      Queremos contarles que ya están definidas las fechas para la próxima ceremonia de Ayahuasca, que serán:</p>

      <ul className="slds-has-dividers_around-space slds-m-bottom_medium">
      <li className="slds-item">JUEVES 8 de Febrero, en la NOCHE. Lleguen a las 5 PM</li>
      <li className="slds-item">SÁBADO 10 de Febrero a las 8 AM. Lleguen a las 7 AM</li>
      <li className="slds-item">DOMINGO 11 de Febrero a las 8 AM. Lleguen a las 7 AM</li>
      </ul>

      <p className="slds-text-heading_small">Los  costos son los mismos de siempre:</p>

      <ul className="slds-has-dividers_around-space slds-m-bottom_medium">
      <li className="slds-item">1 ceremonia cuesta $150 e incluye la ceremonia y la alimentación</li>
      <li className="slds-item">2 ceremonias cuestan $350 e incluyen las ceremonias, la alimentación y el hospedaje </li>
      <li className="slds-item">3 ceremonias cuestan $500 e incluyen las ceremonias, la alimentación y el hospedaje</li>
      </ul>

      <br/>
      <p>La ceremonia se va realizar en una finca con bosque en Guápiles, en el mismo lugar donde se han realizado más de 40 ceremonias.</p>

      <p>Para participar recuerden realizar una reservación en esta página lo antes posible, y realizar el deposito vía transferencia durante el mes de Enero 2018.
      Recuerden que este evento es realizado voluntariamente y debemos cubrir gastos a priori. Nos ayuda mucho y necesitamos que hagan sus reservaciones con tiempo.</p>


      <p>Para los que han participado en esta experiencia ya saben del hermoso aporte que puede hacer en nuestras vidas, y para los de primera vez pueden encontrar más información en los links de esta página o preguntarnos personalmente.</p>

      <ul className="slds-has-dividers_around-space slds-m-bottom_medium slds-m-bottom_xx-large">
      <li className="slds-item">Carolina: carolinadada@hotmail.com</li>
      <li className="slds-item">Roberto: roberto@3vot.com</li>
      <li className="slds-item">Jane: segleau@yahoo.com</li>
      </ul>



  </div>
  }
}

export default Container;

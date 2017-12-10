import React from 'react'

import Menu from './menu';

class Container extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){

    return <div>


      <p>En esta pagina encontra información acerca de la Ceremonia de Ayahuasca del Taita Lucho en Costa Rica.</p>
      <br/>
      <div style={{padding: 7, backgroundColor: "#ddd"}}>
      <p><strong>Antes que nada queremos aclarar algo imporante:</strong> <br/>La situación actual no esta bien.
      Se esta haciendo un mal uso de las plantas como el Ayahuasca.</p>

      <p>En algunos casos por razones comerciales, en otras por puro desconocimiento o por
      creer que estos temas se aprenden en un par de meses.
      <br/>Sea por lo que sea, es normal que entre tanta confusión las personas caigan en crerse curanderos,
      organicen "retreats" con plantas poderosas como si fuera un tour en kayak sin ser parte de la cultura
      ancestral americana, sin haber aprendido de un maestro que es miembro reconocido de esa cultura
      , y lo han hecho durante muchisimos años.
      <br/>
      Muchos creen que el Ayahuasca es globalizable, tenga cuidado y no se exponga
      porque nuestras culturas originarias siempre han visto esto con total seriedad y sacredad.
      Quienes tiene muchos años de experiencia saben que como todo: con sabidura sale la luz y
      con ignorancia la oscuridad.
      </p>
      </div>
      <br/>

      <p>Nuestro enfoque es hacia la sanción. Invitamos al Taita o Abuelo Lucho desde
      el Putumayo de Colombia con su medicina, su canto y su ritual - conocimiento que ha sido
      transmitido entre Shamanes desde el principio -  y que para adquirirlo lleva sacrificios muy grandes
      por parte de los maestros que ninguno de nosotros soportaria y cuyo resultado es algo magico que
      todos experimentamos y agradecemos profundamente.</p>
      <br/>

      <p>Cada quien tiene su razón para estar aquí, pero en general es para recuperar la alegria, el amor,
      la conexión con los demas o con la natureleza. Para enfrentar el resultado de la vida moderna: sufrimiento,
      enfermedad, ansiedad... Le llamamos apagamiento.</p>

      <p>Atravez del ayahuasca y en una ceremonia seria con amor; cada quien tiene una vivencia
      interior unica e individual - verdadera y clara - que si es acompañada del autentico querer
      y con voluntad en el dia a dia puede usarse para transformar la vida.</p>
      <br/>
      <p>Esta no es una ceremonia para alucinar ni para payasear. No es un juego, ni una experiencia.
      Es una oportunidad para personas que tienen un autentico llamado, un verdadero querer de recuperarse y
      continuar con su crecimiento atravez del conocimiento adquirido en primera persona.</p>

      <a className="slds-button slds-button_brand slds-m-top--medium">Reservar</a>

  </div>
  }
}

export default Container;

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

      <p>En algunos casos por razones comerciales, "import/export", en otras por puro desconocimiento o por
      creer que estos temas se aprenden en un par de meses.
      <br/>Sea por lo que sea, es normal que entre tanta confusión las personas caigan en crerse curanderos,
      organicen "retreats" con plantas poderosas como si fuera un curso de Yoga sin tener el conocimiento real
      para hacerlo. Tenga cuidado y no se exponga porque esto es serio y sagrado para nuestras culturas originarias.
      </p>
      </div>
      <br/>

      <p>Nuestro enfoque, esta es hacia la sanción. Invitamos al Taita o Abuelo Lucho desde
      el Putumayo de Colombia con su medicina, su canto y su ritual - conocimiento que ha sido
      transmitido entre Shamanes desde el principio -  para adquirirlo lleva sacrificios muy grandes
      por parte de los maestros que ninguno de nosotros soportaria y cuyo resultado es algo magico que
      todos experimentamos y agradecemos profundamente.</p>
      <br/>

      <p>Cada quien tiene su razón para estar aquí, pero en general es para recuperar la alegria, el amor,
      la conexión con los demas o con la natureleza. Para enfrentar el resultado de la vida moderna: sufrimiento,
      enfermedad, ansiedad... Le llamamos apagamiento.</p>

      <p>Atravez del ayahuasca y en una ceremonia seria con musica y amor; cada quien tiene una vivencia
      interior unica e individual - verdadera y clara - que si es acompañada del autentico querer
      y con voluntad en el dia a dia puede usarse para transformar la vida.</p>
      <br/>
      <p>Esta no es una ceremonia para alucinar ni para tontear. No es un juego, ni una experiencia.
      Es una oportunidad para personas que tienen un autentico llamado, un verdadero querer de recuperarse y
      continuar con su crecimiento atravez del conocimiento adquirido en primera persona.</p>

      <a className="slds-button slds-button_brand slds-m-top--medium">Reservar</a>

  </div>
  }
}

export default Container;
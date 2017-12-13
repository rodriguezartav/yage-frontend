import React from 'react'

import Menu from './menu';

class Container extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    return <div className="slds-text-body_regular">
      <p className="slds-text-heading_small">En esta pagina encontra información acerca de la Ceremonia de Ayahuasca del Taita Lucho en Costa Rica.</p>


      <p>Invitamos al Taita o Abuelo Lucho desde el Putumayo de Colombia con su medicina, su canto y su ritual - conocimiento que ha sido
      transmitido entre Chamanes desde el principio -  y que para adquirirlo lleva sacrificios muy grandes
      por parte de los maestros y cuyo resultado es algo magico que todos experimentamos y agradecemos profundamente.</p>

      <p>El enfoque de la ceremonia es hacia la sanción. Cada quien tiene su razón para estar aquí, pero en general es para recuperar
      la alegria, el amor, la conexión con los demas o con la natureleza. Para enfrentar el resultado de la vida moderna: sufrimiento,
      enfermedad, ansiedad... y sus consecuencias manifestadas en vicios, problemas etc. Le llamamos apagamiento.</p>

      <p>Atravez del ayahuasca y en una ceremonia seria con amor; cada quien tiene una vivencia
      interior unica e individual - verdadera y clara - que si es acompañada del autentico querer
      y con voluntad en el dia a dia puede usarse para transformar la vida.</p>


      <div className="slds-box slds-theme_shade slds-m-bottom--medium">
      <p><strong>Antes que nada queremos aclarar algo imporante:</strong> <br/>La situación actual no esta bien.
      Se esta haciendo un mal uso de las plantas como el Ayahuasca.</p>

      <p>En algunos casos por razones comerciales, en otras por puro desconocimiento o por
      creer que estos temas se aprenden en un par de meses.</p>

     <p> Sea por lo que sea, es normal que entre tanta confusión las personas caigan en crerse curanderos,
      organicen "retreats" con plantas poderosas como si fuera un tour en kayak sin ser parte de la cultura
      ancestral americana, sin haber aprendido de un maestro que es miembro reconocido de esa cultura
      , y continuar haciendolo con su concentimiento durante muchisimos años.</p>

     <p>Muchos creen que el Ayahuasca es globalizable, van a Peru/Colombia toman un par de veces,
      encuentran un proveedor de Ayahuasca en algun lugar pobre que se las vende y se ponen un retreat en Europa,
      Estados unidos y/o Costa Rica. Es ilega en el mundo moderno y no es rechazado por el mundo ancestral.
      Nadie sabe que esta tomando ni que esta haciendo.</p>

      <p>Es posible que el Ayahuasca aun tenga efectos positivos cuando es contrabandeda de esta forma,
      pero tambien pasan cosas terribles. Tenga cuidado y no se exponga porque nuestras culturas originarias
      siempre han visto esto con total seriedad y sacredad.
      Quienes tiene muchos años de experiencia saben que como todo: con sabidura sale la luz y
      con ignorancia la oscuridad.
      </p>
      </div>

      <p>Esta no es una ceremonia para alucinar ni para payasear. No es un juego, ni una experiencia.
      Es una oportunidad para personas que tienen un autentico llamado, un verdadero querer de recuperarse y
      continuar con su crecimiento atravez del conocimiento adquirido en primera persona.</p>



      <a className="slds-button slds-button_brand slds-m-top--medium">Reservar</a>

  </div>
  }
}

export default Container;

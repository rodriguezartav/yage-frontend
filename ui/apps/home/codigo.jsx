import React from 'react'
import Menu from './menu';


class Container extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){


    return <div className="slds-m-around--large" >
    <p className="slds-text-heading_small">Codigo de Conducta</p>

      <p>En resumen, esta visitando un templo ceremonial y espiritual. Comportese acorde en todo momento
      y no se preocupe que hay personas atentas a usted y los demas.</p>

      <p className="slds-text-heading_small">Recomendaciones ( Reglas )</p>

      <p>Usar una vestimenta comoda y olgada, que cubra aproximadamente los hombros y las rodillas.</p>

      <p>Prohibido fumar, tomar licor, drogas y celular.</p>

      <p>No se puede mezclar con medicamentos psiquiatricos, consultar todos los medicamentos. Algunos no son compatibles,
      otros deben ser dejados 7 dias antes, otros 3 dias antes, con la mayoria no hay problema.</p>

      <p>No se puede salir del lugar donde se hace la ceremonia, no se puede ir al bosque, sentarse detras de un arbusto,
      meterse en el carro, ni salir a caminar durante la ceremonia. Esto es muy importante por su seguridad y por la
      convivencia y paz en la ceremonia. </p>

      <p>Los niños no necesitan Ayahuasca, no pueden participar ni estar en la ceremonia. Sin excepciones.</p>

      <p>Prohibido tocar a otras personas, incluso para ayudarlas. No tocar, abrazar, levantar,
      ayudar a otras personas durante la ceremonia, aun si son su pareja.</p>

      <p>Recuerden no tener conversaciones largar con otros participantes mientras hay gente en ceremonia.</p>

      <p>Durante la ceremonia no es un lugar para buscar pareja, se comprende especialmente en la gente joven y tambien
      se les solicita acatar esta regla.</p>

    </div>
  }
}

export default Container;

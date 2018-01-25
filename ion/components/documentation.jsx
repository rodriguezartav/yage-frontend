import React from 'react'
import PageHeader from './pageHeader'


class Documentation extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    return <div className="slds-form-element">
			  <PageHeader icon="document" title="Documentacion" description="Esto es la documentacion basica de como usar los componentes"/>
			  <div className="slds-form-element__control">
          <br/>
			    <p id="textarea-id-01" className="slds-textarea">Los pasos para la integracion de RRC se pretenten explicar de forma basica en esta seccion pero es importante la navegacion sobre el componente que se desea utilizar para integrar cada uno.</p>
          <br/>
          <p id="textarea-id-01" className="slds-textarea">Para incluir RRC en nuestro proyecto, simplemente tenemos que instalar el node_package con npm. El comando a utilizar es el siguiente `npm install --save rodco-react-components`</p>
          <br/>
          <p id="textarea-id-01" className="slds-textarea">Despues de esto para utilizarlo hacemos el import del componente deseado utilizando `import *componentes* from "rodco-react-components"`</p>
          <br/>
          <p id="textarea-id-01" className="slds-textarea">Una vez hecho el import de los componentes, nada mas los utilizamos como si fuese un html tag como se muestra en el Highlight en la parte inferior de este documento."</p>
          <br/>
          <p id="textarea-id-01" className="slds-textarea">Para utilizar de una manejara adecuada cada uno de estos componentes, es importante que se tomen en cuenta los parametros (props) a enviar en el tag ya que el componente los utilizara internamente.</p>
          <br/>
          <p id="textarea-id-01" className="slds-textarea">Para conocer cuales props son los que tenemos que utlizar, podemos navegar en el menu de la izquierda para ir viendo los Highlights de cada uno de los componentes para mayor comprension</p>
          <br/>
			  </div>
			</div>

    }

}

Documentation.demo = function(Highlight){
  return <div>
    <Documentation icon="account" title="Big Title" description="Smaller description" />
    <Highlight className='dark'>
      {'<PageHeader icon="account" title="Big Title" description="Smaller description" />'}
    </Highlight>
  </div>
}

export default Documentation;
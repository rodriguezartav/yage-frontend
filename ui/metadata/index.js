import pacientes from "./pacientes.json"
import reservaciones from "./reservaciones.json"
import pagos from "./pagos.json"

function Metadata(name){
  if( name == "pacientes" ) return pacientes;
  else if(name=="reservaciones") return reservaciones;
  else if(name=="pagos") return pagos;
}

export default Metadata

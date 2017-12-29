import pacientes from "./pacientes.json"
import reservaciones from "./reservaciones.json"


function Metadata(name){
  if( name == "pacientes" ) return pacientes;
  else if(name=="reservaciones") return reservaciones;
}

export default Metadata

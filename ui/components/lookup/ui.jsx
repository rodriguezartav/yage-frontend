var props;
var component

function UI(){

}

UI.updateLink = function(comp){
  component = comp;
}

UI.updateProps = function(nextProps){
  props = nextProps;
}


export default UI;

import React from 'react';
import classnames from "classnames";
import GlobalHeader from "../globalHeader";
import Style from "./style.css";

class GlobalHeaderTabs extends React.Component {

  constructor(props) {
    super(props);
  }


  //NOT USED _ TO DELETE
  render(){
    return <div>
    </div>
  }

}

GlobalHeaderTabs.demo = function(Highlight){
  return <div>
    <GlobalHeader type={"blue-button"}/>
    <GlobalHeaderTabs  />

    <Highlight className='dark'>
      {'<GlobalHeaderTabs  items={["contactos","opportunidades","productos","proformas"]} />'}
    </Highlight>
  </div>
}


export default GlobalHeaderTabs;




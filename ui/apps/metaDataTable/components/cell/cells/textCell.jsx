import React, {PureComponent} from 'react';
import moment from "moment";
import UI from "../../../ui";
import Toggle  from '../../../../../components/toggle';

class SelectCell extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
  }

  saveAndQuit(){
    var value = this.props.row[this.props.column.name];
    if( value != this.state.value ){
      UI.updateField(this.props.row, this.props.column, this.state.value);
    }
    this.props.stopEditing();
  }



  onClick(e){
    var _this = this;
    if(this.props.editing) return;

    if( !this.props.editing ){
      var value = this.props.row[this.props.column.name];
      this.props.onClick();
    }
  }

  onCloseOption(){
    this.props.stopEditing();
  }


  getPopOverStyle(){
    var value = this.props.row[this.props.column.name];

    var style= { position:"absolute", left: this.props.x + this.props.scrolledLeft, minWidth: this.props.style.width, maxWidth: 150 }
    if( this.props.y  < this.props.height){
      style.top= this.props.y + this.props.scrolled;
    }else{
      style.top= this.props.y + this.props.scrolled  - (this.props.style.height/2);
      style.bottom =1;
    }
    return style;
  }

  renderEdit(){
    if( !this.props.editing ) return null;
    var style = this.getPopOverStyle();
    var nubbingDirection = style.bottom > 0 ? "bottom" : "top";
    style.bottom=null;
    var value = this.props.row[this.props.column.name];

    return <section style={style} className={"slds-popover slds-nubbin_"+nubbingDirection}>
  <button  onClick={this.onCloseOption.bind(this)} className="slds-button slds-button_icon slds-button_icon-small slds-float_right slds-popover__close slds-button_icon" title="Close dialog">
    <svg className="slds-button__icon" aria-hidden="true">
      <use  xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close" />
    </svg>
    <span className="slds-assistive-text">Close dialog</span>
  </button>
  <div className="slds-popover__body" >

    <div className="">
      <textarea style={{width: "90%",height:100}}>{value.formatValue}</textarea>
    </div>


  </div>
</section>
  }

  renderView(){
    var value = this.props.row[this.props.column.name];

    return <div onClick={this.onClick.bind(this)} className="slds-truncate">
      {value.formatValue}
    </div>
  }

  render(){

    return <div>
    {this.renderView()}
    {this.renderEdit()}
    </div>
  }
}


export default SelectCell
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

  onOptionClick(e){
    var option = e.currentTarget.dataset.option;
    UI.updateField( this.props.row,this.props.column, option );
  }

  renderOptions(){
    var _this = this;
    return this.props.column.options.map(function(option){
      return <li key={option} className="slds-dropdown__item" role="presentation">
        <a data-option={option} onClick={_this.onOptionClick.bind(_this)} role="menuitem" >
          <span className="slds-truncate" title={option}>{option}</span>
        </a>
      </li>
    })
  }

  getPopOverStyle(){
    var value = this.props.row[this.props.column.name];

    var style= { position:"absolute", left: this.props.x + this.props.scrolledLeft, minWidth: this.props.style.width, maxWidth: 150 }
    if( this.props.y + (this.props.column.options.length * 45 )  < this.props.height){
      style.top= this.props.y + this.props.scrolled;
    }else{
      style.top= this.props.y + this.props.scrolled - (this.props.column.options.length * 45 ) - (this.props.style.height/2);
      style.bottom =1;
    }
    return style;
  }

  renderEdit(){
    if( !this.props.editing ) return null;
    var style = this.getPopOverStyle();
    var nubbingDirection = style.bottom > 0 ? "bottom" : "top";
    style.bottom=null;

    return <section style={style} className={"slds-popover slds-nubbin_"+nubbingDirection}>
  <button  onClick={this.onCloseOption.bind(this)} className="slds-button slds-button_icon slds-button_icon-small slds-float_right slds-popover__close slds-button_icon" title="Close dialog">
    <svg className="slds-button__icon" aria-hidden="true">
      <use  xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close" />
    </svg>
    <span className="slds-assistive-text">Close dialog</span>
  </button>
  <div className="slds-popover__body" >

    <div className="">
      <ul className="slds-dropdown__list" role="menu">
       {this.renderOptions()}
      </ul>
    </div>


  </div>
</section>
  }

  renderView(){
    var value = this.props.row[this.props.column.name];

    return <div onClick={this.onClick.bind(this)} className="slds-badge slds-align_absolute-center">
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

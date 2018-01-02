import React, {PureComponent} from 'react';
import moment from "moment";
import UI from "../../../ui";
import Toggle  from '../../../../../components/toggle';

class ListCell extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {

      value: null
    }
  }

  saveAndQuit(){
    var value = this.props.row[this.props.column.name];
    var newText = this.state.value;
    if(value.objectClass.indexOf(newText) == -1){
      value.objectClass.push(newText);
    }

    UI.updateField(this.props.row, this.props.column, value.objectClass.join(this.props.column.separator));
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
    this.setState({ editing: false, value: null });
    this.props.stopEditing();
  }

  onOptionClick(e){
    var value = this.props.row[this.props.column.name];

    var text = e.currentTarget.dataset.option;
    var index = value.objectClass.indexOf( text );
    if( index > -1 ){
      value.objectClass.splice(index,1);
    }
    UI.updateField(this.props.row, this.props.column, value.objectClass.join(this.props.column.separator));
    this.props.stopEditing();
  }

  onKeyPress(e){
    if(e.key == 'Enter') return this.saveAndQuit();
  }

  onChange(e){
    var text = e.currentTarget.value;
    this.setState({value: text });
  }

  renderOptions(){
    var _this = this;
    var value = this.props.row[this.props.column.name];

    return value.objectClass.map(function(option){
      return <li key={option} className="slds-dropdown__item" >
        <a role="menuitem" >
          <span className="slds-truncate" title={option}>{option}</span>
          <button data-option={option} onClick={_this.onOptionClick.bind(_this)}
          className="slds-button slds-button_icon slds-button_icon-small slds-float_right slds-button_icon" >
            <svg className="slds-button__icon" aria-hidden="true">
              <use  xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#ban" />
            </svg>
          </button>
        </a>
      </li>
    })
  }

  getPopOverStyle(){
    var value = this.props.row[this.props.column.name];
    var width = this.props.style.width;
    if( width < 80 ) width = 80;
    var style= { position:"absolute", left: this.props.x + this.props.scrolledLeft - 50, minWidth: width }
    if( this.props.y + (value.objectClass.length * 45 )  < this.props.height){
      style.top= this.props.y + this.props.scrolled;
    }else{
      style.top= this.props.y + this.props.scrolled - (value.objectClass.length * 45 ) - (this.props.style.height/2);
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
  </button>
  <div className="slds-popover__body" >

    <div className="">
    <div className="slds-form-element add-input" style={{width: "80%"}}>
      <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
        <svg className="slds-icon slds-input__icon slds-input__icon_left slds-icon-text-default" aria-hidden="true">
          <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#add" />
        </svg>
        <input onChange={this.onChange.bind(this)} onKeyPress={this.onKeyPress.bind(this)} ref="txt_add_item" type="text" className="slds-input "  />
      </div>
    </div>

      <ul className="slds-dropdown__list" role="menu">
       {this.renderOptions()}
      </ul>
    </div>


  </div>
</section>
  }

  renderView(){
    var value = this.props.row[this.props.column.name];

    var listItems = value.objectClass;
    var classes="slds-p-top_xx-small";

    var items= listItems.map(function(item){
      return <span key={item} className="slds-badge">
        { item}
      </span>
    })

    if( items.length == 0){
      classes="";
      items = [<button style={{opacity: 0.2 }} key="add" onClick={this.onClick.bind(this)}
          className="slds-button slds-button_icon slds-button_icon-small slds-button_icon" >
            <svg className="slds-button__icon" aria-hidden="true">
              <use  xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#add" />
            </svg>
          </button>]
    }

    return <div className={classes} onClick={this.onClick.bind(this)}>
      {items}
    </div>
  }

  render(){

    return <div>
    {this.renderView()}
    {this.renderEdit()}
    </div>
  }
}


export default ListCell

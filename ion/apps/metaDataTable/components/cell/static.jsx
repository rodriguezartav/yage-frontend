import React, {PureComponent} from 'react';
import moment from "moment";
import UI from "../../ui";
import IconButton from "../../../../components/iconButton";
import classnames from "classnames";
import Ops from "../../business/ops";

class Cell extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  }

  componentWillUnmount(){
    UI.deRegisterStaticCell(this);
  }

  saveAndQuit(){
    UI.deRegisterStaticCell(this);
  }

  resetEdit(){
    this.setState({ editing: false })
  }

  onIconClick(e){
    var _this = this;
    if(this.state.editing){
      UI.deRegisterStaticCell();
      this.setState({ editing: false, value: null, x: 0 , y: 0, bottom: 0 })
    }

    else if( !this.state.editing ){
      var value = this.props.row[this.props.column.name];
      var rect = this.refs.src_icon_wrapper.getBoundingClientRect();
      UI.registerStaticCell(this)
      this.setState({ editing: true, value: value.originalValue, x: rect.left - this.props.xOffset , y: rect.y - 100, bottom: rect.bottom })
    }
  }

  onClick(e){
    UI.onRowClick(this.props.row.id)
  }

  onCloseOption(){
    this.setState({ editing: false });
  }

  onActionClick(e){
    var action;
    var dataset = e.currentTarget.dataset;
    if(dataset && dataset.action) action = dataset.action;
    else action = e.currentTarget.getAttribute("action");
    UI.onActionClick(this.props.row.id, JSON.parse(action));
  }

  renderActions(){
    var _this = this;
    return this.props.listColumnsActions.map(function(action){
      return <li key={action.name} className="slds-dropdown__item" role="presentation">
        <a className="action-popover" data-action={JSON.stringify(action)}  onClick={_this.onActionClick.bind(_this)} role="menuitem" >

          <svg className="slds-icon slds-icon_x-small slds-icon-text-default slds-m-right_small slds-shrink" aria-hidden="true">
            <use xlinkHref={"/assets/icons/utility-sprite/svg/symbols.svg#"+action.icon} />
          </svg>
          <span className="slds-truncate" title={action.name}>{action.name}</span>
        </a>
      </li>
    })
  }

  getPopOverStyle(){
    var value = this.props.row[this.props.column.name];
    var style= { position:"absolute", left: this.props.xOffset, minWidth: this.props.style.width, maxWidth: 200 }

    if( this.state.y - (this.props.listColumnsActions.length * 45 )  <  0 ){
      style.top= this.props.scrolled;
    }
    else if( this.state.y + (this.props.listColumnsActions.length * 45 )  < this.props.height){
      style.top= this.state.y + this.props.scrolled;
    }else{
      style.top= this.state.y + this.props.scrolled - (this.props.listColumnsActions.length * 27 );
      style.bottom =1;
    }
    return style;
  }

  renderEdit(){
    if( !this.state.editing ) return null;
    var style = this.getPopOverStyle();
    style.bottom=null;

    return <section style={style} className={classnames("slds-popover", { "slds-nubbin_left": ( style.top > 0 )  } ) } >
      <button  onClick={this.onCloseOption.bind(this)} className="close-btn slds-button slds-button_icon slds-button_icon-small slds-float_right slds-popover__close slds-button_icon" title="Close dialog">
        <svg className="slds-button__icon" aria-hidden="true">
          <use  xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close" />
        </svg>
      </button>
      <div className="slds-popover__body" >

        <div className="slds-dropdown_left">
          <ul className="slds-dropdown__list" role="menu">
           {this.renderActions()}
          </ul>
        </div>


      </div>
    </section>
  }

  renderIcon(){
    var _this = this;
    var actions = this.props.listColumnsActions || [];
    if( this.props.scrollingY || actions.length == 0) return null;
    return <div className={classnames({"not-editing": !this.state.editing ,"editing": this.state.editing })} style={{position: "absolute", right: 3, top: 5}}>
      <IconButton noBorder="true" onClick={ _this.onIconClick.bind(_this) } icon="switch" />
    </div>
  }

  renderView(){
    var _this = this;
    var value = this.props.row[this.props.column.name];

    return <div className="" ref="src_icon_wrapper" style={{ position: "relative" }}>
      <div  onClick={this.onClick.bind(this)} className="slds-truncate text-button"><a>{value.formatValue}</a></div>
      {this.renderIcon()}
    </div>
  }

  getColor(){
    var sortedbyValue = this.props.sortedBy;
    if( !sortedbyValue ) return "color0";
    var groupFieldDetails = this.props.groupFields.details[sortedbyValue.formatValue];
    if(!groupFieldDetails) return "color0";
    return "color"+groupFieldDetails.index;
  }

  render(){

    this.props.groupFields

    var classes = "slds-col content-cell slds-truncate content-static-cell"
    if( this.state.editing ) classes+="";
    classes += " " + this.getColor();

    return <div
      style={this.props.style}
      className={classes}
    >
    {this.renderView()}
    {this.renderEdit()}
    </div>
  }
}

export default Cell

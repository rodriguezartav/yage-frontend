import React, {PureComponent} from 'react';
import moment from "moment";
import UI from "../../ui";
import IconButton from "../../../../components/iconButton";
import classnames from "classnames";
import Ops from "../../business/ops";
import numeral from "numeral"

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

  onGroupHeaderClick(){
    if(this.props.isStatic) UI.onGroupHeaderClick(this.props.row.header, true);

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
    if(!this.props.isStatic){
      if( this.props.row._headerOptions.hasTitle && ( this.props.column.type =="integer" || this.props.column.type == "number" ) && this.props.column.totalize ){
        return <div className="slds-text-align_right slds-text-title">{numeral(this.props.column.total).format("0,0.00")}</div>;
      }
      return null;
    }

    if(!this.props.row._headerOptions || !this.props.row._headerOptions.hasTitle) return null;



    return <div  className="" ref="src_icon_wrapper" style={{ position: "relative" }}>
      <div className="slds-truncate text-button ">
        <span className="slds-badge_wrapper">
          <IconButton onClick={this.onGroupHeaderClick.bind(this)} noBorder="true" icon="switch" />
          <span className={"slds-badge color" + this.props.row._headerOptions.index}>{this.props.row._headerOptions.name}</span>
        </span>
        {this.props.row.isClosed ?
        <span className="slds-m-right_small slds-float_right group-cell-header-count">
          <span className="slds-text-title group-cell-header-count-title">{this.props.row._headerOptions.count > 0 ? "Count " : ""}</span>
          <span className="slds-text-title">{this.props.row._headerOptions.count}</span>
          </span>
          : null }
      </div>

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

    var classes = "slds-col group-cell"
    if(this.props.row.header && this.props.isStatic) classes +=  " group-cell-static-header ";
    if(this.props.row.isClosed && this.props.isStatic ) classes += " group-cell-header_closed"
    if(this.props.row.header && !this.props.isStatic) classes +=  " group-cell-header ";

    return <div
      style={this.props.style}
      className={classes}
      onClick={this.onGroupHeaderClick.bind(this)}
    >
    {this.renderView()}
    </div>
  }
}

export default Cell

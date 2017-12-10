import React from 'react';
import UI from "./ui";
import moment from 'moment';
import {Image,CloudinaryContext,Transformation} from 'cloudinary-react';

class ContentCell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
  }

  onClick(){
    if(!this.state.selected) this.setState({ selected: true });
    else this.setState({ selected: false });
  }

  onActionClick(e){
    UI.onActionClick( this.props.row.id, e.currentTarget.dataset.action);
    this.setState({ selected: false });
  }

  onExpandClick(e){
    UI.onRowClick(this.props.row.id);
  }

  renderClickOption(action,description){
    return <div className="slds-media slds-media_center">
      <div className="slds-media__figure">
        <span data-action={action} onClick={this.onActionClick.bind(this)} className="slds-icon_container" title="description of icon when needed">
          <svg className="slds-icon slds-icon_small slds-icon-text-default" aria-hidden="true">
            <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#touch_action"></use>
          </svg>
          <span className="slds-assistive-text">Description of icon</span>
        </span>
      </div>
      <div className="slds-media__body">
        <p>{description}</p>
      </div>
    </div>
  }

  renderPrincipalCell(){

    var contentText = this.props.row[this.props.column.title]
    if(contentText) contentText=contentText.toLowerCase();
    else contentText = "N/D";
    return <td className="content-cell content-cell_header" >
      <div className="slds-truncate rdc-right-click" title={contentText}>
        <a className="slds-capitalize" onClick={this.onExpandClick.bind(this)}>
          { contentText }
        </a>
      </div>
    </td>
  }

  styleBoolean(value){
    var type = "check";
    if(!value) type = "close";
    return <span className="slds-icon_container slds-icon-utility-announcement" title="Description of icon when needed">
      <svg className="slds-icon slds-icon-text-default slds-icon_xx-small" aria-hidden="true">
        <use xlinkHref={"/assets/icons/utility-sprite/svg/symbols.svg#"+ type}></use>
      </svg>
      <span className="slds-assistive-text">Description of icon</span>
    </span>
  }

  styleRadio(value){
    var type = this.props.column.options.indexOf(value);
    if(type>3) type = 3;
    return <span className={"slds-badge slds-text-body_small type_" + type}>
      {value}
    </span>
  }

  styleLookup(value){
    var index = 0;
    var count = 0;
    return <span className={"slds-text-body_xx-small slds-display_block slds-m-right_xx-small"}>
      {this.props.column.itemsMap[value][this.props.column.principalColumn]}
    </span>
  }

  styleMultiLookup(value){
    if(!value) return null;
    var _this = this;
    var items = [];
    var ids = value.split(",");
    var column = this.props.column;

    return ids.map(function(id){
      var intId = parseInt(id);
      if(intId > 0 == false) intId = id;
      return <span key={"multiLookup_" + id} className={"slds-text-body_xx-small slds-display_block slds-m-right_xx-small"}>
        {column.itemsMap[intId][column.principalColumn]}
      </span>
    })
  }

  styleDate(value){
    if(!value) return null;
    return <span>{ moment(value).format("DD-MMM YYYY") }</span>;
  }

  stylePhotos(value){
    if( !value || !value.list ) return null;
    var photos = value.list.map(function(photo){
      var image = photo.url.replace("http://rodcocr.com/","").replace("https://rodcocr.com/","");

     return  <div className="slds-m-left_xx-small" key={photo.url}>
     <a href={photo.url} target="_blank">
      <img src="http://via.placeholder.com/15x15" />
      </a>
    </div>
    })
    return <div className="slds-grid">{photos}</div>
  }

  styleNormalCell(value){
    if(this.props.column.type == "lookup") return this.styleLookup(value);
    else if(this.props.column.type == "multilookup") return this.styleMultiLookup(value);
    else if( this.props.column.type == "radio" ) return this.styleRadio(value);
    else if( this.props.column.type == "boolean" ) return this.styleBoolean(value);
    else if( this.props.column.type == "date" ) return this.styleDate(value);
    else if( this.props.column.type == "photos" ) return this.stylePhotos(value);
    else return value;
  }

  renderNormalCell(){
    var key = this.props.column.title;
    var value = this.props.row[key]
    if(this.props.column.compound){
      var parts = this.props.column.title.split(".");
      if(!this.props.row[parts[0]]) value= null;
      else value = this.props.row[parts[0]][parts[1]];
    }

    return <td className={"content-cell content-cell-style_"+ this.props.column.type  } >
        <div className="slds-truncate" title={value}>
        { this.styleNormalCell(value) }
      </div>
      </td>
  }

  render(){
    if( this.props.isHeader ) return this.renderPrincipalCell();
    else return this.renderNormalCell();

  }
}
  export default ContentCell;

import React, {PureComponent} from 'react';
import UI from "../../ui";
import Ops from "../../business/ops";
import IconButton from "../../../../components/iconButton";
import numeral from "numeral";

class GroupPlaceHolder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onGroupClick(e){
    var field = e.currentTarget.dataset.field;
    UI.onScrollGroupClick(field);
  }

  renderItem(field, details){
    if(!details) details={}
    var color = "color" + details.index;

    return  <div key={field}>
        <div
        data-field={field}
        style={{margin: "5px auto", cursor: "pointer", textAlign: "center", color: "#999"}}
        className={"slds-text-title"}
        onClick={this.onGroupClick.bind(this)}>
          <div><span className={"slds-badge slds-badge_small slds-m-bottom_xx-small "+color}>{field}</span></div>
          <div>
            <span className={"slds-badge slds-badge_small "+color}>{details.count}</span>

            <span className={"slds-badge slds-badge_small "+color}>{numeral(details.sum).format("0a")}</span>
          </div>
        </div>
        <div style={{ borderRadius: 15,width: "0.4rem",border:"0.04rem solid #999", height: 26, backgroundColor: "#26336d",opacity:0.9, margin: "7px auto" }}></div>
    </div>
  }

  render(){
    var _this =this;
    if( this.props.groupFieldDiversity > Ops.diversityThesrshold ) return null;

    var groupItems = this.props.groupFields.unique.map(function(field){
      return _this.renderItem(field, _this.props.groupFields.details[field]);
    })

    return <div className="slds-p-top_small slds-p-horizontal_xx-small" style={{height: this.props.height, overflow: "scroll"}} >
    <div className="" style={{width: 100, overflow: "hidden" }}>
      {groupItems}
    </div>
    </div>



  }
}


export default GroupPlaceHolder



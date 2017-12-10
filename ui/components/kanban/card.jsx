import React from 'react';
import Menu from "../menu"
import moment from "moment";
import numeral from "numeral";

class Card extends React.Component {

  constructor(props) {
    super(props);
  }

  onItemClick(){
    this.props.onItemClick(this.props.row.id);
  }

  onPrincipalColumnClick(e){
    var addon = e.currentTarget.dataset.addon;
    var field = e.currentTarget.dataset.field;
    this.props.onShowAddOn(addon, this.props.row[field]);
    e.preventDefault();
    e.stopPropagation();

  }

  renderDescriptionWithDetails(descriptions, row, description){
    var value = row[description.key];
    if(value==null) return null;
    if( description.format == "number" ) value = numeral(value).format("0,0.00");
    else if( description.format == "date" ) value = moment(value).format("DD MMM YYYY")

    descriptions.push( <dt
      key={"key_"+description.key}
      className="slds-item_label slds-text-color_weak slds-truncate">
      {description.title}
      </dt>
    );

    descriptions.push( <dd
      key={"value_"+value}
      className="slds-item_detail slds-text-color_weak slds-truncate">
        {value}
      </dd>
    );
  }

  renderDescription(descriptions, row, description){
    descriptions.push( <dt
      key={description}
      className="slds-item_label slds-text-color_weak slds-truncate">
      {description}
      </dt>
    );

    descriptions.push( <dd
      key={row[description]}
      className="slds-item_detail slds-text-color_weak slds-truncate">
      {row[description]}
      </dd>
    );
  }

  renderDescriptions(row){
  	var _this = this;
  	var descriptions = [];
    this.props.kanbanColumn.details.forEach(function(description){
      if( description.key ) _this.renderDescriptionWithDetails(descriptions, row, description)
      else if(!row[description]) return null;
      else _this.renderDescription(descriptions,row,description);
  	})

  	return <dl className="slds-list_horizontal slds-wrap slds-text-body_small">
      {descriptions}
    </dl>
  }


  renderPrincipalColumn(row){
    var _this = this;
    var name = row[_this.props.principalColumn];
    var action = _this.props.principalColumnAction || false;

    if(action){
      return <a onClick={_this.onPrincipalColumnClick.bind(_this)} data-addon={action.addon} data-field={action.field} >
        {name}
      </a>
    }
    else return <a>
      {name}
    </a>
  }

  render(){
  	var _this = this;
    var row = this.props.row;

  	var icon = "/assets/icons/standard-sprite/svg/symbols.svg#" + this.props.icon;

      return <div key={row.id} onClick={_this.onItemClick.bind(_this)} className="slds-card kanban-card">
        <div className="">
			    <div className="">
			      <div className="slds-popover__header">

              <Menu
                context={row}
                onSelect={_this.props.onRowAction}
                positionRight={true}
                items={_this.props.rowActions}
              />

              <header className="slds-media slds-media_center slds-m-bottom_xx-small">
                <span className="slds-icon_container slds-icon-standard-account slds-media__figure">
                  <svg className="slds-icon slds-icon_small" aria-hidden="true">
                    <use xlinkHref="/assets/icons/standard-sprite/svg/symbols.svg#account" />
                  </svg>
                </span>

                <div className="slds-media__body">
                  <p className="slds-text-heading_medium slds-hyphenate" id="panel-heading-id">
                    {this.renderPrincipalColumn(row)}
                  </p>
                </div>
              </header>
              { _this.renderDescriptions(row) }
            </div>
			   </div>
			</div>
    </div>

  }
}
export default Card;

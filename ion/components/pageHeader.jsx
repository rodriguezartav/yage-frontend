import React from 'react';


class PageHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    return  <div className="slds-page-header">
      <div className="slds-grid">
        <div className="slds-media slds-col ">
          <div className="slds-media__figure">
            <span className="slds-icon_container slds-icon-standard-account" title="Description of icon when needed">
              <svg className="slds-icon " aria-hidden="true">
                <use xlinkHref={"/assets/icons/standard-sprite/svg/symbols.svg#"+this.props.icon}></use>
              </svg>
            </span>
          </div>
          <div className="slds-media__body">
            <h1 className="slds-page-header__title slds-truncate slds-align-middle">{this.props.title}</h1>
            <p className="slds-text-body_small slds-line-height_reset">{this.props.description}</p>
          </div>
        </div>

        <div className="slds-col slds-float--right slds-no-flex">
          <div className="slds-button-group" role="group">
            {this.props.children}
        </div>
      </div>
    </div>
  </div>

  }

}

PageHeader.demo = function(Highlight){
  return <div>
    <PageHeader icon="account" title="Big Title" description="Smaller description" />
    <Highlight className='dark'>
      {'<PageHeader icon="account" title="Big Title" description="Smaller description" />'}
    </Highlight>
  </div>
}

export default PageHeader;

import React from 'react'


class Toast extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    var _this = this;
    setTimeout( function(){
      if(_this.props) _this.props.onExpire()
    },3500)
  }

  componentWillUnmount(){
  }

  render(){
     return  <div className="slds-notify_container ">
      <div className="slds-notify slds-notify_toast slds-theme_info" role="alert">
      <span className="slds-assistive-text">info</span>
      <span className="slds-icon_container slds-icon-utility-info slds-m-right_small slds-no-flex slds-align-top" title="Description of icon when needed">
      <svg className="slds-icon slds-icon_small" aria-hidden="true">
        <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#info"></use>
      </svg>
      </span>
      <div className="slds-notify__content">
      <h2 className="slds-text-heading_small">{this.props.message}</h2>
      </div>

      </div>
      </div>

  }

}

Toast.demo = function(Highlight){
  return <div>
    <Toast message="test" />
    <br/><br/><br/><br/>
    <Highlight className='dark'>
      {'<Toast message="test" />'}
    </Highlight>
  </div>
}


export default Toast;



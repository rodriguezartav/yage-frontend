import React from 'react'

class ToastNotification extends React.Component{

  constructor(props) {
    super(props);
  }

  onExpire(){
    this.props.onExpire(this.props.notification)
  }

  componentDidMount(){
    var _this = this;

    var timeMap={
      error: 3000,
      info: 2000,
      success: 1500,
    }

      if(this.props.notification.dismiss=="auto"){
      setTimeout( function(){
        if(_this.props) _this.props.onExpire(_this.props.notification)
      },timeMap[this.props.notification.type]*this.props.index)
    }
  }

  render(){


    return  <div className={"slds-notify slds-notify_toast slds-theme_"+this.props.notification.type} role="alert">

           <span className={"slds-icon_container  slds-m-right_small slds-no-flex slds-align-top slds-icon-utility-"+this.props.type}>
             <svg className="slds-icon slds-icon_small" aria-hidden="true">
               <use xlinkHref={"/assets/icons/utility-sprite/svg/symbols.svg#"+this.props.notification.type} />
             </svg>
           </span>
           <div className="slds-notify__content">
             <h2 className="slds-text-heading_small">{this.props.notification.message}</h2>
           </div>
           <button onClick={this.onExpire.bind(this)} className="slds-button slds-button_icon slds-notify__close slds-button_icon-inverse" title="Close">
             <svg className="slds-button__icon slds-button__icon_large" aria-hidden="true">
               <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close" />
             </svg>

           </button>
         </div>

  }

}

class Toast extends React.Component {

  constructor(props) {
    super(props);
  }

  onExpire(notification){

    this.props.onExpire(notification);
  }

  renderNotifications(){
    var _this = this;
    var notifications = [];
    var index =0;
    this.props.notifications.forEach( function(notification){
      index++
      if(notification.dismissed == false) notifications.push(
        <ToastNotification
          key={"notification" + index}
          onExpire={_this.onExpire.bind(_this)}
          index={index}
          notification={notification}
        />
      )
    })

    return notifications;
  }

  render(){

     return  <div className="slds-notify_container ">
      {this.renderNotifications()}
      </div>
  }

}

Toast.parseError = function(err){
  var message = "Error inesperado enviando datos, el error fue registrado. Intente de nuevo.";
  if( err.message && err.message.indexOf("ion-e") > -1 ) message = err.message;

  var messages = message.split("<br/>");

  var messagesArray = messages.map(function(message){ return {
    type: "error",
    message: message.replace("(ion-e)",""),
    stack: err.stack,
    error: JSON.stringify(err),
    dismissed: false,
    dismiss:"manual"
  } })

  return messagesArray;
}

export default Toast;

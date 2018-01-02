import React, {PureComponent} from 'react';
import moment from "moment";
import UI from "../../../ui";
import Toggle  from '../../../../../components/toggle';


function BaseCell(WrappedComponent) {

  return class SelectCell extends React.PureComponent {

    constructor(props) {
      super(props);
      this.state = {
        editing: false
      }
    }

    componentWillUnmount(){
      UI.deRegisterEditCell(this);
    }

    resetEdit(){
      this.setState({ editing: false })
    }

    stopEditing(){
      UI.deRegisterEditCell(this);
      this.setState({ editing: false })
    }

    onClick(e){
      var _this = this;
      if( this.props.column.editable==false ) return this.renderNotEditable();
      var rect = this.refs.wrapper.getBoundingClientRect();

      this.setState({ editing: true, x: rect.left - this.props.xOffset , y: rect.y - 100 })
      UI.registerEditCell(this)
    }

    renderNotEditable(){
      var _this = this;
      var originalColor = this.refs.wrapper.style["border-color"];
      this.refs.wrapper.style["border-color"] = "red";
      setTimeout(function(){
        _this.refs.wrapper.style["border-color"] = originalColor;
      },300);
      setTimeout(function(){
        _this.refs.wrapper.style["border-color"] = "red";
      },500);
      setTimeout(function(){
        _this.refs.wrapper.style["border-color"] = originalColor;
      },1000);
    }


    render(){
      var classes = "slds-col content-cell slds-truncate content-cell-"+this.props.column.type
      if( this.state.editing ) classes+=" content-cell_edit";

      return <div ref="wrapper"
        style={this.props.style}
        className={classes}
      >

      <WrappedComponent
        stopEditing={this.stopEditing.bind(this)}
        editing={this.state.editing}
        onClick={this.onClick.bind(this)}
        x={this.state.x}
        y={this.state.y}
          {...this.props}

        />


      </div>
    }
  }
}

export default BaseCell

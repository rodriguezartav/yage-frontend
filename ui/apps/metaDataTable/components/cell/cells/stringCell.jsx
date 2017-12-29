import React, {PureComponent} from 'react';
import moment from "moment";
import UI from "../../../ui";
import Toggle  from '../../../../../components/toggle';

class StringCell extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
  }

  saveAndQuit(){
    var value = this.props.row[this.props.column.name];

    if( value != this.state.value ){
      UI.updateField(this.props.row, this.props.column, this.state.value);
    }
    this.props.stopEditing();
  }


  onClick(){
    var _this = this;
    if(this.props.editing) return;

    var value = this.props.row[this.props.column.name];

    this.setState({ value: value.originalValue })
    setTimeout(function(){
      if(_this.refs.txt_edit_input) _this.refs.txt_edit_input.focus();
    }, 100)

    this.props.onClick();
  }

  onKeyPress(e){
    if(e.key == 'Enter') return this.saveAndQuit();
  }

  onChange(e){
    var text = e.currentTarget.value;
    this.setState({value: text });
  }

  renderEdit(){
    var value = this.props.row[this.props.column.name];
    return <input className="slds-input edit-input" ref="txt_edit_input"
    onChange={this.onChange.bind(this)} value={this.state.value}
    onKeyPress={this.onKeyPress.bind(this)}
    />
  }

  renderView(){
    var value = this.props.row[this.props.column.name];
    return <div onClick={this.onClick.bind(this)}>{ value.formatValue }</div>
  }

  render(){
    if(this.props.editing) return this.renderEdit()
    else return this.renderView()
  }
}



export default StringCell

import React, {PureComponent} from 'react';
import moment from "moment";
import UI from "../../../ui";

class ArrayList extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
  }

  onClick(e){
    var _this = this;
    if(this.props.editing) return;

    var index = e.currentTarget.dataset.index;
    var item = this.props.row[this.props.column.name].formatValue[index];

    this.setState({item: item, index: index})

    var value = this.props.row[this.props.column.name];
    this.props.onClick();
  }

  onCloseOption(){
    this.props.stopEditing();
  }

  onNext(){
    var list = this.props.row[this.props.column.name].formatValue;
    var item;
    var index = this.state.index;
    if(index < list.length) index++;
    item = this.props.row[this.props.column.name].formatValue[index];
    if(item) this.setState({index: index, item: item });
  }

  onLast(){
    var list = this.props.row[this.props.column.name].formatValue;
    var item;
    var index = this.state.index;
    if( index > 0 ) index--;
    var item = this.props.row[this.props.column.name].formatValue[index];
    this.setState({index: index, item: item })
    if(item) this.setState({index: index, item: item });
  }



  renderItem(){
    var item = this.state.item;
    var items = [];
    return <img style={{width: "100%"}} src={ item.url || item } />
  }

  onScroll(e){
    e.stopPropagation();
  }

  renderEdit(){
    if( !this.props.editing ) return null;

    return <div>
      <section style={{height: "100%"}} onScroll={this.onScroll.bind(this)} role="dialog" tabIndex="-1" aria-labelledby="modal-heading-01" aria-modal="true" aria-describedby="modal-content-id-1" className="slds-modal slds-fade-in-open slds-modal_large">
      <div style={{height: "100%"}} className="slds-modal__container">
      <header className="slds-modal__header">

      <h2 id="modal-heading-01" className="slds-text-heading_medium slds-hyphenate">Vista de Lista</h2>
      </header>
      <div  style={{height: "100%"}} className="slds-modal__content slds-p-around_medium" id="modal-content-id-1">

      {this.renderItem()}

      </div>
      <footer className="slds-modal__footer">
      <button onClick={this.onCloseOption.bind(this)} className="slds-button slds-button_neutral">Cancelar</button>
      <button onClick={this.onLast.bind(this)} className="slds-button slds-button_brand">Last</button>
      <button onClick={this.onNext.bind(this)}  className="slds-button slds-button_brand">Next</button>
      </footer>
      </div>
      </section>
      <div className="slds-backdrop slds-backdrop_open"></div>
    </div>
  }

  renderItems(){
    var _this = this;
    var value = this.props.row[this.props.column.name];
    var index = -1;
    return value.formatValue.map(function(item){
      index++;
      return <span onClick={_this.onClick.bind(_this)} key={index} data-index={index} >
      <span className="slds-avatar slds-avatar_x-small slds-m-right_xx-small">
        <img style={{width: 20, height: 20 }} src={ item.url || item } />
        </span>
      </span>

    })
  }

  render(){

    return <div>
    {this.renderItems()}
    {this.renderEdit()}
    </div>
  }
}


export default ArrayList

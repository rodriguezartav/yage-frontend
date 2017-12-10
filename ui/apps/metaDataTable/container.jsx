import React from 'react'
import {Toast, GlobalHeader,PageHeader,SmartTable,Kanban,AutoForm,ButtonBar, Picklist}  from '../../components';
import Business from "./business"
import Style from './style.css';
import UI from "./ui";
import BpPromise from 'bluebird';
import Contents from "./business/contents";
import moment from "moment";
import DefaultForm from "./defaultForm";
import createHistory from 'history/createHashHistory';
const history = createHistory()


class MetaTableContainer extends React.Component {

  constructor(props) {
    super(props);
    this.business = new Business(this);
  }

  onGroupActionClick(action, rows){
    this.business.groupActions(action,rows);
  }

  onRowActionClick(action, row){
    this.business.rowAction(action,row);
  }

  onRowClick(rowId){
    history.push('/'+rowId)
    this.setState( {content: Contents.one(rowId) } )
  }

  onNew(){
    this.setState({ content: {} });
  }

  onToastExpire(){
    this.setState({toast: null});
  }


  onSave(model){
    this.business.save(model);
  }

  onBack(){
    this.setState({ content: null })
  }

  onUploadImage(data){
    UI.onUploadPhoto(data);
  }

  onDeletePhoto(data){
    UI.onDeletePhoto(data);
  }

  onUploadImageURL(data){
    UI.onUploadImageURL(data);
  }

  onViewClick(key,option){
    UI.onChangeView(option);
  }

  renderViews(){
    var _this = this;

    var views = this.props.views.map(function(view){
      return view.name;
    })

    return <div className="slds-m-left_small"><Picklist
      errors={null}
      datakey="type"
      item={_this.state.dataView}
      onChange={_this.onViewClick.bind(_this)}
      options={views} />
      </div>

    return <div className="slds-button-group slds-m-left_small" role="group">
      <span className="slds-text-title slds-p-right_small"> Views</span> {views}
    </div>
  }

  renderOptions(){
    var options = [];

    options.push( <button key={"new_btn"} onClick={this.onNew.bind(this)} data-type="list" className="slds-button slds-button_icon slds-button_icon-border-filled" aria-pressed="true" title="Charts">
      <svg className="slds-button__icon" aria-hidden="true">
        <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#new" />
      </svg>
      <span className="slds-assistive-text">view</span>
      </button>
    )

    return <div className="" role="group">
      <span className="slds-text-title slds-p-right_small"> Options</span> {options}
    </div>
  }

  renderToast(){
    if( !this.state.toast  ) return null;
    else return <Toast onExpire={this.onToastExpire.bind(this)} message={this.state.toast} />
  }

  render(){
    var EditView = DefaultForm;
    var columns;
    if( this.state.content && this.props.new && !this.state.content.id ){
      //EditView = this.props.new;
      columns = this.props.newColumns;
    }
    else if( this.state.content && this.props.edit && this.state.content.id ){
      columns = this.props.editColumns;
      console.log("setting edit view",this.props.edit)
      EditView = this.props.edit;
    }
    else if(this.state.content){
      if( this.state.content && this.state.content.id ) columns = this.props.editColumns;
      else columns = this.props.newColumns;
    }

    return <div>
      <GlobalHeader errors={this.state.errors} user={this.state.user} type={"blue-button"}>
      </GlobalHeader>
      <div className="tool-box slds-grid">
        {this.renderOptions()}
        {this.renderViews()}
      </div>

      {this.renderToast()}

      <SmartTable
        onGroupClick={function(){console.log(arguments)}}
        onActionClick={function(){console.log(arguments)}}
        //rowActions={[{name:"test","description":"test"}]}
        onRowClick={this.onRowClick.bind(this)}
        //groupActions={["merge","lock"]}
        rows={this.state.contents}
        groupBy={this.props.groupBy}
        principalColumn={this.props.principalColumn}
        columns={this.props.columns}
        renderChildren={this.state.content != null }
        >

          <EditView
            onSubmit={this.onSave.bind(this)}
            onBack={this.onBack.bind(this)}
            initialModel={this.state.content}
            columns={this.props.columns}
            columnViews={columns}
          />

      </SmartTable>

    </div>
  }
}

export default MetaTableContainer;

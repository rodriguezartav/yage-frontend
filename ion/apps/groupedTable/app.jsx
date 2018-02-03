import "../../polyfill/dataset";
import React from 'react'
import Toast from "../../components/toast";
import GlobalHeader from "../../components/globalHeader";
import PageHeader from "../../components/pageHeader";
import ButtonBar from "../../components/buttonBar";
import Picklist from "../../components/picklist";

import IconButtonWithDropdown from "../../components/iconButtonDropdown";
import NewModal from "../../components/newModal";
import NewModalPage from "../../components/newModal/page";
import Business from "./business"
import Style from './style.css';
import UI from "./ui";
import DefaultForm from "./defaultForm";
import createHistory from 'history/createHashHistory';
import Grid from "./components/grid";
import Columns from "./business/columns";
import GroupPlaceHolder from "./components/groupPlaceholder";
import Ops from "./business/ops";
const history = createHistory()

class App extends React.Component {

  constructor(props) {
    super(props);

    this.business = new Business(this);
    Columns.init(props);
  }

 componentDidMount(){
   var _this = this;
   UI.setSize();
   _this.loadEditComponents();
 }

 loadEditComponents(){
   var _this = this;
   if(!_this.props.listColumnsActions || this.props.listColumnsActions.length ==0) return;
   var listColumnsActions = [];
   _this.props.listColumnsActions.forEach(function(listColumnAction){
    listColumnsActions.push(listColumnAction)
     //setTimeout( function(){ _this.loadEditComponent(editComponentConfiguration) }, 5000 );
    })
   this.setState({listColumnsActions: listColumnsActions});
 }

 loadEditComponent(editComponentConfiguration){
  }

 storeScrollY(scrollY){
  this.setState({scrollY: scrollY})
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

  onViewClick(key,option){
    UI.onChangeView(option);
  }

  onGroupClick(key,option){
    UI.onChangeGroup(option);
  }

  onRefresh(){
    UI.refresh();
  }

  onActionClick(e){
    var action;
    var dataset = e.currentTarget.dataset;
    if(dataset && dataset.action) action = dataset.action;
    else action = e.currentTarget.getAttribute("action");
    UI.onActionClick( JSON.parse(action) );
  }

  renderViews(){
    var _this = this;

    var views = this.props.views.map(function(view){
      return view.name;
    })

    var groupBy = this.props.groupByFields.map(function(field){ return field; })

    return <div className="slds-m-left_small">
      <div className="slds-grid">
      <div className="slds-m-right_x-small slds-p-top_x-small  slds-m-left_small slds-text-title_caps">List</div>
      <Picklist
      errors={null}
      datakey="type"
      item={_this.state.dataView}
      onChange={_this.onViewClick.bind(_this)}
      options={views} />

      <div className="slds-m-right_x-small slds-p-top_x-small slds-m-left_small slds-text-title_caps">Group</div>

      <Picklist
      errors={null}
      datakey="type"
      item={_this.state.groupBy}
      onChange={_this.onGroupClick.bind(_this)}
      options={groupBy} />


      </div>
      </div>

    return <div className="slds-button-group slds-m-left_small" role="group">
      <span className="slds-text-title slds-p-right_small"> Views</span> {views}
    </div>
  }

  renderOptions(){
    var _this = this;
    var options = [];

    options.push( <button key={"new_btn"} onClick={UI.onNew} data-type="list" className="slds-button slds-button_icon slds-button_icon-border-filled" aria-pressed="true" title="Charts">
      <svg className="slds-button__icon" aria-hidden="true">
        <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#new" />
      </svg>
      </button>
    )

    options.push( <button key={"refresg_btn"} onClick={UI.onRefresh} data-type="list" className="slds-button slds-button_icon slds-button_icon-border-filled slds-m-right_medium" aria-pressed="true" title="Charts">
      <svg className="slds-button__icon" aria-hidden="true">
        <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#sync" />
      </svg>
      </button>
    )

    this.props.listColumnsActions.forEach(function(action){

      var disabled=""
      if( _this.state.selectedRowIds.length == 0 ) disabled="disabled";

      options.push( <button disabled={disabled} title={action.name}
        key={action.name}
        data-action={JSON.stringify(action)}
        onClick={_this.onActionClick.bind(_this)}
        data-type="list"
        className="slds-button slds-button_icon slds-button_icon-border-filled"
        aria-pressed="true" title="Charts">

          <svg className="slds-button__icon" aria-hidden="true">
            <use xlinkHref={"/assets/icons/utility-sprite/svg/symbols.svg#"+action.icon} />
          </svg>

      </button>)
    })


    options.push(<IconButtonWithDropdown items={this.props.listColumnsActions} field="name" />)

    return <div className="" role="group">
      <span className="slds-m-right_x-small slds-m-left_small slds-text-title_caps">Actions</span> {options}
    </div>
  }

  renderToast(){
    if( !this.state.showToast ) return null;
    else return <Toast onExpire={UI.toastExpired} notifications={this.state.notifications} />
  }

  renderList(){
    var _this =this;
    var columns = this.state.listColumns;
    var rows = this.state.computedRows;

    var groupFields = Columns.getDistintFields(rows, this.state.groupBy);
    var groupFieldDiversity = (groupFields.unique.length/ rows.length)*100;
    if( !groupFieldDiversity || groupFieldDiversity > 0 == false ) groupFieldDiversity=0;
    var width = this.state.viewportWidth;
    if(width == NaN || width > 0 == false) width = 0;

    return <div className="slds-grid">

      <div>

      <Grid
        ref="grid"
        rowCount={rows.length}
        columns={columns}
        rows={rows}
        selectedRowIds={this.state.selectedRowIds}
        totalWidth={this.state.columnWidthData.totalWidth}
        columnWidths={this.state.columnWidthData.columnWidths}
        height={this.state.viewportHeight}
        width={ width }
        listColumnsActions={this.state.listColumnsActions}
        sortBy={this.state.sortBy}
        storeScrollY={this.storeScrollY.bind(this)}
        groupFields={groupFields}
      />
      </div>
    </div>
  }

  renderModal(){
    if(!this.state.modalAction) return null;
    return <NewModal
      title={this.state.modalAction.title}
      route={this.state.modalAction.route}
      size={this.state.modalAction.size || ""}
      onSave={UI.onSaveNewModal}
      onClose={UI.onHideNewModal}
      viewHeight={this.state.viewportHeight}
      payload={this.state.modalAction.payload}
      onFieldUpdate={this.business.onFieldUpdate}
      onLoadColumns={this.business.loadColumns}
      onSaveAction={this.business.rowAction}
    />
  }

  getViewComponent(){
    var View = DefaultForm;

    if( this.state.content.id && this.state.action ){
      if( this.state["editComponent_"+this.state.action] ) View = this.state["editComponent_"+this.state.action];
    }

    return View; //can be null if not loaded
  }

  renderView(){
    if(!this.state.editAction) return null;
    return <NewModalPage
      title={this.state.editAction.title}
      route={this.state.editAction.route}
      onSave={UI.onSaveNewModal}
      onClose={UI.onHideNewModal}
      viewHeight={this.state.viewportHeight}
      payload={this.state.editAction.payload}
      onFieldUpdate={this.business.onFieldUpdate}
      onLoadColumns={this.business.loadColumns}
      onSaveAction={this.business.rowAction}
    />



    var View = this.getViewComponent();;

    return <View
      height={ this.state.viewportHeight }
      onSubmit={this.onSave.bind(this)}
      onBack={this.onBack.bind(this)}
      initialModel={this.state.content}
      appProps={this.props}
      showSave={UI.showSave}
      editColumns={this.state.editColumns}
      action={this.state.action}
    />
  }

  renderToolBox(){
    if(this.state.content !=null && this.state.contents.length>0) return null;
    return <div className="tool-box slds-grid">
      {this.renderOptions()}
      {this.renderViews()}
    </div>
  }

  render(){
    return <div>
      <GlobalHeader user={this.state.user} menu={this.props.menu||[]} ionName={this.props.ionName || ""} logoClass={this.state.logoAnimation} errors={this.state.errors} user={this.state.user} type={"blue-button"}>
      </GlobalHeader>

      {this.renderToolBox()}
      {this.renderToast()}

      { this.state.content == null ? this.renderList() : this.renderView() }
      {this.renderModal()}
    </div>
  }

}

export default App;
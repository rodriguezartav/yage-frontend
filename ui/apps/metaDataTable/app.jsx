import React from 'react'

import Toast from "../../components/toast";
import GlobalHeader from "../../components/globalHeader";
import PageHeader from "../../components/pageHeader";
import ButtonBar from "../../components/buttonBar";
import Picklist from "../../components/picklist";

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
    console.log(props)
    this.business = new Business(this);
    Columns.init(props);
  }

 componentWillMount(){
   var _this = this;
   UI.setSize();
   _this.loadEditComponents();
 }

 loadEditComponents(){
   var _this = this;
   if(!_this.props.editComponents) return;
   var actions = [];
   _this.props.editComponents.forEach(function(editComponentConfiguration){
     actions.push(editComponentConfiguration)
     setTimeout( function(){ _this.loadEditComponent(editComponentConfiguration) }, 5000 );
   })
   this.setState({actions: actions});
 }

 loadEditComponent(editComponentConfiguration){
   var _this = this;
   import(/* webpackChunkName: "editView" */ '../../custom/' + editComponentConfiguration.path )
   .then(Edit => {
     var state = _this.state;
     state["editComponent_" + editComponentConfiguration.icon] = Edit.default;
     _this.setState(state);
   })
   .catch(error => 'An error occurred while loading the component');
 }

 storeScrollY(scrollY){
  this.setState({scrollY: scrollY})
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

  renderList(){
    var _this =this;
    var columns = this.state.listColumns;
    var rows = this.state.computedRows;

    var groupFields = Columns.getDistintFields(rows, this.state.sortBy);
    var groupFieldDiversity = (groupFields.unique.length/ rows.length)*100;

    return <div className="slds-grid">

      <GroupPlaceHolder
        height={this.state.viewportHeight}
        groupFields={groupFields}
        groupFieldDiversity={groupFieldDiversity}
      />

      <div>

      <Grid
        ref="grid"
        rowCount={rows.length}
        columns={columns}
        rows={rows}
        totalWidth={this.state.columnWidthData.totalWidth}
        columnWidths={this.state.columnWidthData.columnWidths}
        height={this.state.viewportHeight}
        width={this.state.viewportWidth - ( groupFieldDiversity < Ops.diversityThesrshold ? 100 : 0 ) }
        actions={this.state.actions}
        sortBy={this.state.sortBy}
        storeScrollY={this.storeScrollY.bind(this)}
        groupFields={groupFields}
      />
      </div>
    </div>
  }

  getViewComponent(){
    var View = DefaultForm;

    if( this.state.content.id && this.state.action ){
      if( this.state["editComponent_"+this.state.action] ) View = this.state["editComponent_"+this.state.action];
    }

    return View; //can be null if not loaded
  }

  renderView(){
    var View = this.getViewComponent();;

    return <View
      height={ this.state.viewportHeight }
      onSubmit={this.onSave.bind(this)}
      onBack={this.onBack.bind(this)}
      initialModel={this.state.content}
      appProps={this.props}
      showSave={UI.showSave}
      editColumns={this.state.editColumns}
    />
  }

  render(){

    return <div>
      <GlobalHeader errors={this.state.errors} user={this.state.user} type={"blue-button"}>
      </GlobalHeader>
      <div className="tool-box slds-grid">
        {this.renderOptions()}
        {this.renderViews()}
      </div>

      {this.renderToast()}

      { this.state.content == null ? this.renderList() : this.renderView() }

    </div>
  }

}

export default App;

import Ajax from "../../../helpers/ajax";
import Auth from "../../../helpers/auth";
import Data from "./data";
import createHistory from 'history/createHashHistory';
import Contents from "./contents";
import Columns from "./columns";
import Sort from "./sort";
import Filter from "./filter";
import Logo from "./logo";
import Login from "./login";
import LogRocket from 'logrocket';
import LogRocketReact from 'logrocket-react';
LogRocketReact(LogRocket);

if (process.env.NODE_ENV == "production") {
  LogRocket.init('ji4v2p/ion-' + process.env.NODE_ENV);
}

const history = createHistory();

function Business(app) {
  var _this = this;
  Auth.getAuthCookie();
  LogRocket.identify(Ajax.userName, {
    name: Ajax.userName,
    version: process.env.VERSION,
    application: process.env.NODE_ENV
  });


  Logo.init(app);
  Login.init(app, this.init.bind(this));
  Columns.init(app.props);
  this.app = app;


  this.app.state = {
    user: null,
    contents: [],
    computedRows: [],
    groupBy: app.props.groupBy,
    content: null,
    dataView: app.props.views[0].name,
    listColumns: Columns.getColumnsArrayFromList("listColumns"),
    editColumns: [],
    errors: [],
    sortBy: app.props.groupBy,
    sortDirection: 1,
    filter: null,
    columnWidthData: {
      totalWidth: 0,
      columnWidths: []
    },
    actions: [],
    logoAnimation: "rotate"

  };
  Business.business = Business.instance = this;
  Business.instance.history = history;


  Login.checkAuth()
}

Business.prototype.init = function(user) {
  var _this = this;

  this.app.setState({
      user: user
    })
    //user is logged in.
  var userId;
  userId = user.first_name + " " + user.last_name;

  LogRocket.identify(user.id || userId, {
    name: userId
  });

  var location = history.location.pathname;
  location = location.replace("/", "");

  const unlisten = history.listen((location, action) => {});

  if (location == "" || location.length == 0) this.load(this.app.state.dataView);
  else {
    this.load(this.app.state.dataView)
      .then(function() {
        var rowId = parseInt(history.location.pathname.replace("/", ""));
        _this.app.setState({
          content: Contents.one(rowId)
        });
      })
  }
}

Business.prototype.sort = function(sortBy) {
  var state = this.app.state;
  var direction = state.sortDirection || 1;
  if (state.sortBy == sortBy) direction *= -1;
  this.computeRows("SKIP", sortBy, direction);
}

Business.prototype.filter = function(column, text) {
  var state = this.app.state;
  var filter;
  if (!text) filter = null;
  else filter = {
    column: column,
    text: text
  };
  this.computeRows(filter, state.sortBy, state.sortDirection);
}

Business.prototype.reComputeRows = function() {
  this.computeRows(this.app.state.filter);
}

Business.prototype.computeRows = function(filter, sortBy, sortDirection) {
  if (!sortBy) sortBy = this.app.state.sortBy;
  if (!sortDirection) sortDirection = this.app.state.sortDirection;

  var rows = this.app.state.contents;
  var newState = {
    sortBy: sortBy,
    sortDirection: sortDirection
  };
  if (rows.length == 0 && filter) rows = [{
    isPlaceHolder: true
  }]; //To render columns
  newState.columnWidthData = Columns.getColumnWidths(rows, this.app.state.listColumns);
  if (rows.length == 1 && rows[0].isPlaceHolder) rows = [];

  var filteredRows = rows;
  if (filter != "SKIP") {
    filteredRows = Filter(rows, filter);
    newState.filter = filter;
  }

  newState.computedRows = Sort(filteredRows, Columns.getColumnByName(sortBy), sortDirection);
  this.app.setState(newState);
}



Ajax.onUnauthorized = function() {
  alert("Parece que ha pasado mucho tiempo desde su ingreso, debemos volver a cargar la pagina.")
  window.location.reload();
}

Ajax.onNoACL = function() {
  alert("No tiene los accessos necesarios para usar este app. Comuniquese con it@rodcocr.com")
}

Ajax.onLogon = function() {
  alert("No tenemos registado su acceso, lo llevaremos al porton de entrada.")
}

Business.business = Business.instance = null;
Data(Business);

export default Business
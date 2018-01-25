import React, {PureComponent} from 'react';
import UI from "../../ui";
import Ops from "../../business/ops";

//import throttle  from 'lodash.throttle';

import cn from 'classnames';
import styles from './style.css';

import StaticCell from "../cell/static";
import HeaderCell from "../cell/header";
import ContentCell from "../cell/content";

export default class ExampleGrid extends React.Component {

  constructor(props, context) {
    super(props, context);

    var rowCount =0;
    if( this.props.rows ) rowCount = this.props.rows.length;

    this.state = {
      columnWidths: this.props.columnWidths,
      totalWidth: this.props.totalWidth,
      rows: this.props.rows || [],
      columns: this.props.columns,
      rowCount: rowCount,
      scrolled:0,
      scrolledLeft: 0,
      fontSize: Ops.fontSize,
      width: this.props.width,
      height: this.props.height,
    };

   }

   scrollToField(field){
    var _this = this;
    var index;
    var count =0;
    var scrolled=0;
    var maxHeight = (_this.state.rows.length * Ops.rowHeight) - _this.state.height;
    this.state.rows.forEach(function(row){
      if(!index && row[_this.props.sortBy].formatValue == field) index = count;
      count++;
    })

    if(index){
      scrolled = index * Ops.rowHeight;
      if( scrolled > maxHeight  ) scrolled = maxHeight;
    }
    else{
      scrolled=0;
    }
     _this.refs.scroll.scrollTop = scrolled;
     this.setState({scrolled: scrolled });
   }

   componentDidMount(){
    if( UI.gridScrolledY ){
      this.setState({scrolled: UI.gridScrolledY })
      this.refs.scroll.scrollTop = UI.gridScrolledY;
      UI.gridScrolledY=null;
    }
   }

   componentWillReceiveProps(nextProps){
    var _this = this;
    this.setState({
      width: nextProps.width,
      height: nextProps.height - Ops.headerColumnHeight,
      columnWidths: nextProps.columnWidths,
      totalWidth: nextProps.totalWidth,
      rows: nextProps.rows,
      rowCount: nextProps.rowCount
    })
   }

   listenScrollYEvent(e){
    var _this = this;
    if( this.state.rows.length == 0 ) return;
    var interval = this.state.interval;
    if(interval) clearInterval(interval);
    interval = setInterval(function(){
         clearInterval(interval);
        _this.setState({scrollingY: false, interval: null})
    },50);

    UI.resetEditingCells();
    UI.registerStaticCell();
    this.setState({interval: interval, scrolled:  this.refs.scroll.scrollTop, scrollingY: true });
   }

   listenScrollXEvent(e){
    if( this.state.rows.length == 0 ) return;
    this.setState({scrolledLeft:this.refs.scrollLeft.scrollLeft});
   }

   componentDidUpdate(){
    if( !this.refs.scrolledLeft ) return;
    this.refs.scrolledLeft.scrollLeft = this.state.scrolledLeft;
   }

   renderHeaderCols(){
    var _this=this;
     return _this.state.columns.map(function(column){
      var col = column.name;
      if( _this.state.columns[0].name == col ) return null;

       var colwidth = parseInt(_this.state.columnWidths[col]);

       var style = {
        width: colwidth,
        overflow: "hidden",
      }
      return <HeaderCell key={column.name} column={column} style={style}/>
     })
   }

   renderHeader(){
    var staticWidth = this.state.columnWidths[ this.state.columns[0].name ] || 0;
    return <div className="header" style={{ width: this.state.width, height: Ops.headerColumnHeight}}>

      <HeaderCell column={this.state.columns[0]} style={{width: staticWidth }} />

      <div ref="scrolledLeft"
        style={{
          overflowX: "scroll",
          top: 0,
          width: this.state.width - staticWidth,
          position: "absolute",
          left: staticWidth
      }}>

        <div className="slds-grid" style={{width: this.state.totalWidth}}>
        { this.renderHeaderCols() }
      </div>

      </div>

    </div>
   }

   getDataSlice(){
    var _this=this;
    var rowHeight = this.state.rowCount * Ops.rowHeight;
    var viewPortHeight = this.state.height;
    var extraHeight = rowHeight -viewPortHeight;
    var offset = Math.round( this.state.scrolled / Ops.rowHeight );
    var numberFit = Math.round( viewPortHeight / Ops.rowHeight );
    return this.state.rows.slice( offset, offset + numberFit );
   }

   renderStaticRow(row,staticWidth){
     var style = {
       height: Ops.rowHeight
     }

     var column = this.state.columns[0];

     return <StaticCell
      scrollingY={ this.state.scrollingY }
      listColumnsActions={ this.props.listColumnsActions }
      key={ row.id+"-"+column.name }
      row={ row }
      column={ column }
      static={ true }
      style={ style }
      scrolled={ this.state.scrolled }
      height={ this.state.viewportHeight }
      xOffset={ staticWidth }
      sortedBy={ row[this.props.sortBy] }
      groupFields={ this.props.groupFields }
    />
   }

   renderStaticRows(slice,staticWidth){
    var _this=this;
    return slice.map(function(row){
      return _this.renderStaticRow(row,staticWidth);
    })
   }

   renderStaticContent(slice){
    if(slice.lenght == 0) return null;
     var staticWidth = this.state.columnWidths[ this.state.columns[0].name ] || 0;
     return <div
       className="static-content"
       style={{
         width: parseInt(staticWidth),
         paddingTop: this.state.scrolled
       }}>
         {this.renderStaticRows(slice,staticWidth)}
     </div>
   }

   renderContentRow(row){
    var _this=this;
     return _this.state.columns.map(function(column){
      var col = column.name;
      if( _this.state.columns[0].name == col ) return null;

      var colwidth = parseInt(_this.state.columnWidths[col]);
      var staticWidth = _this.state.columnWidths[ _this.state.columns[0].name ] || 0;

       var style = {
        width: colwidth,
        overflow: "hidden",
        height: Ops.rowHeight
      }
      return <ContentCell
        height={_this.props.height}
        xOffset={staticWidth}
        key={row.id+"-"+column.name}
        row={row}
        column={column}
        style={style}
        scrolled={_this.state.scrolled}
        scrolledLeft={_this.state.scrolledLeft}
        />

     })
   }


   renderRows(slice){
    var _this=this;

    return slice.map(function(row){
      return <div key={"dynamic-"+row.id} className="slds-grid row" style={{ height: Ops.rowHeight }}>
        {_this.renderContentRow(row)}
      </div>
    })
   }

  renderDynamicContent(slice){
    if(slice.lenght == 0) return null;
    //if(this.state.scrollingY) return null;
    var staticWidth = this.state.columnWidths[ this.state.columns[0].name ] || 0;
    return <div onScroll={this.listenScrollXEvent.bind(this)}
     ref="scrollLeft"
     className="dynamic-content"
     style={{
      overflowX: "scroll",
      top: 0,
      width: this.state.width - staticWidth,
      position: "absolute",
      left: staticWidth,
      paddingTop: this.state.scrolled
    }}>

      <div style={{
        width: this.state.totalWidth,
      }}>
        {this.renderRows(slice)}
      </div>

    </div>
   }

  render() {
    //if(!this.state.rows || this.state.rows.length ==0 ) return <div>No rows</div>;

    var _this = this;
    var slice = this.getDataSlice();

    return <div className="grid">

      {this.renderHeader()}

      <div className="content-viewport"
        ref="scroll"
        onScroll={this.listenScrollYEvent.bind(this)} style={{
        position: "relative",
        width: this.state.width||0,
        height: this.state.height||0,
        overflow: "scroll"
      }}>

        <div className="content" style={{height: this.state.rowCount * Ops.rowHeight }}>
          {this.renderStaticContent(slice)}
          {this.renderDynamicContent(slice)}
        </div>
      </div>
    </div>
  }
}


import React from 'react';
import moment from 'moment';
import MiniLookUp from "./miniLookUp"



class DatePicker extends React.Component {

  constructor(props) {
    super(props);
    var min = new Date().getFullYear() -5;
    var max = min + 10;

    this.state = {
      mes: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
      dia: getAllNumbersBetween(1,31),
      ano: getAllNumbersBetween(min,max)
    }
  }

  onSelect(field, option){
    var date = moment(this.props.date);
    if( field == "dia") date.date(parseInt(option))
    else if( field == "mes") date.month( this.state.mes.indexOf(option) );
    else if( field == "ano") date.year( parseInt(option) );
    this.props.onChange( this.props.field, date.toDate() );
  }

  render(){
    var date = moment(this.props.date)
    return <div >
  <div className="slds-form slds-form_compound">
    <fieldset className="slds-form-element">
      <legend className="slds-form-element__label slds-text-title_caps">Location</legend>
      <div className="slds-form-element__group">
        <div className="slds-form-element__row">
          <div className="slds-form-element slds-size_1-of-3">
            <MiniLookUp  onClick={this.onSelect.bind(this)}  field="dia" selected={date.format("DD")} options={this.state.dia}/>
          </div>

          <div className="slds-form-element slds-size_1-of-3">
            <MiniLookUp  onClick={this.onSelect.bind(this)} field="mes" selected={date.format("MMM")} options={this.state.mes}/>
          </div>

          <div className="slds-form-element slds-size_1-of-3">
            <MiniLookUp   onClick={this.onSelect.bind(this)}  field="ano" selected={date.format("YYYY")} options={this.state.ano}/>
          </div>
        </div>
      </div>
    </fieldset>
    </div>
  </div>
}
}

function getAllNumbersBetween(x, y) {
  var numbers = [];
  for (var i = x; i < y; i++) {
    numbers.push(i);
  }
  return numbers;
}

DatePicker.demo = function(Highlight){
  var date = moment().toDate();

  return <div>
    <DatePicker field="date" onChange={null} date={date}/>
    <Highlight className='dark'>
      {`<DatePicker />`}
    </Highlight>
  </div>
}

export default DatePicker

import React from 'react';
import Ajax from "../../helpers/ajax";
import classnames from "classnames";
import Style from "./style.css";


class GlobalHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      appsOpen: false,
      menu: {
        items: [{
          title: "Administracion",
          subtitle: "Listas",
          options: [{
            title: "Pacientes",
            link: "/metaDataTable.html?app=pacientes"
          }]
        }]
      }
    }
  }

  onLogout(){
    Ajax.logout();
  }

  onOpenAppMenu(){
    if(this.state.appsOpen) this.setState({appsOpen: false });
    else this.setState({appsOpen: true});
  }

  renderLogout(){

      return <li className="slds-dropdown-trigger slds-dropdown-trigger--click">
            <button onClick={this.onLogout} className="slds-button slds-button--icon slds-button--icon-container slds-button--icon-small slds-global-header__button--icon" aria-haspopup="true" title="Notifications">
              <svg className="slds-button__icon slds-global-header__icon" aria-hidden="true">
                <use xlinkHref="./assets/icons/utility-sprite/svg/symbols.svg#logout"></use>
              </svg>
            </button>
          </li>

  }

  renderErrors(){
    var style= {};
    if( this.props.errors ) style={color: "red"};
    else return null;

      return <li onClick={this.showErrors.bind(this)} className="slds-dropdown-trigger slds-dropdown-trigger--click" style={style}>
            <button className="slds-button slds-button--icon slds-button--icon-container slds-button--icon-small slds-global-header__button--icon" aria-haspopup="true" title="Notifications">
              <svg className="slds-button__icon slds-global-header__icon" aria-hidden="true">
                <use xlinkHref="./assets/icons/utility-sprite/svg/symbols.svg#error"></use>
              </svg>
            </button>
          </li>

  }


  renderMenuItems(){
    var _this = this;
    return this.state.menu.items.map(function(item){
      return _this.renderMenuItem(item)
    })
  }


  renderMenuOptions(options){
    var _this = this;
    return options.map(function(option){
        return <li key={option.title} className="slds-dropdown__item" role="presentation">
          <a href={option.link} role="menuitem" >
            <span className="slds-truncate" title="Menu Item Two">{option.title}</span>
          </a>
      </li>
    });

  }

  renderMenuItem(item){
    var _this = this;
    return <li key={item.title} className="slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_hover">
      <a href="javascript:void(0);" className="slds-context-bar__label-action" title="Menu Item">
        <span className="slds-truncate" title="Menu Item">{item.title}</span>
      </a>
      <div className="slds-context-bar__icon-action slds-p-left_none">
        <button className="slds-button slds-button_icon slds-button_icon slds-context-bar__button" aria-haspopup="true" title="Open menu item submenu">
          <svg className="slds-button__icon" aria-hidden="true">
            <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#chevrondown" />
          </svg>
          <span className="slds-assistive-text"></span>
        </button>
      </div>
      <div className="slds-dropdown slds-dropdown_right">
        <ul className="slds-dropdown__list" role="menu">
          <li className="slds-dropdown__header slds-has-divider_top-space" role="separator">
            <span className="slds-text-title_caps">{item.subtitle}</span>
          </li>
          { _this.renderMenuOptions(item.options) }
        </ul>
      </div>
    </li>
  }

  render(){
    return <div className="slds-context-bar">
  <div className="slds-context-bar__primary">
    <div className="slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-no-hover">
      <div className="slds-context-bar__icon-action">
        <div className="slds-global-header__logo" style={{width: "6.8125rem"}}>
          <a href="http://rodcocr.com/">
            <img src="./assets/images/logo.svg" alt="" />
          </a>
        </div>
      </div>
      <span className="slds-context-bar__label-action slds-context-bar__app-name">
        <span className="slds-truncate" title="App Name">Digital</span>
      </span>
    </div>
  </div>
  <nav className="slds-context-bar__secondary" role="navigation">
    <ul className="slds-grid">
      <li className="slds-context-bar__item">
        <a href="/" className="slds-context-bar__label-action" title="Home">
          <span className="slds-truncate" title="Home">Inicio</span>
        </a>
      </li>

      {this.renderMenuItems()}

    </ul>
  </nav>
  <ul className="slds-global-header__item slds-grid slds-grid--vertical-align-center" href="http://rodcocr.com/">
    {this.props.children}
    {this.renderLogout()}
  </ul>
</div>
  }



}

GlobalHeader.demo = function(Highlight){
  return <div>
    <GlobalHeader type="blue-links" sticky={false} user={{}} />
    <Highlight className='dark'>
      {'<GlobalHeader type="blue-links" sticky={false} user={{}}  />'}
    </Highlight>
     <br/><br/>

  </div>
}

GlobalHeader.icon = function(icon, onClick){
  return <li className="slds-dropdown-trigger slds-dropdown-trigger--click">
    <button onClick={onClick} className="slds-button slds-button--icon slds-button--icon-container slds-button--icon-small slds-global-header__button--icon" aria-haspopup="true" title="Setup">
      <svg className="slds-button__icon slds-global-header__icon" aria-hidden="true">
        <use xlinkHref={"./assets/icons/utility-sprite/svg/symbols.svg#"+icon}></use>
      </svg>
    </button>
  </li>
}

export default GlobalHeader;


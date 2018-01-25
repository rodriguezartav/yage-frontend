import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import hoistNonReactStatics from 'hoist-non-react-statics';

const makeWrapper = (middleware) => (WrappedComponent) => {
  class FormWrapper extends React.Component {

    constructor (props, ctx) {
      super(props, ctx)
      this.state = {
        model: props.initialModel || {},
      }
    }

    componentWillReceiveProps(nextProps){
      this.setState({ model: nextProps.initialModel })
    }

    setModel(model){
      this.setState({ model })
      return model
    }

    setProperty(prop, value){
      if(prop.indexOf(".")>-1){
        var parts = prop.split(".");
        prop=parts[0];
        var modelObject = this.state.model[prop];
        var obj = {};
        obj[parts[1]] = value
        value = assign({},modelObject,obj);
      }
      return this.setModel(assign({}, this.state.model, {
        [prop]: value,
      }))
    }

    bindToChangeEvent(e){
      const { name, type, value } = e.target

      if (type === 'checkbox') {
        const oldCheckboxValue = this.state.model[name] || []
        const newCheckboxValue = e.target.checked
          ? oldCheckboxValue.concat(value)
          : oldCheckboxValue.filter(v => v !== value)

        this.setProperty(name, newCheckboxValue)
      } else {
        this.setProperty(name, value)
      }
    }

    bindInput(name){
      return {
        name,
        value: this.state.model[name] || '',
        onChange: this.bindToChangeEvent,
      }
    }

    render () {
      const nextProps = assign({}, this.props, {
        bindInput: this.bindInput,
        bindToChangeEvent: this.bindToChangeEvent,
        model: this.state.model,
        setProperty: this.setProperty.bind(this),
        setModel: this.setModel,
      })

      const finalProps = typeof middleware === 'function'
        ? middleware(nextProps)
        : nextProps

      return React.createElement(WrappedComponent, finalProps)
    }
  }
  var componentName = WrappedComponent.displayName || WrappedComponent.name;
  FormWrapper.displayName = `Reformed(${componentName})`
  return hoistNonReactStatics(FormWrapper, WrappedComponent)
}

export default makeWrapper

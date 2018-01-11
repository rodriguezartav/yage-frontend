import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './container';
import { AppContainer } from 'react-hot-loader';


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <ErrorBoundary>
        <App {...window.__APP_INITIAL_STATE__} />
      </ErrorBoundary>
    </AppContainer>

   , document.getElementById('root')
  );
};

render(App);

if (module.hot) module.hot.accept('./container', () => {
  console.log("hot")
  render(App)
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, info);
    trackJs.track(error);

  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

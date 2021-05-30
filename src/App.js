import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from 'configurations/redux/store';
import ApplicationRouter from 'configurations/routing/ApplicationRouter';
import CircularProgress from '@material-ui/core/CircularProgress';

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={ <CircularProgress/> } persistor={persistor}>
          <ApplicationRouter />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

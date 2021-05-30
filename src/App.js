import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from 'configurations/redux/store';
import ApplicationRouter from 'configurations/routing/ApplicationRouter';

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApplicationRouter />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

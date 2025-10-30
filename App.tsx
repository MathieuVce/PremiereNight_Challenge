import React from 'react';
import {StatusBar} from 'react-native';
import RootNavigator from '@/navigation/RootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { store } from '@/store';
import { Provider } from 'react-redux';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar
          barStyle="light-content"
          translucent={false}
        />
        <RootNavigator />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
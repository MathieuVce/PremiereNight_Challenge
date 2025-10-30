import React from 'react';
import {StatusBar} from 'react-native';
import RootNavigator from '@/navigation/RootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        translucent={false}
      />
      <RootNavigator />
    </SafeAreaProvider>
  );
};

export default App;
import 'react-native-url-polyfill/auto';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import BottomTabNavigation from './src/Navigation/BottomTabNavigation';
import tailwind from 'twrnc'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={tailwind`h-full w-full`}>
        <SafeAreaView style={tailwind`flex-1 bg-slate-950`}>
          <BottomTabNavigation />
        </SafeAreaView>
        <View style={tailwind`h-9 bg-white`} />
      </View>
    </GestureHandlerRootView>
  );
}

export default App;

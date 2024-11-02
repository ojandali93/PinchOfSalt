import 'react-native-url-polyfill/auto';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import BottomTabNavigation from './src/Navigation/BottomTabNavigation';
import tailwind from 'twrnc';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): React.JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('currentProfile');

        // Update auth state based on token presence
        setIsAuthenticated(userToken ? true : false);
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    checkAuthStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={[tailwind`flex-1 justify-center items-center bg-white`]}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  } else {
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
}

export default App;

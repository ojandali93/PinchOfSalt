import 'react-native-url-polyfill/auto';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-get-random-values';
import { UserProvider } from './src/Context/UserContext';
import { RecipeProvider } from './src/Context/RecipeContext';
import { ListProvider } from './src/Context/ListContext';
import { AppProvider } from './src/Context/AppContext';

const RootApp = () => {

  return(
    <AppProvider>
      <RecipeProvider>
        <UserProvider>
          <ListProvider>
            <App />
          </ListProvider>
        </UserProvider>
      </RecipeProvider>
    </AppProvider>
  )
};

AppRegistry.registerComponent(appName, () => RootApp);

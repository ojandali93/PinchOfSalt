import 'react-native-url-polyfill/auto';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-get-random-values';
import { UserProvider } from './src/Context/UserContext';
import { RecipeProvider } from './src/Context/RecipeContext';
import { ListProvider } from './src/Context/ListContext';


const RootApp = () => (
  <RecipeProvider>
    <UserProvider>
      <ListProvider>
        <App />
      </ListProvider>
    </UserProvider>
  </RecipeProvider>
);

AppRegistry.registerComponent(appName, () => RootApp);

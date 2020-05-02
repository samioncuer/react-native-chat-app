import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './screens/Login';
import DashboardScreen from './screens/Dashboard';
import 'react-native-gesture-handler';
import Chat from './screens/Chat';

const AppNavigator = createSwitchNavigator(
  {
    Login: LoginScreen,
    DashboardScreen: DashboardScreen
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(AppNavigator)
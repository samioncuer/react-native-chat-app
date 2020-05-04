import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './screens/Login';
import DashboardScreen from './screens/Dashboard';
import 'react-native-gesture-handler';

const AppNavigator = createSwitchNavigator(
  {
    Login: LoginScreen,
    DashboardScreen: DashboardScreen
  }
);

export default createAppContainer(AppNavigator)
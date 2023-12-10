import { SafeAreaView, StyleSheet, ScrollView, View, VirtualizedList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from './screens/Start';
import Login from './screens/Login';
import LoginMain from './screens/LoginMain';
import Register from './screens/Register';
import Home from './screens/Home';
import AppConfig from './config/config';
import Menu from './screens/Menu';
import Insight from './screens/Insight';
import Tree from './screens/Tree';
import Fire from './screens/Fire';
import Fall from './screens/Fall';
import Maintenance from './screens/Maintenance';
import History from './screens/History';
import About from './screens/About';
import Profile from './screens/Profile';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} options={{ title: "", headerShadowVisible: false, headerStyle: { backgroundColor: AppConfig.mainColor2 } }} />
        <Stack.Screen name="Login" component={Login} options={{ title: "", headerShadowVisible: false, headerStyle: { backgroundColor: AppConfig.mainColor2 }, headerTintColor: AppConfig.whiteColor }} />
        <Stack.Screen name="LoginMain" component={LoginMain} options={{ title: "", headerShadowVisible: false, headerStyle: { backgroundColor: AppConfig.mainColor2 }, headerTintColor: AppConfig.whiteColor }} />
        <Stack.Screen name="Register" component={Register} options={{ title: "", headerShadowVisible: false, headerStyle: { backgroundColor: AppConfig.mainColor2 }, headerTintColor: AppConfig.whiteColor }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={Menu} options={{ title: "", headerTintColor: AppConfig.mainColor, headerShadowVisible: false, headerStyle: { backgroundColor: AppConfig.whiteColor } }} />
        <Stack.Screen name="Insight" component={Insight} options={{ headerShown: false }} />
        <Stack.Screen name="Tree" component={Tree} options={{ headerShown: false }} />
        <Stack.Screen name="Fire" component={Fire} options={{ headerShown: false }} />
        <Stack.Screen name="Fall" component={Fall} options={{ headerShown: false }} />
        <Stack.Screen name="Maintenance" component={Maintenance} options={{ headerShown: false }} />
        <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
        <Stack.Screen name="About" component={About} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
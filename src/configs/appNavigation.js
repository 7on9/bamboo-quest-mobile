import React, { useMemo, useState, useEffect } from 'react'
import { Easing, Animated, Platform } from 'react-native'
// import { SideBar } from '../components'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Screens from '../screens'
import AsyncStorage from '@react-native-community/async-storage'
import { FILE_USER_DATA } from './appConstants'
// import * as ScreenNames from '../screens/screenNames'
// import { APP_SIZE, APP_COLORS } from './appConstants'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const AppContainer = (props) => {
  const getUser = async () => {
    let _user = await AsyncStorage.getItem(FILE_USER_DATA)
    setUser(_user)
  }
  const [user, setUser] = useState(null)
  useEffect(() => {
    if (user) return
    getUser()
  }, [])

  console.log(user)
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {user && <Tab.Screen name="Setting" component={SettingNav}/>}
        {!user && <Tab.Screen name="Home" component={HomeNav}/>}
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const SettingNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Setting" component={Screens.SettingScreen}/>
      {/* <Stack.Screen name="SettingUser" component={SettingUserScreen}/> */}
    </Stack.Navigator>
  )
}

const HomeNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Screens.HomeScreen}/>
    </Stack.Navigator>
  )
} 

const NavConfig = () => {
  return {
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: screenProps => {
      const position = screenProps.position
      const index = screenProps.scene.index
      const width = screenProps.layout.initWidth
      const translateX = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [width, 0],
      })
      return {
        transform: [{ translateX }],
      }
    },
  }
}

// const HomeStack = createStackNavigator(
//   {
//     Home: {
//       screen: Screens.HomeScreen,
//     },
//     KPIDetailScreen: {
//       screen: Screens.KPIDetailScreen,
//     },
//   },
//   {
//     initialRouteName: ScreenNames.Home,
//     headerMode: 'none',
//     navigationOptions: {
//       headerVisible: false,
//     },
//     transitionConfig: NavConfig,
//   }
// )
// const RouteListStack = createDrawerNavigator(
//   {
//     Home: { screen: HomeStack },
//     // Payment: { screen: Screens.PaymentScene },
//     ProfileScreen: { screen: Screens.ProfileScreen },
//     VehicleScreen: { screen: VehicleStack },
//     // RevenueScreen: { screen: Screens.RevenueScreen },
//     ChartScreen: { screen: Screens.ChartScreen },
//     InfoAppScreen: { screen: Screens.InfoAppScreen },
//   },
//   {
//     initialRouteName: ScreenNames.Home,
//     contentComponent: props => <SideBar {...props} />,
//     drawerWidth: (APP_SIZE.widthScreen * 3) / 4,
//     overlayColor: 'rgba(0, 0, 0, 0.5)',
//     transitionConfig: NavConfig,
//   }
// )
// const LoginRoute = createStackNavigator(
//   {
//     Login: {
//       screen: Screens.LoginScreen,
//     },
//     // ConfirmCodeScreen: {
//     //   screen: Screens.ConfirmCodeScreen,
//     // },
//   },
//   {
//     headerMode: 'none',
//     navigationOptions: {
//       headerVisible: false,
//     },
//   }
// )
// const _routeSwitch = createSwitchNavigator(
//   {
//     AuthLoading: Screens.AuthLoadingScreen,
//     SignedIn: RouteListStack,
//     SignOut: LoginRoute,
//   },
//   {
//     initialRouteName: ScreenNames.AuthLoading,
//   }
// )

export const RootNav = AppContainer
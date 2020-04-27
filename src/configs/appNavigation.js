import React, { useMemo, useState, useEffect } from 'react'
import { Easing, Animated, Platform, View, Text, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Screens from '../screens'
import AsyncStorage from '@react-native-community/async-storage'
import { FILE_USER_DATA, APP_SIZE, isIPhoneX } from './appConstants'
import Icon from 'react-native-vector-icons/FontAwesome'
import Images from '@assets/images'
import Shadow from 'react-native-shadow-creator'
import { Header, AppText } from '../components'
import { APP_COLORS } from './theme'

const avgSize = (APP_SIZE.heightScreen + APP_SIZE.widthScreen) / 2.0

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const AppContainer = (props) => {
  const getUser = async () => {
    await Icon.loadFont()
    let _user = await AsyncStorage.getItem(FILE_USER_DATA)
    setUser(_user)
  }
  const [user, setUser] = useState(null)
  useEffect(() => {
    if (user) return
    getUser()
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
        }}
        tabBarOptions={{
          activeTintColor: APP_COLORS.main,
          inactiveTintColor: 'gray',
          adaptive: false,
          keyboardHidesTabBar: true,
          style: {
            // height: APP_SIZE.heightScreen * 0.1,
            backgroundColor: '#fff',
            ...Shadow(12),
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeNav}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View>
                <Icon size={focused ? 32 : 24} name="home" color={color} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="CreateQuest"
          component={CreateQuestNav}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <View>
                <Icon
                  size={focused ? 32 : 24}
                  name={focused ? 'plus-square' : 'plus-square-o'}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Play"
          component={PlayNav}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  ...Shadow(16),
                  marginBottom: avgSize * 0.065,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                }}>
                <Image
                  source={Images.square}
                  style={{
                    height: avgSize * (focused ? 0.1 : 0.09),
                    width: avgSize * (focused ? 0.1 : 0.09),
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileNav}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View>
                <Icon size={focused ? 32 : 24} name="user" color={color} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingNav}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View>
                <Icon size={focused ? 32 : 24} name="cog" color={color} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const ProfileNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Screens.ProfileScreen} />
      {/* <Stack.Screen name="SettingUser" component={SettingUserScreen}/> */}
    </Stack.Navigator>
  )
}

const SettingNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Setting" component={Screens.SettingScreen} />
      {/* <Stack.Screen name="SettingUser" component={SettingUserScreen}/> */}
    </Stack.Navigator>
  )
}

const PlayNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Play" component={Screens.PlayScreen} />
      {/* <Stack.Screen name="SettingUser" component={SettingUserScreen}/> */}
    </Stack.Navigator>
  )
}

const HomeNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => (
          <Header {...props} backgroundColor={APP_COLORS.main}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'OpenSans-Bold',
                  color: '#fff',
                  marginTop: isIPhoneX() ? APP_SIZE.statusBarHeight : 0,
                }}>
                Bamboo Quest
              </Text>
            </View>
          </Header>
        ),
      }}>
      <Stack.Screen name="Home" component={Screens.HomeScreen} />
    </Stack.Navigator>
  )
}

const CreateQuestNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CreateQuest" component={Screens.CreateQuestScreen} />
      <Stack.Screen
        name="CreateQuestionScreen"
        component={Screens.CreateQuestionScreen}
      />
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
    screenInterpolator: (screenProps) => {
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

import React, { useMemo, useState, useEffect } from 'react'
import { Easing, Animated, Platform, View, Text, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Screens from '../screens'
import AsyncStorage from '@react-native-community/async-storage'
import { FILE_USER_DATA, APP_SIZE, APP_RATIO, avgSize, FILE_USER_TOKEN } from './appConstants'
import Icon from 'react-native-vector-icons/FontAwesome'
import Images from '@assets/images'
import Shadow from 'react-native-shadow-creator'
import { Header, AppText, SearchBar } from '../components'
import { APP_COLORS, styles, appBorderRadius, APP_FONT_SIZES } from './theme'
import DeviceInfo from 'react-native-device-info'
import { useSelector, useDispatch } from 'react-redux'
import { dataProvider } from '../services/dataProvider'
import { verify } from '../redux/actions/authAction'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()


const AppContainer = (props) => {
  const dispatch = useDispatch()
  let isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const getUser = async () => {
    // await Icon.loadFont()
    let token = await AsyncStorage.getItem(FILE_USER_TOKEN)
    if (token) {
      try {
        let res = await dataProvider('/user/verify',{
          method: 'POST',
        })
        dispatch(verify({ user: res.data.info, token: res.data.token }))
      } catch (error) {
        AsyncStorage.setItem(FILE_USER_TOKEN, "")
        AsyncStorage.setItem(FILE_USER_DATA, null)
        dispatch(verify({ user: {}, token: null }))
        console.log(error)
      }
    }
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
          keyboardHidesTabBar: false,
          style: {
            height: APP_RATIO * 7,
            backgroundColor: '#fff',
            paddingBottom:
              Platform.OS === 'android' ? APP_RATIO/2 : 34,
            ...Shadow(12),
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeNav}
          options={{
            tabBarLabel: "Trang chủ",
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
            tabBarLabel: "Tạo câu hỏi",
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
            tabBarLabel: "Chơi ngay",
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
          component={isAuthenticated ? ProfileNav : Screens.LoginScreen}
          options={{
            tabBarLabel: "Hồ sơ",
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
      <Stack.Screen name="Profile"  component={Screens.ProfileScreen} />
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Play" component={Screens.PlayScreen} />
      {/* <Stack.Screen name="SettingUser" component={SettingUserScreen}/> */}
    </Stack.Navigator>
  )
}

const HomeNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Home" component={Screens.HomeScreen} />
      <Stack.Screen name="Quest" component={Screens.QuestScreen} />
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

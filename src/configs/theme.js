import { StyleSheet } from "react-native"
import { shadow } from "react-native-shadow-creator/shadow"

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    ...shadow(2)
  },
})

export const APP_COLORS = {
  main: '#17a51e',
  red: '#d03542',
  blue: '#2a68c7',
  yellow: '#d0a036',
  green: '#498c2b',
  text: {
    header: '#37393A',
    dark: '#454F63',
    normal: '#78849E',
  },
  background: '#F7F7FA',
}
import { Dimensions, Platform, StatusBar } from 'react-native'

// dev
// export const BASE_API_URL = 'http://localhost:2409/api'

// production
export const BASE_API_URL = 'http://172.104.181.210/api'

export class UIConstants {
  static AppbarHeight = Platform.OS === 'ios' ? 44 : 56
  static StatusbarHeight = Platform.OS === 'ios' ? 20 : 0
  static HeaderHeight = UIConstants.AppbarHeight + UIConstants.StatusbarHeight
}

export const APP_SIZE = {
  widthWindow: Dimensions.get('window').width,
  heightWindow: Dimensions.get('window').height,
  widthScreen: Dimensions.get('screen').width,
  heightScreen: Dimensions.get('window').height,
  statusBarHeight: Platform.select({
    ios: 30,
    android: StatusBar.currentHeight,
  }),
  appBarHeight: Platform.select({ ios: 44, android: 56 }),
}

export const FILE_USER_TOKEN = 'BBQ_USER_TOKEN'
export const FILE_USER_DATA = 'BBQ_USER_DATA'
export const FILE_NOTIFICATION_TOKEN = 'FILE_NOTIFICATION_TOKEN'
export const FILE_CONTACT_INFO = 'BBQ_CONTACT_INFO'
export const FILE_LOCALE = 'BBQ_LOCALE'

export const APP_COLORS = {
  main: '#3cb54b',
  text: {
    header: '#37393A',
    dark: '#454F63',
    normal: '#78849E',
  },
  background: '#F7F7FA',
}

export const LOCALE_CALENDAR_VN = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Th1',
    'Th2',
    'Th3',
    'Th4',
    'Th5',
    'Th6',
    'Th7',
    'Th8',
    'Th9',
    'Th10',
    'Th11',
    'Th12',
  ],
  dayNames: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
  dayNamesShort: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
}

export const DEFAULT_DATE_FORMAT = {
  VN: 'DD/MM/YYYY',
  EN: 'MM/DD/YYYY',
}

export const LOCALE_CALENDAR_EN = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Augst',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
}

export const PaymentTypes = {
  bankTransfer: 'BANK_TRANSFER',
  internetBanking: 'INTERNET_BANKING',
  creditCard: 'CREDIT_CARD',
  store: 'AT_STORE',
  onBoard: 'ON_BOARD',
  qrCode: 'QR_CODE',
}

export const MOMENT_TIME = {
  day: {
    name: 'day',
    granularity: 'days',
    iso: 'day',
  },
  week: {
    name: 'week',
    granularity: 'weeks',
    iso: 'isoWeek',
  },
  month: {
    name: 'month',
    granularity: 'months',
    iso: 'month',
  },
  quarter: {
    name: 'quarter',
    granularity: 'quarters',
    iso: 'quarter',
  },
  year: {
    name: 'year',
    granularity: 'years',
    iso: 'Year',
  },
}

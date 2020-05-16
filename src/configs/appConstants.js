import { Dimensions, Platform, StatusBar } from 'react-native'
import DeviceInfo from 'react-native-device-info'

// dev
export const BASE_API_URL = 'http://localhost:2409/api'
// export const BASE_API_URL = 'http://192.168.0.105:2409/api'
// export const BASE_API_URL = 'http://192.168.43.10:2409/api'
// export const BASE_API_URL = 'http://10.198.41.109:2409/api'
// export const BASE_API_URL = 'http://172.16.2.228:2409/api'

// production
// export const BASE_API_URL = 'http://172.104.181.210/api'

export const APP_SIZE = {
  widthWindow: Dimensions.get('window').width,
  heightWindow: Dimensions.get('window').height,
  widthScreen: Dimensions.get('screen').width,
  heightScreen: Dimensions.get('screen').height,
  statusBarHeight: Platform.select({
    ios: DeviceInfo.hasNotch() ? 44 : 20,
    android: StatusBar.currentHeight,
  }),
  appBarHeight: Platform.OS === 'ios' ? 44 : 56,
}

export const headerHeight = Platform.select({
  ios: DeviceInfo.hasNotch() ? APP_SIZE.statusBarHeight + APP_SIZE.appBarHeight : APP_SIZE.appBarHeight,
  android: APP_SIZE.appBarHeight
})

export const avgSize = (APP_SIZE.widthWindow + APP_SIZE.heightWindow) / 2.0
export const APP_RATIO = (APP_SIZE.heightWindow + APP_SIZE.widthWindow) / 100.0

export const FILE_USER_TOKEN = 'BBQ_USER_TOKEN'
export const FILE_USER_DATA = 'BBQ_USER_DATA'
export const FILE_NOTIFICATION_TOKEN = 'FILE_NOTIFICATION_TOKEN'
export const FILE_CONTACT_INFO = 'BBQ_CONTACT_INFO'
export const FILE_LOCALE = 'BBQ_LOCALE'

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

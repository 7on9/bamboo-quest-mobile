import { all } from 'redux-saga/effects'
import auth from './authSaga'
// import notification from './notificationSaga'

export default function* rootSaga() {
  yield all([auth()])
}

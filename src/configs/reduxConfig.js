import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import sagas from '../redux/sagas'
import reducers from '../redux/reducers'

export default function() {
  const sagaMiddleWare = createSagaMiddleware()
  const store = createStore(reducers, applyMiddleware(sagaMiddleWare))
  sagaMiddleWare.run(sagas)
  return store
}

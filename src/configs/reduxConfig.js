import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import sagas from '../sagas'
import reducers from '../reducers'

export default function() {
  const sagaMiddleWare = createSagaMiddleware()
  const store = createStore(reducers, applyMiddleware(sagaMiddleWare))
  sagaMiddleWare.run(sagas)
  return store
}

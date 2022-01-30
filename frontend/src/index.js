import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import App from './App'
import reducers from './reducers'

const initialState = {
  cart:{
    cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]

  },
  user:{
    user:localStorage.getItem('User')?JSON.parse(localStorage.getItem('User')):null
  }
}
const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
const store = createStore(reducers,initialState,composeEnhancers(applyMiddleware(thunk)))
ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
)
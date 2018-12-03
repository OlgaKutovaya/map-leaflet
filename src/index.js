import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/rootReducer';
import App from './App';
import thunk from 'redux-thunk';
import './styles/main.less';
import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
serviceWorker.unregister();
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Tmp from './components/Tmp';
import Login from './components/Login';
import '../semantic/dist/semantic.min.css';

var el = document.getElementById('root');
if (el.className == 'index') {
    ReactDOM.render(<App />, document.getElementById('root'));
} else {
    ReactDOM.render(<Login redirect={false}/>, document.getElementById('root'));
}

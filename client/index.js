import React from 'react';
import ReactDOM from 'react-dom';
import Route from './components/Routes';
import Tmp from './components/Tmp';
import Login from './components/Login';
import '../semantic/dist/semantic.min.css';

var el = document.getElementById('root');
ReactDOM.render(<Route />, document.getElementById('root'));
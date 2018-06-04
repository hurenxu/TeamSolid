import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from './App';
import Login from './Login';

const Routes = () => (
    <BrowserRouter>
        <Main>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
        </Main>
    </BrowserRouter>
);

export default Routes;
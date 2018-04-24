/**
 * Created by Wanhui on 4/20/18.
 */

import React, {Component} from 'react';
import {Button, Grid} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import '../css/login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                email: '',
                password: '',
                buttonText: 'Login',
            };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        if (validateEmail(this.state.email) && this.state.password != '' && this.state.buttonText==='Login') {
            //Submit to somewhere
            this.props.onSubmitClicked();
            console.log("Try to login")
        }
        else if (validateEmail(this.state.email) && this.state.password != '' && this.state.buttonText==='Register') {
            //Submit to somewhere
            console.log("Try to register")
        }
        else if (this.state.password == ''){
            alert('Password cannot be empty');
        }
        else {
            alert('Invalid email address');
        }
        this.setState({
            email: ''
        });
    }

    handleClick(event) {
        //Register
        this.setState({
            buttonText: 'Sign Up'
        });
    }

    render() {
        const Mobile = props => <Responsive {...props} maxWidth={767}/>;
        const Default = props => <Responsive {...props} minWidth={768}/>;

        return (
            <Grid columns={16} centered>
                <Grid.Column mobile={14} computer={4} className="login_box">
                    <h2 className="ui image header centered">
                        <div className="content">
                            Log-in to your account
                        </div>
                    </h2>
                    <form onSubmit={this.handleSubmit} method="post" className="ui large form login_form">
                        <div className="ui stacked secondary  segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"/>
                                    <input type="text" value={this.state.email} onChange={this.handleChange}
                                           name="email" placeholder="E-mail"/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"/>
                                    <input type="password" value={this.state.password}
                                           onChange={this.handleChange}
                                           name="password" placeholder="Password"/>
                                </div>
                            </div>
                            <Button type='submit' className="ui fluid large teal"
                                    secondary>{this.state.buttonText}</Button>
                        </div>
                        <div className="ui error message"/>
                    </form>
                    <div className="ui message">
                        New to us? <a href="#" onClick={this.handleClick}>Sign Up</a>
                    </div>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Login;
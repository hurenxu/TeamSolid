<<<<<<< HEAD
import React from 'react';
//import chai from 'chai';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const sinon = require('sinon');

import Login from '../client/components/Login';
// TODO: change email to username
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Login Component', () => {
    it('should have email and password', () => {
        const wrapper = shallow(<Login/>);
        expect(wrapper.find('input')).to.have.length(2);
    });

    it('should have a login button', () => {
        const wrapper = shallow(<Login/>);
        expect(wrapper.find('Button')).to.have.length(1);
    });

    it('should have two field', () => {
        const wrapper = shallow(<Login/>);
        expect(wrapper.find('.field')).to.have.length(2);
    });

    it('should have an email input', () => {
        const wrapper = shallow(<Login/>);
        expect(wrapper.state('email')).to.have.length(0);
    });

    it('should have a password input', () => {
        const wrapper = shallow(<Login/>);
        expect(wrapper.state('password')).to.have.length(0);
    });

    it('should have a valid login button', () => {
        const wrapper = shallow(<Login/>);
        expect(wrapper.state('buttonText')).to.have.length(5);
    });
});

/*
    it('should have props for email and password', function () {
        const wrapper = shallow(<Login/>);
        expect(wrapper.props().email).to.isDefined();
        expect(wrapper.props().password).to.isDefined();
    });


    it('should simulates click events', ()=> {
        const onButtonClick = sinon.spy();
        const wrapper = shallow(<Login onButtonClick={onButtonClick} />);
        wrapper.find('submit').simulate('click');
        assert(onButtonClick.calledOnce);
    });

    // within the Login components describe function
    it('renders an email input', () => {
        expect(shallow(<Login />).find('#email').length).to.equal(1);
    });
    it('renders a password input', () => {
        expect(shallow(<Login />).find('#password').length).to.equal(1);
    });
});

// within the Login components describe function
describe('Email input', () => {

    it('should respond to change event and change the state of the Login Component', () => {

        const wrapper = shallow(<Login />);
        wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}});

        expect(wrapper.state('email')).to.equal('blah@gmail.com');
    });
});

describe('Password input', () => {

    it('should respond to change event and change the state of the Login Component', () => {

        const wrapper = shallow(<Login />);
        wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'cats'}});

        expect(wrapper.state('password')).to.equal('cats');
    });
});
=======
import React from 'react';
//import chai from 'chai';
import {expect} from 'chai';
import {shallow} from 'enzyme';
const sinon = require('sinon');

import Login from '../client/components/Login';
// TODO: change email to username
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Login Component', () => {
    it('should have email and password', () => {
        const wrapper = shallow(<Login/>);
        expect(wrapper.find('input')).to.have.length(2);
    });

    it('should have a login button', () => {
        const wrapper = shallow(<Login/>);
        expect(wrapper.find('Button')).to.have.length(1);
    });

    it('should have two field', () => {
        const wrapper = shallow(<Login/>);
        expect(wrapper.find('.field')).to.have.length(2);
    });

    it('should have an email input', () => {
        const wrapper = shallow(<Login/>);
        expect(wrapper.state('email')).to.have.length(0);
    });

    it('should have a password input', () => {
        const wrapper = shallow(<Login/>);
        expect(wrapper.state('password')).to.have.length(0);
    });

    it('should have a valid login button', () => {
        const wrapper = shallow(<Login/>);
        expect(wrapper.state('buttonText')).to.have.length(5);
    });
});

/*
    it('should have props for email and password', function () {
        const wrapper = shallow(<Login/>);
        expect(wrapper.props().email).to.isDefined();
        expect(wrapper.props().password).to.isDefined();
    });


    it('should simulates click events', ()=> {
        const onButtonClick = sinon.spy();
        const wrapper = shallow(<Login onButtonClick={onButtonClick} />);
        wrapper.find('submit').simulate('click');
        assert(onButtonClick.calledOnce);
    });

    // within the Login components describe function
    it('renders an email input', () => {
        expect(shallow(<Login />).find('#email').length).to.equal(1);
    });
    it('renders a password input', () => {
        expect(shallow(<Login />).find('#password').length).to.equal(1);
    });
});

// within the Login components describe function
describe('Email input', () => {

    it('should respond to change event and change the state of the Login Component', () => {

        const wrapper = shallow(<Login />);
        wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}});

        expect(wrapper.state('email')).to.equal('blah@gmail.com');
    });
});

describe('Password input', () => {

    it('should respond to change event and change the state of the Login Component', () => {

        const wrapper = shallow(<Login />);
        wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'cats'}});

        expect(wrapper.state('password')).to.equal('cats');
    });
});
>>>>>>> f096c349225e6aa60af75bd8c98b3b0411796134
*/
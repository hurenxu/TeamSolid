import React from 'react';
//import chai from 'chai';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import Login from '../client/components/Login';
// TODO: change email to username
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Login Component', () => {
    it('should allow users to login', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('input')).to.have.length(2);
    });

    it('should have props for email and password', function () {
        const wrapper = shallow(<App/>);
        expect(wrapper.props().email).to.isDefined();
        expect(wrapper.props().password).to.isDefined();
    });

    it('should simulates click events', ()=> {
        const onButtonClick = sinon.spy();
        const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
        wrapper.find('LoginButton').simulate('click');
        assert(onButtonClick.calledOnce);
    });

    // within the Login components describe function
    it('renders a email input', () => {
        expect(shallow(<App />).find('#email').length).to.equal(1);
    });
    it('renders a password input', () => {
        expect(shallow(<App />).find('#password').length).to.equal(1);
    });
});

// within the Login components describe function
describe('Email input', () => {

    it('should respond to change event and change the state of the Login Component', () => {

        const wrapper = shallow(<App />);
        wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}});

        expect(wrapper.state('email')).to.equal('blah@gmail.com');
    });
});

describe('Password input', () => {

    it('should respond to change event and change the state of the Login Component', () => {

        const wrapper = shallow(<App />);
        wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'cats'}});

        expect(wrapper.state('password')).to.equal('cats');
    });
});

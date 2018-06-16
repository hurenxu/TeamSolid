import React, { Component } from 'react'
//import chai from 'chai';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
const sinon = require('sinon');

import App from '../client/components/App';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('App Component', () => {
    it('should have a header inside the app', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find('header')).to.have.length(1);
    });
//
    it('should have a title inside the app', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find('h1')).to.have.length(1);
    });

    it('should have a app title called peterbook', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find('h1').text()).to.equal('PeterBook');
    });

    it('should have a default email that is empty', () => {
        const wrapper = shallow(<App/>);
        //handleLoginCrudSwap("123@456.oom", "123456");
        expect(wrapper.state('email')).to.equal("");
    });

    it('should update email when change', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.state('password')).to.equal("");
        wrapper.setState({ email: '123@456.com' });
        expect(wrapper.state('email')).to.equal("123@456.com");
    });

    it('should have a default password that is empty', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.state('password')).to.equal("");
    });

    it('should update password when change', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.state('password')).to.equal("");
        wrapper.setState({ password: '123456' });
        expect(wrapper.state('password')).to.equal("123456");
    });
});
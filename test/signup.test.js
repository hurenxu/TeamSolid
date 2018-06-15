import React, { Component } from 'react'
//import chai from 'chai';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
const sinon = require('sinon');
import Signup from '../client/components/Signup';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jsdom-global/register';

Enzyme.configure({ adapter: new Adapter() })

describe('Signup Component', () => {
    it('should have email and password', () => {
        const wrapper = shallow(<Signup/>);
        expect(wrapper.find('Form').first().children()).to.have.length(5);
    });

    it('should have two buttons', () => {
        const wrapper = shallow(<Signup />);
        expect(wrapper.find('Button')).to.have.length(4);
    });

    it('should have a default dimmer state', () => {
        const wrapper = mount(<Signup />);
        expect(wrapper.state('dimmer')).to.equal("blurring");
    });

    it('should have a default username state', () => {
        const wrapper = mount(<Signup />);
        expect(wrapper.state('username')).to.equal("");
    });

    it('should have a default password state', () => {
        const wrapper = mount(<Signup />);
        expect(wrapper.state('password')).to.equal("");
    });

    it('should have a default email state', () => {
        const wrapper = mount(<Signup />);
        expect(wrapper.state('email')).to.equal("");
    });
});

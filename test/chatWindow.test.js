import React, { Component } from 'react'
//import chai from 'chai';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
const sinon = require('sinon');

import ChatWindow from '../client/components/ChatWindow';

import jsdom from 'jsdom'
import 'jsdom-global/register';

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

describe('chatWindow Component', () => {

    it('should have a state in TextArea equal to content of message', () => {
        const wrapper = shallow(<ChatWindow />);
        expect(wrapper.state('message')).to.equal(''); // successful
    });

    it('should have a image for chat window', () => {
        const wrapper = mount(<ChatWindow />);
        expect(wrapper.find('Header')).to.have.length(1); // successful
        expect(wrapper.find('Header').first().children()).to.have.length(1); // successful
        wrapper.find('Grid').first().simulate('change'); // successful
        expect(wrapper.state('message')).to.equal(''); // successful
    });

    it('should have a form', () => {
        const wrapper = shallow(<ChatWindow />);
        expect(wrapper.find('Form')).to.have.length(1); // successful
    });

    it('should have a valid onChange state in TextArea', () => {
        const wrapper = mount(<ChatWindow />);
        wrapper.find('Grid').first().simulate('change'); // successful
        expect(wrapper.state('message')).to.equal(''); // successful
    });

});
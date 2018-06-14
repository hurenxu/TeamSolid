import React, { Component } from 'react'
//import chai from 'chai';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
const sinon = require('sinon');

import ChatWindow from '../client/components/ChatWindow';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

describe('chatWindow Component', () => {

    it('should have a state in TextArea equal to content of message', () => {
        const wrapper = shallow(<ChatWindow />);
        expect(wrapper.state('message')).to.equal(''); // successful
    });
});
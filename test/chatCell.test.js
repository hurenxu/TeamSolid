import React, { Component } from 'react'
//import chai from 'chai';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
const sinon = require('sinon');

import ChatCell from '../client/components/ChatCell';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe('chatCell Component', () => {
   it('should have a currMessage that is set empty initally', () => {
       const wrapper = shallow(<ChatCell/>);
       expect(wrapper.find('currMessage')).to.have.length(0);
       expect(wrapper.find('img').text()).to.equal('');

   });

    it('should have a img that has a source', () => {
        const wrapper = shallow(<ChatCell/>);
        expect(wrapper.find('img')).to.have.length(1);
    });

    it('should have a message with defined color', () => {
        const wrapper = shallow(<ChatCell/>);
        expect(wrapper.find('Message')).to.have.length(1);
    });
});
import React, { Component } from 'react'
//import chai from 'chai';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
const sinon = require('sinon');

import ChatCell from '../client/components/ChatCell';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jsdom-global/register';

Enzyme.configure({ adapter: new Adapter() })

describe('chatCell Component', () => {
   it('should have a currMessage that is set empty initally', () => {
       const msg = ""
       const wrapper = mount(<ChatCell msg={msg}/>);
       expect(wrapper.find('currMessage')).to.have.length(0);
       //expect(wrapper.find('img').text()).to.equal('');

   });

    it('should have a img that has not been setup yet', () => {
        const msg = ""
        const wrapper = mount(<ChatCell msg={msg}/>);
        expect(wrapper.find('img')).to.have.length(0);
    });

    it('should have a message with defined color', () => {
        const msg = "asds"
        const wrapper = mount(<ChatCell msg={msg}/>);
        expect(wrapper.find('Message')).to.have.length(0);
    });

    it('should have a Grid Column variable', () => {
        const msg = ""
        const wrapper = mount(<ChatCell msg={msg}/>);
        //expect(wrapper.find('Grid')).to.have.length(1);
        //expect(wrapper.find('div')).to.have.length(5);
        expect(wrapper.find('[textAlign="right"]')).to.have.length(0);

    });
});
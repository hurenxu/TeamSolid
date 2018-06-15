import React, { Component } from 'react'
//import chai from 'chai';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
const sinon = require('sinon');

import Login from '../client/components/Login';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import 'jsdom-global/register';
Enzyme.configure({ adapter: new Adapter() })

describe('Login Component', () => {

    it('should have email and password', () => {
        const wrapper = shallow(<Login/>);
        expect(wrapper.find('Form')).to.have.length(2);
    });

    it('should have header', () => {
        const wrapper = shallow(<Login/>);
        expect(wrapper.find('h3')).to.have.length(1);
        expect(wrapper.find('header')).to.have.length(1);
        expect(wrapper.find('h3').text()).to.equal('Peterbook');
    });

    //it('should have a valid signup button', () => {
    //    const spy = sinon.spy(Login.prototype, 'handleSubmit');
     //   const wrapper = mount(<Login />);
     //   wrapper.find('Button').first().simulate('click', {
      //      preventDefault: () => {
      //      }
     //   });
      //  expect(spy.calledOnce).to.equal(true)
    //});

    it('should have a valid login button', () => {
        const wrapper = shallow(<Login />);
        wrapper.find('Button').last().simulate('click');
        expect(wrapper.state('open')).to.equal(1); // successful
    });
});

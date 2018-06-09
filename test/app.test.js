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
});
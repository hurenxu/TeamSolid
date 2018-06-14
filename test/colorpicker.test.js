import React, { Component } from 'react'
//import chai from 'chai';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
const sinon = require('sinon');

import Colorpicker from '../client/components/Colorpicker';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

describe('Colorpicker Component', () => {
    it('should have a header', () => {
        const wrapper = shallow(<Colorpicker/>);
        expect(wrapper.find('h1')).to.have.length(1);
        expect(wrapper.find('h1').text()).to.equal('Hello');
    });
});
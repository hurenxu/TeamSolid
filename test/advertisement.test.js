import React, { Component } from 'react'
//import chai from 'chai';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
const sinon = require('sinon');

import Advertisement from '../client/components/Ad';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Advertisement Component', () => {
    it('should have a button for ads removal', () => {
        const wrapper = shallow(<Advertisement/>);
        expect(wrapper.find('Button')).to.have.length(1);
    });
    //it('should simulate removal upon click', () => {
    //    const wrapper = shallow(<Advertisement/>);
    //    wrapper.find('Button').last().simulate('click');
    //    expect(wrapper.state('').to.equal();
    //});
});
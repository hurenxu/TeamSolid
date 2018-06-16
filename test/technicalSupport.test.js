import React, { Component } from 'react'
//import chai from 'chai';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
const sinon = require('sinon');

import TechnicalSupport from '../client/components/TechnicalSupport';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jsdom-global/register';

Enzyme.configure({ adapter: new Adapter() })

describe('TechnicalSupport Component', () => {
    it('should have allow to set state', () => {
        const wrapper = shallow(<TechnicalSupport/>);
        wrapper.setState({ open: true });
        expect(wrapper.state('open')).to.equal(true);
    });

    it('should have a default state status', () => {
        const wrapper = mount(<TechnicalSupport/>);
        expect(wrapper.state('status')).to.equal("default");
    });

    it('should change status to 0', () => {
        const wrapper = mount(<TechnicalSupport/>);
        wrapper.setState({ status: '0' });
        expect(wrapper.state('status')).to.equal("0");
    });

    it('should have a default state open', () => {
        const wrapper = mount(<TechnicalSupport/>);
        wrapper.setState({ open: true });
        expect(wrapper.state('open')).to.equal(true);
    });

    it('should change', () => {
        const wrapper = mount(<TechnicalSupport/>);
        expect(wrapper.find('div')).to.have.length(1);
    });

    it('should change open to true', () => {
        const wrapper = mount(<TechnicalSupport/>);
        wrapper.setState({ open: true });
        expect(wrapper.state('open')).to.equal(true);
    });

    it('should have a text', () => {
        const wrapper = mount(<TechnicalSupport/>);
        expect(wrapper.find('Modal')).to.have.length(1);
    });
});
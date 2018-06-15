import React, { Component } from 'react'
//import chai from 'chai';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
const sinon = require('sinon');

import CrudRow from '../client/components/CrudRow';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })


describe('CrudRow Component', () => {

    it('should have a button', () => {
        const wrapper = shallow(<CrudRow/>);
        expect(wrapper.find('Button')).to.have.length(1);
    });

    it('should have a red button', () => {
        const wrapper = shallow(<CrudRow/>);
        expect(wrapper.find('[color="red"]')).to.have.length(1);
    });

    it('should have onClick event for button', () => {
        const wrapper = shallow(<CrudRow/>);
        expect(wrapper.find('[onClick]').text()).to.equal("<Button />");
    });

});

import React, { Component } from 'react'
//import chai from 'chai';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
const sinon = require('sinon');

import FriendManagement from '../client/components/FriendManagement';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('FriendManagement Component', () => {
    it('should have a div build into friendManagement', () => {
        const wrapper = shallow(<FriendManagement/>);
        expect(wrapper.find('div')).to.have.length(1);
        //expect(wrapper.find('Icon').first().children()).to.have.length(0);

    });

    it('should have 5 components include header, input, button, icon, card group', () => {
        const wrapper = shallow(<FriendManagement/>);
        //expect(wrapper.find('[color="red"]')).to.have.length(1);
        expect(wrapper.find('div').first().children()).to.have.length(5);

    });

    it('should include header', () => {
        const wrapper = shallow(<FriendManagement/>);
        expect(wrapper.find('Header')).to.have.length(2);
    });

    it('should include input', () => {
        const wrapper = shallow(<FriendManagement/>);

        expect(wrapper.find('Input')).to.have.length(1);
    });

    it('should include button', () => {
        const wrapper = shallow(<FriendManagement/>);

        expect(wrapper.find('Button')).to.have.length(1);
    });

    it('should have an icon named right arrow', () => {
        const wrapper = shallow(<FriendManagement/>);

        expect(wrapper.find('[name="right arrow"]')).to.have.length(1);
    });

});
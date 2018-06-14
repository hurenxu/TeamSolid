import React, { Component } from 'react'
//import chai from 'chai';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
const sinon = require('sinon');

import FeedEvent from '../client/components/FeedEvent';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('FeedEvent Component', () => {
    it('should have a Icon build into feedevent', () => {
        const wrapper = shallow(<FeedEvent/>);
        expect(wrapper.find('Icon')).to.have.length(1);
        expect(wrapper.find('Icon').first().children()).to.have.length(0);

    });

    it('should have a prompter for username', () => {
        const wrapper = shallow(<FeedEvent/>);
        expect(wrapper.find('a')).to.have.length(1);
    });

    it('should have a icon named like', () => {
        const wrapper = shallow(<FeedEvent/>);
        expect(wrapper.find('[name="like"]')).to.have.length(1);
        //expect(wrapper.find({ prop: 'Likes' })).to.have.length(1);

    });


});
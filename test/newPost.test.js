import React, { Component } from 'react'
//import chai from 'chai';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
const sinon = require('sinon');

import NewPost from '../client/components/NewPost';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jsdom-global/register';

Enzyme.configure({ adapter: new Adapter() })

describe('NewPost Component', () => {
    it('should have two buttons', () => {
        const wrapper = shallow(<NewPost/>);
        expect(wrapper.find('Form')).to.have.length(1);
        //expect(wrapper.find('message')).to.have.length(1);

    });

    it('should have an empty username by default', () => {
        const wrapper = shallow(<NewPost/>);
        expect(wrapper.state('open')).to.equal(0);
    });

    it('should update username when change', () => {
        const wrapper = shallow(<NewPost/>);
        expect(wrapper.state('open')).to.equal(0);
        wrapper.setState({ open: 1 });
        expect(wrapper.state('open')).to.equal(1);
    });

    it('should have an empty message by default', () => {
        const wrapper = mount(<NewPost/>);
        expect(wrapper.state('message')).to.equal("");
    });

    it('should update message when change', () => {
        const wrapper = mount(<NewPost/>);
        wrapper.setState({ message: 'update message' });
        expect(wrapper.state('message')).to.equal("update message");
    });

});
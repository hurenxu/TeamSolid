import React, { Component } from 'react'
//import chai from 'chai';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
const sinon = require('sinon');

import FeedEvent from '../client/components/FeedEvent';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jsdom-global/register';

Enzyme.configure({ adapter: new Adapter() })

describe('FeedEvent Component', () => {
    it('should have a Icon build into feedevent', () => {
        const files = []
        const comments = []
        const wrapper = shallow(<FeedEvent  files={files} comments={comments}/>);
        expect(wrapper.find('Icon')).to.have.length(3);
        expect(wrapper.find('Icon').first().children()).to.have.length(0);
    });

    it('should have a prompter for username', () => {
        const files = []
        const comments = []
        const wrapper = shallow(<FeedEvent  files={files} comments={comments}/>);
        expect(wrapper.find('a')).to.have.length(1);
    });

    it('should have a icon named like', () => {
        const files = []
        const comments = []
        const wrapper = shallow(<FeedEvent  files={files} comments={comments}/>);
        expect(wrapper.find('[name="like"]')).to.have.length(1);
        //expect(wrapper.find({ prop: 'Likes' })).to.have.length(1);
    });

    it('should have a text for feed', () => {
        const files = []
        const comments = []
        const wrapper = shallow(<FeedEvent  files={files} comments={comments}/>);
        expect(wrapper.find('[text]')).to.have.length(1);
    });

    it('should have a default collapsed state set to be true', () => {
        const files = []
        const comments = []
        const wrapper = shallow(<FeedEvent  files={files} comments={comments}/>);
        expect(wrapper.state('collapsed')).to.equal(true);
    });

    it('should have a default collapsed state set to be true', () => {
        const files = []
        const comments = []
        const wrapper = shallow(<FeedEvent  files={files} comments={comments}/>);
        wrapper.setState({collapsed:false})
        expect(wrapper.state('collapsed')).to.equal(false);
    });

    it('should have a default showMore state set to be false', () => {
        const files = []
        const comments = []
        const wrapper = shallow(<FeedEvent  files={files} comments={comments}/>);
        expect(wrapper.state('showMore')).to.equal(false);
    });

    it('should have a default collapsed state set to be true', () => {
        const files = []
        const comments = []
        const wrapper = shallow(<FeedEvent  files={files} comments={comments}/>);
        wrapper.setState({showMore:true})
        expect(wrapper.state('showMore')).to.equal(true);
    });
});
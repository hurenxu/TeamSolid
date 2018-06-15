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

describe('FeedInfo Component', () => {
    it('should have a Icon build into feedinfo', () => {
        const files = []
        const comments = []
        const wrapper = shallow(<FeedEvent  files={files} comments={comments}/>);
        expect(wrapper.find('Icon')).to.have.length(3);
        expect(wrapper.find('[name]')).to.have.length(3);
    });

    it('should update username when change', () => {
        const files = []
        const comments = []
        const wrapper = shallow(<FeedEvent  files={files} comments={comments}/>);
        wrapper.setState({ username: '123456' });
        expect(wrapper.state('username')).to.equal("123456");
    });

    it('should change open-support to 0', () => {
        const files = []
        const comments = []
        const wrapper = shallow(<FeedEvent  files={files} comments={comments}/>);
        wrapper.setState({ openSupport: '0' });
        expect(wrapper.state('openSupport')).to.equal("0");
    });

    it('should change open-support to 1', () => {
        const files = []
        const comments = []
        const wrapper = shallow(<FeedEvent  files={files} comments={comments}/>);
        wrapper.setState({ openSupport: '1' });
        expect(wrapper.state('openSupport')).to.equal("1");
    });

    it('should update subMessage', () => {
        const files = []
        const comments = []
        const wrapper = shallow(<FeedEvent  files={files} comments={comments}/>);
        wrapper.setState({ subMsg: 'Subscribed' });
        //expect(wrapper.state('subMsg')).to.equal("1");
        expect(wrapper.state('subMsg')).to.equal("Subscribed");
        //expect(wrapper.find({ prop: 'Likes' })).to.have.length(1);

    });
});
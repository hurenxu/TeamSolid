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
    it('should have a Icon build into feedinfo', () => {
        const wrapper = shallow(<FeedEvent/>);
        expect(wrapper.find('Icon')).to.have.length(1);
        expect(wrapper.find('[name]')).to.have.length(1);
    });

    it('should update username when change', () => {
        const wrapper = shallow(<FeedEvent/>);
        wrapper.setState({ username: '123456' });
        expect(wrapper.state('username')).to.equal("123456");
    });

    it('should change open-support to 0', () => {
        const wrapper = mount(<FeedEvent/>);
        wrapper.setState({ openSupport: '0' });
        expect(wrapper.state('openSupport')).to.equal("0");
    });

    it('should change open-support to 1', () => {
        const wrapper = mount(<FeedEvent/>);
        wrapper.setState({ openSupport: '1' });
        expect(wrapper.state('openSupport')).to.equal("1");
    });

    it('should update subMessage', () => {
        const wrapper = mount(<FeedEvent/>);
        wrapper.setState({ subMsg: 'Subscribed' });
        //expect(wrapper.state('subMsg')).to.equal("1");
        expect(wrapper.state('subMsg')).to.equal("Subscribed");
        //expect(wrapper.find({ prop: 'Likes' })).to.have.length(1);

    });
});
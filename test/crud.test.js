import React, { Component } from 'react'
//import chai from 'chai';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
const sinon = require('sinon');

import Crud from '../client/components/Crud';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Crud Component', () => {

    //it('should have a signout buttons', () => {
    //    const wrapper = shallow(<Crud/>);
    //    expect(wrapper.find('CrudRow')).to.have.length(1);
    //});

});
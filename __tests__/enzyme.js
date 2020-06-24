import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import { find, findAll, enzymeFind} from "styled-components/test-utils"
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';


import Candidate from '../client/components/Candidate';
import Contest from '../client/components/Contest';
import Election from '../client/components/Election';
import Logo from '../client/components/Logo';
import Official from '../client/components/Official';
import Test from '../client/components/TestComponent';

configure({ adapter: new Adapter()});

describe('React unit tests', ()=>{
  describe('Logo', () => {
    let wrapper

    beforeAll(() => {
      wrapper = shallow(<Logo />);
    })


    it('Has logo name in text', () =>{
      expect(wrapper.text()).toEqual('Congre$$')
    })
    it('Logo is encapsulated in styled span "LogoContent"', () => {
      console.log(wrapper.debug())
      expect(wrapper.find('logoSpan')).toHaveLength(1)
    })

  })

  describe('Official', () => {
    let wrapper

    beforeAll(() => {
      wrapper = shallow(<Official />);
    })


  })

  describe('Election', () => {
    let wrapper

    beforeAll(() => {
      wrapper = shallow(<Election />);
    })


  })

  describe('Candidate', () => {
    let wrapper

    beforeAll(() => {
      wrapper = shallow(<Candidate />);
    })


  })

  describe('Contest', () => {
    let wrapper

    beforeAll(() => {
      wrapper = shallow(<Contest />);
    })


  })


  describe('test component', () => {
    let wrapper

    beforeAll(() => {
      wrapper = shallow(<Test />);
    })


    xit('Renders a <div>', () =>{
      console.log(wrapper.type())
      expect(wrapper.type()).toEqual('div')
    })

  })
})
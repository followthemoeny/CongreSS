import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import { find, findAll, enzymeFind } from 'styled-components/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import Candidate from '../client/components/Candidate';
import Contest from '../client/components/Contest';
import Election from '../client/components/Election';
import Logo from '../client/components/Logo';
import Official from '../client/components/Official';
import Finances from '../client/components/Finances';
import Officials from '../client/routes/Officials';
//import Test from '../client/components/TestComponent';

configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('Logo', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(<Logo />);
    });

    it('Logo is encapsulated in styled span "LogoContent"', () => {
      expect(wrapper.find('LogoContent')).toHaveLength(1);
      expect(wrapper.find('LogoContent').text()).toEqual('Congre$$');
    });
  });

  describe('Official', () => {
    let wrapper;
    let noPic;
    const props = {
      name: 'Donald J. Trump',
      address: [
        {
          line1: '1600 Pennsylvania Avenue Northwest',
          city: 'Washington',
          state: 'DC',
          zip: '20500',
        },
      ],
      party: 'Republican Party',
      phones: ['(202) 456-1111'],
      urls: ['https://www.whitehouse.gov/'],
      photoUrl:
        'https://www.whitehouse.gov/sites/whitehouse.gov/files/images/45/PE%20Color.jpg',
      channels: [
        {
          type: 'Facebook',
          id: 'DonaldTrump',
        },
        {
          type: 'Twitter',
          id: 'potus',
        },
        {
          type: 'YouTube',
          id: 'whitehouse',
        },
      ],
      position: 'President of the United States',
      officialId: 0,
    };

    beforeAll(() => {
      wrapper = shallow(<Official {...props} />);
      noPic = shallow(<Official />);
    });
    it('Official has styled components Name and Position and their texts are from the props', () => {
      // console.log(wrapper.debug())
      expect(wrapper.find('Name').text()).toEqual(props.name);
      expect(wrapper.find('Position').text()).toEqual(props.position);
    });

    it('properly omits the photo on an error', () => {
      console.log(noPic.debug());
      expect(noPic.find('Picture')).toHaveLength(0);
    });

    it('Changes button shape based on picture presence', () => {
      expect(wrapper.find('MoreInfoButton')).toHaveStyleRule(
        'border-radius',
        '0 0 10px 10px',
      );
      expect(noPic.find('MoreInfoButton')).toHaveStyleRule(
        'border-radius',
        '10px',
      );
    });
  });

  describe('Election', () => {
    let wrapper;
    let noData;
    const dataProps = {
      contests: [
        {
          type: 'General',
          ballotTitle: 'US HOUSE OF REPRESENTATIVES DISTRICT 11',
          office: 'US HOUSE OF REPRESENTATIVES DISTRICT 11',
          level: ['country'],
          district: {
            name: 'US HOUSE OF REPRESENTATIVES DISTRICT 11',
            scope: 'congressional',
            id: '0',
          },
          numberElected: '1',
          ballotPlacement: '3',
          sources: [
            {
              name: 'Voting Information Project',
              official: true,
            },
          ],
          candidates: [
            {
              name: 'Lynda Bennett',
              party: 'REPUBLICAN',
            },
            {
              name: 'Madison Cawthorn',
              party: 'REPUBLICAN',
            },
          ],
        },
      ],
      state: 'NC',
    };
    const noDataProps = {};

    beforeAll(() => {
      wrapper = mount(<Election {...dataProps} />);
      noData = mount(<Election {...noDataProps} />);
    });

    afterAll(() => {
      wrapper.unmount();
      noData.unmount();
    });

    it('Correctly has as many contests as there are contests', () => {
      expect(wrapper.find('Contest')).toHaveLength(dataProps.contests.length);
    });

    it('correctly has as many Candidate divs as there are candidates', () => {
      const numCandidates = dataProps.contests.reduce((acc, curr) => {
        return (acc += curr.candidates.length);
      }, 0);

      expect(wrapper.find('Candidate')).toHaveLength(numCandidates);
    });

    it('gracefully handles missing election data with a div className = NoContest', () => {
      expect(noData.find('.NoContest')).toHaveLength(1);
    });
  });

  describe('Candidate', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(<Candidate />);
    });

    it('Pressing the button shows finances', () => {
      expect(wrapper.find('Finances')).toHaveLength(0);
      wrapper.find('button').simulate('click');
      expect(wrapper.find('Finances')).toHaveLength(1);
    });
  });

  describe('Contest', () => {
    let wrapper;
    let noProps;

    const dataProps = {
      candidates: [
        {
          name: 'test',
        },
        {
          name: 'test',
        },
      ],
    };
    const noData = {};

    beforeAll(() => {
      wrapper = shallow(<Contest {...dataProps} />);
      noProps = shallow(<Contest {...noData} />);
    });

    it('Renders as many candidate divs as there are candidates', () => {
      expect(wrapper.find('Candidate')).toHaveLength(
        dataProps.candidates.length,
      );
    });

    it('Displays an apology div if there is no candidate information', () => {
      expect(noProps.find('.NoCand')).toHaveLength(1);
    });
  });

  // xdescribe('test component', () => {
  //   let wrapper

  //   beforeAll(() => {
  //     wrapper = shallow(<Test />);
  //   })

  //   xit('Renders a <div>', () =>{
  //     console.log(wrapper.type())
  //     expect(wrapper.type()).toEqual('div')
  //   })

  // })
});

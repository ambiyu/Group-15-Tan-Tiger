import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import '@testing-library/jest-dom/extend-expect';
import '../setupTests';

import CJRP from '../pages/CreateJoinRoomPage'

Enzyme.configure({ adapter: new Adapter() });

describe('CreateJoinRoomPage renders correctly', () => {

    it('checks if the CreateJoinRoomPage renders correctly ', () => {
        const wrapper = shallow(<CJRP />);
        // const button = wrapper.find('tab');
        // const text = wrapper.find('tabs');
        // text.simulate('click')
        // expect(wrapper.find('WithStyles(ForwardRef(Tabs))')).toHaveLength(1)
        // wrapper.find('WithStyles(ForwardRef(Tabs))').childAt(1).simulate('click');
        // button.simulate('click')

        const setState = jest.fn();
        const useStateSpy = jest.spyOn(React, 'useState')
        useStateSpy.mockImplementation((init) => [init, setState]);
        // expect(wrapper.find('#tabs')).toHaveLength(1)
        wrapper.find('#tabs').props().onChange();
          expect(setState).toHaveBeenCalledWith(1);


        // const stateSetter = jest.fn()
        // jest
        //     .spyOn(React, 'useState')
        //     //Simulate that mode state value was set to 'new mode value'
        //     .mockImplementation(stateValue => [stateValue = 1, stateSetter])

        expect(wrapper).toContainExactlyOneMatchingElement('Create');



        // expect(wrapper.find('Join')).toHaveLength(1)



        // expect(wrapper).find('Create');
        // const text = wrapper.find('div div');
        // expect(text.text()).toBe('yup');

    })

})
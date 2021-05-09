import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import '@testing-library/jest-dom/extend-expect';
import '../setupTests';

import CJRP from '../pages/CreateJoinRoomPage'

Enzyme.configure({ adapter: new Adapter() });

describe('CreateJoinRoomPage renders correctly', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CJRP />);
        // const setState = jest.fn();
        // const useStateSpy = jest.spyOn(React, 'useState')
        // useStateSpy.mockImplementation((init) => [init, setState]);
    })


    it('checks if the correct component Create is dispayed when the tabs are clicked ', () => {

        // const button = wrapper.find('tab');
        // const text = wrapper.find('tabs');
        // text.simulate('click')
        // expect(wrapper.find('WithStyles(ForwardRef(Tabs))')).toHaveLength(1)
        // wrapper.find('WithStyles(ForwardRef(Tabs))').childAt(1).simulate('click');
        // button.simulate('click')


        // expect(wrapper.find('#tabs')).toHaveLength(1)
        // wrapper.find('#tabs').props().onChange();


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



    it('checks if the correct component Join is dispayed when the tabs are clicked ', () => {

        wrapper.find('#tabs').props().onChange();
        expect(wrapper).toContainExactlyOneMatchingElement('Join');

    })


    it('checks that the component entirely displays correctly', () => {
        expect(wrapper).toContainMatchingElements(1, '#container');
        expect(wrapper).toContainMatchingElements(1, '#cssBaseLine');
        expect(wrapper).toContainMatchingElements(1, '#appBar');
        expect(wrapper).toContainExactlyOneMatchingElement('#tabs');
        expect(wrapper).toContainExactlyOneMatchingElement('#t1');
        expect(wrapper).toContainExactlyOneMatchingElement('#t2');
    })



})
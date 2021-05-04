import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import '@testing-library/jest-dom/extend-expect';

import CJRP from '../pages/CreateJoinRoomPage'
import c from '../components/Create'

Enzyme.configure({ adapter: new Adapter() });

describe('CreateJoinRoomPage renders correctly', () => {

    it('checks if the CreateJoinRoomPage renders correctly ', () => {
        const wrapper = shallow(<CJRP />);
        // const button = wrapper.find('tab');

        // button.simulate('click')

        // expect(wrapper).toContainExactlyOneMatchingElement('Create');
        expect(wrapper.find('Create')).toHaveLength(1)
        // expect(wrapper).find('Create');
        // const text = wrapper.find('div div');
        // expect(text.text()).toBe('yup');

    })

})
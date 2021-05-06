// import React from 'react';
// import'../setupTests'
// import {shallow } from 'enzyme'



import React, { useContext } from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import '@testing-library/jest-dom/extend-expect';
import '../setupTests';
import {Button, TextField} from '@material-ui/core'



import { RoomContextProvider } from '../context/RoomContextProvider';
import Join from '../components/Join';


describe('check this component', () => {

    let wrapper;

    beforeEach(() => {
        // wrapper = shallow(<RoomContextProvider><Create /></RoomContextProvider>)

        wrapper = mount(<Join />, {
            wrappingComponent: RoomContextProvider
        })

    })

    it('should render properly', () => {

        expect(wrapper).toContainMatchingElements(2, TextField);

        expect(wrapper).toContainExactlyOneMatchingElement(Button)

    })


})
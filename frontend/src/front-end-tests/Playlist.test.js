// import React from 'react';
// import'../setupTests'
// import {shallow } from 'enzyme'



import React, { useContext } from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import '@testing-library/jest-dom/extend-expect';
import '../setupTests';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'





import { RoomContextProvider } from '../context/RoomContextProvider';
import Playlist from '../components/Playlist';
import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

Enzyme.configure({ adapter: new Adapter() });


describe('check this component', () => {

    let wrapper;

    beforeEach(() => {
        // wrapper = shallow(<RoomContextProvider><Create /></RoomContextProvider>)

        wrapper = mount(<Playlist />, {
            wrappingComponent: RoomContextProvider
        })

    })

    it('should render properly', () => {

        expect(wrapper).toContainExactlyOneMatchingElement(List);
        // expect(wrapper).toContainExactlyOneMatchingElement(ListItem);
        // expect(wrapper).toContainExactlyOneMatchingElement(ListItemAvatar);
        // expect(wrapper).toContainExactlyOneMatchingElement(Avatar);
        // expect(wrapper).toContainExactlyOneMatchingElement(Divider);
        // expect(wrapper).toContainExactlyOneMatchingElement(ListItemText);


    })


})
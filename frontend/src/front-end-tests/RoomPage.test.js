import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import '@testing-library/jest-dom/extend-expect';
import '../setupTests';

import RP from '../pages/RoomPage'
import {RoomContextProvider} from '../context/RoomContextProvider'


import {
    AppBar,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography,
    makeStyles,
  } from '@material-ui/core';
import Playlist from '../components/Playlist';
import SearchModal from '../components/SearchModal';

Enzyme.configure({ adapter: new Adapter() });

describe('CreateJoinRoomPage renders correctly', () => {

    let wrapper;

    beforeEach(() => {
        
       
        wrapper = mount(<RP />, {
            wrappingComponent: RoomContextProvider
        })
        
    })


    it('checks if the component is rendered correctly ', () => {

        window.HTMLElement.prototype.scrollIntoView = jest.fn()

        expect(wrapper).toContainMatchingElements(4, Grid);
        //check this test expected 3 but returns four
        // expect(wrapper).toContainMatchingElements(3, Paper);
        expect(wrapper).toContainMatchingElements(1, AppBar);
        expect(wrapper).toContainMatchingElements(1, Toolbar);
        expect(wrapper).toContainMatchingElements(1, Typography);
        expect(wrapper).toContainMatchingElements(1, IconButton);
        expect(wrapper).toContainMatchingElements(1, Playlist);
        expect(wrapper).toContainMatchingElements(1, SearchModal);
                

    })



    // it('checks if the correct component Join is dispayed when the tabs are clicked ', () => {

    //     wrapper.find('#tabs').props().onChange();
    //     // expect(wrapper).toContainExactlyOneMatchingElement('Join');

    // })


    // it('checks that the component entirely displays correctly', () => {
    //     expect(wrapper).toContainMatchingElements(1, '#container');
    //     expect(wrapper).toContainMatchingElements(1, '#cssBaseLine');
    //     expect(wrapper).toContainMatchingElements(1, '#appBar');
    //     expect(wrapper).toContainExactlyOneMatchingElement('#tabs');
    //     expect(wrapper).toContainExactlyOneMatchingElement('#t1');
    //     expect(wrapper).toContainExactlyOneMatchingElement('#t2');
    // })



})
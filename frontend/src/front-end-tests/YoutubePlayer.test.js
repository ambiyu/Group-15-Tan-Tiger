import React, { useContext } from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import '@testing-library/jest-dom/extend-expect';
import '../setupTests';
import YouTube from '@u-wave/react-youtube';

import * as AppContext from '../context/RoomContextProvider'
import { RoomContextProvider, RoomContext } from '../context/RoomContextProvider';
import useRoomState from '../hooks/useRoomState';
import {Button, TextField} from '@material-ui/core'


import YoutubePlayer from '../components/YoutubePlayer'

Enzyme.configure({ adapter: new Adapter() });

describe('check this component', () => {

    let wrapper;

    beforeEach(() => {

        wrapper = mount(<YoutubePlayer />, {
            wrappingComponent: RoomContextProvider
        })

    })

    it('should render properly', () => {
        expect(wrapper).toContainExactlyOneMatchingElement(YouTube);

    })


})
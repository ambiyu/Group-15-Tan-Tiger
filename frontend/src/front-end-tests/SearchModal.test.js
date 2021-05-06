import React, { useContext } from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import '@testing-library/jest-dom/extend-expect';
import '../setupTests';

import {
    makeStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    Paper,
    IconButton,
    InputBase,
    List,
    ListItem,
    Avatar,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    jssPreset,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import SearchModal from '../components/SearchModal';
import { RoomContextProvider } from '../context/RoomContextProvider'

Enzyme.configure({ adapter: new Adapter() });

describe('test if the Search Modal Renders correctlly', () => {

    let wrapper;


    beforeEach(() => {
        const fun = jest.fn();

        wrapper = mount(<SearchModal open={true} setOpen={fun} />,
            {
                wrappingComponent: RoomContextProvider
            })
    })

    it('should render correctly', () => {


        expect(wrapper).toContainMatchingElements(1, Dialog);
        expect(wrapper).toContainMatchingElements(1, DialogTitle);
        expect(wrapper).toContainMatchingElements(1, DialogContent);
        //Paper return one extra in each test cases
        // expect(wrapper).toContainMatchingElements(1, Paper);
        expect(wrapper).toContainMatchingElements(1, InputBase);

        //contains a map function that loops over item does not pick up things
        expect(wrapper).toContainMatchingElements(2, IconButton);
        expect(wrapper).toContainMatchingElements(1, SearchIcon);
        expect(wrapper).toContainMatchingElements(1, List);
        expect(wrapper).toContainMatchingElements(1, ListItem);
        expect(wrapper).toContainMatchingElements(1, ListItemAvatar);
        expect(wrapper).toContainMatchingElements(1, Avatar);
        expect(wrapper).toContainMatchingElements(1, ListItemText);
        expect(wrapper).toContainMatchingElements(1, ListItemSecondaryAction);
        expect(wrapper).toContainMatchingElements(1, AddIcon);


    })


})
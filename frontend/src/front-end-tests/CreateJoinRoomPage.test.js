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
     
    })


    it('checks if the correct component Create is dispayed when the tabs are clicked ', () => {


        expect(wrapper).toContainExactlyOneMatchingElement('Create');



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
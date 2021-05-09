import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import '@testing-library/jest-dom/extend-expect';
import '../setupTests';

import { Dialog, DialogTitle, DialogContent, IconButton, InputBase, List } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SearchModal from '../components/SearchModal';
import { RoomContextProvider } from '../context/RoomContextProvider';

Enzyme.configure({ adapter: new Adapter() });

describe('test if the Search Modal Renders correctlly', () => {
  let wrapper;

  beforeEach(() => {
    const fun = jest.fn();

    wrapper = mount(<SearchModal open={true} setOpen={fun} />, {
      wrappingComponent: RoomContextProvider,
    });
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElements(1, Dialog);
    expect(wrapper).toContainMatchingElements(1, DialogTitle);
    expect(wrapper).toContainMatchingElements(1, DialogContent);

    expect(wrapper).toContainMatchingElements(1, InputBase);

    expect(wrapper).toContainMatchingElements(1, IconButton);
    expect(wrapper).toContainMatchingElements(1, SearchIcon);
    expect(wrapper).toContainMatchingElements(1, List);
  });
});

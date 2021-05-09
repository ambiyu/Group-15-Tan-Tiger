import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import '@testing-library/jest-dom/extend-expect';
import '../../setupTests';

import RP from '../RoomPage';
import { RoomContextProvider } from '../../context/RoomContextProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import SearchModal from '../../components/SearchModal';
import chatBox from '../../components/Chatbox';

Enzyme.configure({ adapter: new Adapter() });

describe('CreateJoinRoomPage renders correctly', () => {
  let wrapper;

  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    wrapper = mount(
      <Router>
        <RP />
      </Router>,
      {
        wrappingComponent: RoomContextProvider,
      }
    );
  });

  it('checks if the component is rendered correctly', () => {
    expect(wrapper).toContainMatchingElements(5, Grid);
    expect(wrapper).toContainMatchingElements(5, Paper);
    expect(wrapper).toContainMatchingElements(1, Toolbar);
    expect(wrapper).toContainMatchingElements(2, Typography);
    expect(wrapper).toContainMatchingElements(1, IconButton);
    expect(wrapper).toContainMatchingElements(1, SearchModal);
    expect(wrapper).toContainMatchingElements(1, chatBox);
  });
});

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import '@testing-library/jest-dom/extend-expect';
import '../setupTests';

import { RoomContextProvider } from '../context/RoomContextProvider';
import { Button, TextField } from '@material-ui/core';
import Create from '../components/Create';

Enzyme.configure({ adapter: new Adapter() });

describe('check this component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Create />, {
      wrappingComponent: RoomContextProvider,
    });
  });

  it('should render properly', () => {
    expect(wrapper).toContainExactlyOneMatchingElement('form');

    expect(wrapper).toContainMatchingElements(2, TextField);

    expect(wrapper).toContainExactlyOneMatchingElement(Button);
  });
});

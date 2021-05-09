import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import '@testing-library/jest-dom/extend-expect';
import '../setupTests';

import YouTube from '@u-wave/react-youtube';
import { RoomContextProvider } from '../context/RoomContextProvider';
import YoutubePlayer from '../components/YoutubePlayer';

Enzyme.configure({ adapter: new Adapter() });

describe('check this component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<YoutubePlayer />, {
      wrappingComponent: RoomContextProvider,
    });
  });

  it('should render properly', () => {
    expect(wrapper).toContainExactlyOneMatchingElement(YouTube);
  });
});

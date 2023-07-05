import * as React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';
import CenteredContainer from './commons/CenteredContainer';

describe('App', () => {
  it('renders App component', () => {
    render(<CenteredContainer />);

    screen.debug();
  });
});
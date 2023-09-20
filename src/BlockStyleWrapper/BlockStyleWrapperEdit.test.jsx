import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';

import BlockStyleWrapperEdit from './BlockStyleWrapperEdit';

jest.mock('react-portal', () => {
  return {
    Portal: ({ children }) => children,
  };
});

describe('BlockStyleWrapperEdit', () => {
  const defaultProps = {
    selected: true,
    block: {},
    data: {
      align: 'left',
      size: 'medium',
      styles: {
        backgroundColor: 'red',
        textColor: 'blue',
      },
    },
  };

  const initialState = {
    userSession: {
      token: 'mockToken',
    },
  };

  const mockStore = configureMockStore();
  const store = mockStore(initialState);

  it('renders correctly when selected is true', () => {
    const { container, getByTitle } = render(
      <Provider store={store}>
        <Router>
          <BlockStyleWrapperEdit {...defaultProps} />
        </Router>
      </Provider>,
    );

    expect(container.querySelector('.open-styles-button')).toBeInTheDocument();
    expect(container.querySelector('.styled')).toBeInTheDocument();
  });
});

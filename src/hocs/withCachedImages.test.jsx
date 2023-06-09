import React from 'react';
import { render, act } from '@testing-library/react';
import withCachedImages from './withCachedImages';
import '@testing-library/jest-dom/extend-expect';

describe('withCachedImages', () => {
  const TestComponent = ({ images }) => {
    return <div data-testid="test-component">{Object.keys(images).length}</div>;
  };
  const WrappedComponent = withCachedImages(TestComponent, {
    getImage: (props) => props.image,
  });
  const WrappedComponentWithDefault = withCachedImages(TestComponent);

  it('should render wrapped component without image', () => {
    const { getByTestId } = render(<WrappedComponent />);
    const testComponentNode = getByTestId('test-component');
    expect(testComponentNode).toHaveTextContent('0');
  });

  it('should render wrapped component without image and config', () => {
    const { getByTestId } = render(<WrappedComponentWithDefault />);
    const testComponentNode = getByTestId('test-component');
    expect(testComponentNode).toHaveTextContent('0');
  });

  it('should render wrapped component with image and load it', () => {
    // mock image to use in the test
    const mockImage = { src: '', onload: null };

    // mock Image constructor
    // the provided url in the test is not valid and should not be loaded
    // so we override the behaviour
    window.Image = jest.fn(() => mockImage);
    const { getByTestId, rerender } = render(
      <WrappedComponent image={'mock-image'} />,
    );
    const testComponentNode = getByTestId('test-component');
    expect(testComponentNode).toHaveTextContent('1');

    // verify that the image constructor has been called
    expect(window.Image).toHaveBeenCalled();
    // mock image load
    act(() => {
      mockImage.onload();
    });

    // verify that there is still one image when the component rerenders
    rerender(<WrappedComponent image="mock-image" />);
    expect(testComponentNode).toHaveTextContent('1');
  });
});

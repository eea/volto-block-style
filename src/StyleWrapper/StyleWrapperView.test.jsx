import { getInlineStyles, getStyle } from './StyleWrapperView';
import '@plone/volto/registry';

jest.mock('@plone/volto/registry', () => ({
  settings: {
    pluggableStyles: [{ id: 'style1', cssClass: 'someClass1' }],
    integratesBlockStyles: [],
  },
}));

jest.mock('../hocs', () => ({
  withCachedImages: jest.fn().mockImplementation((Component) => Component),
}));

jest.mock('../helpers', () => ({
  getFieldURL: jest.fn(),
}));

describe('getInlineStyles', () => {
  const data = {
    backgroundColor: 'red',
    textColor: 'blue',
    textAlign: 'left',
    fontSize: 'large',
    fontWeight: 'bold',
    height: '200px',
    shadowDepth: '10',
    shadowColor: '#000000',
    margin: { top: '1', right: '1', bottom: '1', left: '1', unit: 'em' },
    padding: { top: '2', right: '2', bottom: '2', left: '2', unit: 'em' },
    borderRadius: '5px',
  };

  const dataWithLessProperties = {
    margin: { top: '1', right: '1', bottom: '1', left: '1', unit: 'em' },
    padding: { top: '2', right: '2', bottom: '2', left: '2', unit: 'em' },
    borderRadius: '5px',
  };

  const expectedStyles = {
    backgroundColor: 'red',
    '--background-color': 'red',
    color: 'blue',
    '--text-color': 'blue',
    textAlign: 'left',
    fontSize: 'large',
    lineHeight: '110%',
    fontWeight: 'bold',
    height: '200px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 4166.666666666667)',
    margin: '1em 1em 1em 1em',
    padding: '2em 2em 2em 2em',
    borderRadius: '5px',
  };

  const expectedStylesWithLessProperties = {
    margin: '1em 1em 1em 1em',
    padding: '2em 2em 2em 2em',
    borderRadius: '5px',
  };

  it('returns the correct styles', () => {
    const props = {
      mode: 'edit',
    };

    const styles = getInlineStyles(data, props);
    expect(styles).toEqual(expectedStyles);
  });

  it('returns the correct styles', () => {
    const newData = {
      ...data,
      fontSize: 'x-large',
      margin: { top: '1', right: '1', bottom: '1', left: '1' },
      hidden: 'true',
    };

    const NewExpectedStyles = {
      ...expectedStyles,
      fontSize: 'x-large',
      display: 'none',
      lineHeight: '130%',
      margin: '1px 1px 1px 1px',
    };

    const props = {
      mode: 'view',
    };

    const styles = getInlineStyles(newData, props);
    expect(styles).toEqual(NewExpectedStyles);
  });

  it('returns the correct styles', () => {
    const newData = {
      ...data,
      fontSize: 'x-large',
      margin: { top: '1', right: '1', bottom: '1', left: '1' },
      hidden: 'true',
    };

    const newExpectedStyles = {
      ...expectedStyles,
      fontSize: 'x-large',
      display: 'none',
      lineHeight: '130%',
      margin: '1px 1px 1px 1px',
    };

    const styles = getInlineStyles(newData);
    expect(styles).toEqual(newExpectedStyles);
  });

  it('returns the correct styles', () => {
    const newData = {
      ...data,
      fontSize: 'medium',
      shadowColor: '',
    };

    const newExpectedStyles = {
      ...expectedStyles,
      fontSize: 'medium',
      lineHeight: undefined,
      boxShadow: '0px 0px 10px rgba(0, 0, 0,  4166.666666666667)',
    };

    const props = {
      mode: 'edit',
    };

    const styles = getInlineStyles(newData, props);
    expect(styles).toEqual(newExpectedStyles);
  });

  it('returns the correct styles with missing properties', () => {
    const newData = {
      ...dataWithLessProperties,
      shadowColor: '',
    };

    const newExpectedStyles = {
      ...expectedStylesWithLessProperties,
      lineHeight: undefined,
    };

    const props = {
      mode: 'edit',
    };

    const styles = getInlineStyles(newData, props);
    expect(styles).toEqual(newExpectedStyles);
  });
});

describe('getStyle', () => {
  it('returns the correct style', () => {
    const style = getStyle('style1');
    expect(style).toEqual({ id: 'style1', cssClass: 'someClass1' });
  });
});

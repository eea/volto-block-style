import { vi } from 'vitest';
import configureStore from 'redux-mock-store';

global.jest = vi;

const mockStore = configureStore();

global.store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
  content: {
    create: {},
    subrequests: [],
  },
  connected_data_parameters: {},
});

const mockSemanticComponents = await vi.importActual('semantic-ui-react');
const mockComponents = await vi.importActual('@plone/volto/components');

vi.doMock('semantic-ui-react', () => ({
  ...mockSemanticComponents,
  Popup: ({ content, trigger }) => {
    return (
      <div className="popup">
        <div className="trigger">{trigger}</div>
        <div className="content">{content}</div>
      </div>
    );
  },
}));

vi.doMock('@plone/volto/components', () => {
  return {
    __esModule: true,
    ...mockComponents,
    SidebarPortal: ({ children }) => <div id="sidebar">{children}</div>,
  };
});

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
);

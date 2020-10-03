import React from 'react';
import { Portal } from 'react-portal';
import themeSVG from '@plone/volto/icons/theme.svg';
import { Icon } from '@plone/volto/components';
import SidebarPopup from '../SidebarPopup/SidebarPopup';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';

import './styles.less';

export default (props) => {
  const { children, selected } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const nodeRef = React.useRef();

  const closeSidebar = React.useCallback(
    (e) => {
      if (isOpen && !doesNodeContainClick(nodeRef.current, e)) setIsOpen(false);
    },
    [isOpen],
  );

  React.useEffect(() => {
    document.addEventListener('click', closeSidebar, false);
    return () => {
      document.removeEventListener('click', closeSidebar);
    };
  }, [closeSidebar]);

  return (
    <>
      {selected ? (
        <>
          <Portal
            node={
              __CLIENT__ &&
              document.querySelector(
                '#sidebar > .sidebar-container > .tabs-wrapper > .formtabs',
              )
            }
          >
            <div id="open-styles-button">
              <button
                compact
                onClick={() => {
                  setIsOpen(true);
                }}
                title="Style palette"
              >
                <Icon name={themeSVG} size="18px" />
              </button>
            </div>
          </Portal>
          <SidebarPopup open={isOpen} ref={nodeRef}>
            <h1> Blabdsadsa</h1>
          </SidebarPopup>
        </>
      ) : (
        ''
      )}
      {children}
    </>
  );
};

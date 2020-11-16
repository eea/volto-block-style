import React from 'react';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const DEFAULT_TIMEOUT = 500;
// TODO: add CSS transition on display

const SidebarPopup = ({ children, open }, ref) => {
  return (
    <CSSTransition
      in={open}
      timeout={DEFAULT_TIMEOUT}
      classNames="sidebar-container"
      unmountOnExit
    >
      <Portal>
        <aside
          role="presentation"
          onClick={(e) => {
            e.stopPropagation();
          }}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          ref={ref}
          key="sidebarpopup"
          className="sidebar-container"
          style={{ overflowY: 'auto' }}
        >
          {children}
        </aside>
      </Portal>
    </CSSTransition>
  );
};

SidebarPopup.propTypes = {
  open: PropTypes.bool,
};

export default React.forwardRef(SidebarPopup);

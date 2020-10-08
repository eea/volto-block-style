import React from 'react';
import { Portal } from 'react-portal';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import { Icon } from '@plone/volto/components';
import themeSVG from '@plone/volto/icons/theme.svg';
import SidebarPopup from '../SidebarPopup/SidebarPopup';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { StyleSchema } from './schema';
import clearSVG from '@plone/volto/icons/clear.svg';

const StyleWrapperEdit = (props) => {
  const { children, selected, onChangeValue, data } = props;
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

  const schema = React.useMemo(() => StyleSchema(), []);

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
            <InlineForm
              schema={schema}
              title={
                <>
                  {schema.title}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    style={{ float: 'right' }}
                  >
                    <Icon name={clearSVG} size="24px" />
                  </button>
                </>
              }
              onChangeField={(id, value) => {
                onChangeValue(id, value);
              }}
              formData={data}
            />
          </SidebarPopup>
        </>
      ) : (
        ''
      )}
      {children}
    </>
  );
};

export default StyleWrapperEdit;

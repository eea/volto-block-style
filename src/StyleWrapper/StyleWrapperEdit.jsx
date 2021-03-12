import React from 'react';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import { Icon } from '@plone/volto/components';
import SidebarPopup from '../SidebarPopup/SidebarPopup';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { StyleSchema } from './schema';
import clearSVG from '@plone/volto/icons/clear.svg';

const StyleWrapperEdit = (props) => {
  const { selected, onChangeValue, data, isVisible, setIsVisible } = props;

  const nodeRef = React.useRef();
  const schema = React.useMemo(() => StyleSchema(), []);

  const closeSidebar = React.useCallback(
    (e) => {
      if (isVisible && !doesNodeContainClick(nodeRef.current, e))
        setIsVisible(false);
    },
    [isVisible, setIsVisible],
  );

  React.useEffect(() => {
    document.addEventListener('click', closeSidebar, false);
    return () => {
      document.removeEventListener('click', closeSidebar);
    };
  }, [closeSidebar]);

  return selected && isVisible ? (
    <SidebarPopup open={isVisible} ref={nodeRef}>
      <InlineForm
        schema={schema}
        title={
          <>
            {schema.title}
            <button
              onClick={() => {
                setIsVisible(false);
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
  ) : (
    ''
  );
};

export default StyleWrapperEdit;

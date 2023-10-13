import React from 'react';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import { Icon, SidebarPopup } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { StyleSchema } from './schema';
import clearSVG from '@plone/volto/icons/clear.svg';
import eraserSVG from '@eeacms/volto-block-style/icons/eraser.svg';

const StyleWrapperEdit = (props) => {
  const {
    block,
    blockData,
    selected,
    onChangeBlock,
    onChangeValue,
    data,
    isVisible,
    setIsVisible,
  } = props;

  const schema = React.useMemo(() => StyleSchema(), []);

  const closeSidebar = React.useCallback(
    (e) => {
      let clickInSidebars = false;
      const sidebars =
        document.querySelectorAll('aside.sidebar-container') || [];
      sidebars.forEach((sidebar) => {
        if (doesNodeContainClick(sidebar, e) && !clickInSidebars) {
          clickInSidebars = true;
        }
      });
      if (isVisible && !clickInSidebars) {
        setIsVisible(false);
      }
    },
    [isVisible, setIsVisible],
  );

  const deleteAllStyle = React.useCallback(() => {
    const newData = {
      ...blockData,
    };
    delete newData.styles;
    onChangeBlock(block, newData);
  }, [block, blockData, onChangeBlock]);

  React.useEffect(() => {
    document.addEventListener('click', closeSidebar, false);
    return () => {
      document.removeEventListener('click', closeSidebar);
    };
  }, [closeSidebar]);

  return selected && isVisible ? (
    <SidebarPopup open={selected && isVisible}>
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
              <Icon name={clearSVG} size="24px" title="Close" />
            </button>
            <button onClick={deleteAllStyle} style={{ float: 'right' }}>
              <Icon name={eraserSVG} size="24px" title="Clear block style" />
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

import React from 'react';
import { StyleWrapperEdit, StyleWrapperView } from '../StyleWrapper';
import { Portal } from 'react-portal';
import themeSVG from '@plone/volto/icons/theme.svg';
import { Icon } from '@plone/volto/components';

// For blocks, store the style data in data.styles, then
// adapt the data.styles.[align,size,...] info to default data.align, data.size, etc.

const BlockStyleWrapperEdit = (props) => {
  const { selected, block, data = {}, onChangeBlock } = props;
  const [isVisible, setIsVisible] = React.useState(false);

  const tabsNode =
    __CLIENT__ &&
    document.querySelector(
      '#sidebar > .sidebar-container > .tabs-wrapper > .formtabs',
    );

  const triggerButton = (
    <Portal node={tabsNode}>
      <div id="open-styles-button">
        <button
          onClick={() => {
            setIsVisible(true);
          }}
          title={`${
            props.type ? 'Style palette for ' + props.type : 'Style pallete'
          }`}
        >
          <Icon name={themeSVG} size="18px" />
        </button>
      </div>
    </Portal>
  );

  return (
    <>
      {selected ? triggerButton : ''}
      <StyleWrapperEdit
        {...props}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        data={{
          ...data?.styles,
          ...(data.align ? { align: data.align } : {}),
          ...(data.size ? { size: data.size } : {}),
        }}
        choices={[]}
        onChangeValue={(id, value) =>
          onChangeBlock(block, {
            ...data,
            ...(id === 'align' ? { align: value } : {}),
            ...(id === 'size' ? { size: value } : {}),
            styles: {
              ...data?.styles,
              [id]: value,
            },
          })
        }
      ></StyleWrapperEdit>
      <StyleWrapperView mode="edit" {...props} styleData={data.styles || {}} />
    </>
  );
};

export default BlockStyleWrapperEdit;

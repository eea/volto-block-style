import React from 'react';
import { StyleWrapperEdit, StyleWrapperView } from '../StyleWrapper';

// For blocks, store the style data in data.styles, then
// adapt the data.styles.[align,size,...] info to default data.align, data.size, etc.

const BlockStyleWrapperEdit = (props) => {
  const { block, data = {}, onChangeBlock } = props;

  return (
    <StyleWrapperEdit
      {...props}
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
    >
      <StyleWrapperView mode="edit" {...props} styleData={data.styles || {}} />
    </StyleWrapperEdit>
  );
};

export default BlockStyleWrapperEdit;

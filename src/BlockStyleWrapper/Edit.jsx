import React from 'react';
import { StyleWrapperEdit, StyleWrapperView } from '../StyleWrapper';

export default (props) => {
  const { block, data, onChangeBlock } = props;
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
      <StyleWrapperView {...props} data={data.styles || {}} />
    </StyleWrapperEdit>
  );
};

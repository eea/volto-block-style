import React from 'react';
import { StyleWrapperEdit, StyleWrapperView } from '../StyleWrapper';

export default (props) => {
  const { block, data, onChangeBlock } = props;
  return (
    <StyleWrapperEdit
      {...props}
      data={data?.styles || {}}
      choices={[]}
      onChangeValue={(id, value) =>
        onChangeBlock(block, {
          ...data,
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

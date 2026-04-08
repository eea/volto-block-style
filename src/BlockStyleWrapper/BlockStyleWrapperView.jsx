import React from 'react';
import { StyleWrapperView } from '@eeacms/volto-block-style/StyleWrapper';

const BlockStyleWrapperView = ({ data, children, ...props }) => (
  <StyleWrapperView {...props} data={data} styleData={data.styles || {}}>
    {children}
  </StyleWrapperView>
);
export default BlockStyleWrapperView;

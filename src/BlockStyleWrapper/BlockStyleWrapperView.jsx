import React from 'react';
import { StyleWrapperView } from '../StyleWrapper';

const BlockStyleWrapperView = ({ data, children, ...props }) => (
  <StyleWrapperView {...props} data={data} styleData={data.styles || {}}>
    {children}
  </StyleWrapperView>
);
export default BlockStyleWrapperView;

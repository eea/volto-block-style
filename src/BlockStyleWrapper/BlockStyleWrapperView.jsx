import React from 'react';
import { StyleWrapperView } from '../StyleWrapper';

const BlockStyleWrapperView = ({ data, children }) => (
  <StyleWrapperView data={data.styles || {}}>{children}</StyleWrapperView>
);
export default BlockStyleWrapperView;

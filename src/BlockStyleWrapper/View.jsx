import React from 'react';
import { StyleWrapperView } from '../StyleWrapper';

export default ({ data, children }) => (
  <StyleWrapperView data={data.styles || {}}>{children}</StyleWrapperView>
);

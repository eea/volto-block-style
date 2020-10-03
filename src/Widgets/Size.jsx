/**
 * AlignWidget component.
 * To benefit from styling integration, use with a field named 'align'
 * @module components/manage/Widgets/AlignWidget
 */

import React from 'react';

import { FormFieldWrapper } from '@plone/volto/components';
import ImageSizeWidget from '@plone/volto/components/manage/Blocks/Image/ImageSizeWidget';

const SizeWidget = (props) => {
  const { id, onChange, value } = props;
  return (
    <FormFieldWrapper {...props}>
      <ImageSizeWidget
        onChangeBlock={(id, { size }) => onChange(id, size)}
        data={{ size: value }}
        block={id}
      />
    </FormFieldWrapper>
  );
};

export default SizeWidget;

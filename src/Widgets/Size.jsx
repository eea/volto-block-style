/**
 * AlignWidget component.
 * To benefit from styling integration, use with a field named 'align'
 * @module components/manage/Widgets/AlignWidget
 */

import React from 'react';

import { FormFieldWrapper } from '@plone/volto/components';
import ImageSizeWidget from '@plone/volto/components/manage/Blocks/Image/ImageSizeWidget';

// TODO: copy the styles from Volto's stylesheet

const SizeWidget = (props) => {
  const { id, onChange, value } = props;
  return (
    <FormFieldWrapper {...props}>
      <div className="align-tools">
        <ImageSizeWidget
          onChangeBlock={(id, { size }) => onChange(id, size)}
          data={{ size: value }}
          block={id}
        />
      </div>
    </FormFieldWrapper>
  );
};

export default SizeWidget;

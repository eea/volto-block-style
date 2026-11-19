/**
 * StretchWidget component.
 * To benefit from styling integration, use with a field named 'Stretch'
 * @module components/manage/Widgets/StretchWidget
 */

import React from 'react';
import { injectIntl } from 'react-intl';

import StretchBlock from '@eeacms/volto-block-style/Blocks/StretchBlock';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';

const StretchWidget = (props) => {
  const { id, onChange, value } = props;

  return (
    <FormFieldWrapper {...props} className="align-widget">
      <div className="align-tools">
        <StretchBlock
          stretch={value}
          onChangeBlock={(block, { stretch }) => onChange(id, stretch)}
          data={{ stretch: value }}
          block={id}
        />
      </div>
    </FormFieldWrapper>
  );
};

export default injectIntl(StretchWidget);

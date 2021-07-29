/**
 * AlignWidget component.
 * To benefit from styling integration, use with a field named 'align'
 * @module components/manage/Widgets/AlignWidget
 */

import React from 'react';

import { FormFieldWrapper, Icon } from '@plone/volto/components';
import ImageSizeWidget from '@plone/volto/components/manage/Blocks/Image/ImageSizeWidget';
import { Button } from 'semantic-ui-react';
import clearSVG from '@plone/volto/icons/clear.svg';

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
        <Button.Group>
          <Button
            icon
            basic
            onClick={() => onChange(id, null)}
            active={value === null}
          >
            <div className="image-sizes-text">
              <Icon name={clearSVG} size="18px" />
            </div>
          </Button>
        </Button.Group>
      </div>
    </FormFieldWrapper>
  );
};

export default SizeWidget;

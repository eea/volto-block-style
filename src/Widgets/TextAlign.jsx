import React from 'react';
import { Button } from 'semantic-ui-react';
import { FormFieldWrapper, Icon } from '@plone/volto/components';

import alignLeftSVG from '@plone/volto/icons/align-left.svg';
import alignRightSVG from '@plone/volto/icons/align-right.svg';
import alignJustifySVG from '@plone/volto/icons/align-justify.svg';
import alignCenterSVG from '@plone/volto/icons/align-center.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

export const TEXT_ALIGN_VALUE_MAP = [
  ['left', alignLeftSVG, 'Left align'],
  ['right', alignRightSVG, 'Right align'],
  ['center', alignCenterSVG, 'Center align'],
  ['justify', alignJustifySVG, 'Justify align'],
  ['', clearSVG, 'Clear selection'],
];

export default (props) => {
  const { value, onChange, id, actions = TEXT_ALIGN_VALUE_MAP } = props;
  return (
    <FormFieldWrapper {...props}>
      <div className="align-tools">
        {actions.map(([name, icon, title], index) => (
          <Button.Group key={`button-group-${name}-${index}`}>
            <Button
              icon
              basic
              compact
              active={value === name}
              aria-label={name}
              onClick={() => {
                onChange(id, name);
              }}
            >
              <Icon name={icon} title={title || name} size="24px" />
            </Button>
          </Button.Group>
        ))}
      </div>
    </FormFieldWrapper>
  );
};

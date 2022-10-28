import React from 'react';
import { Button } from 'semantic-ui-react';
import { FormFieldWrapper, Icon } from '@plone/volto/components';

import alignLeftSVG from '@plone/volto/icons/align-left.svg';
import alignRightSVG from '@plone/volto/icons/align-right.svg';
import alignJustifySVG from '@plone/volto/icons/align-justify.svg';
import alignCenterSVG from '@plone/volto/icons/align-center.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import { defineMessages, useIntl } from 'react-intl';

export const messages = defineMessages({
  left: {
    id: 'Left',
    defaultMessage: 'Left',
  },
  right: {
    id: 'Right',
    defaultMessage: 'Right',
  },
  center: {
    id: 'Center',
    defaultMessage: 'Center',
  },
  justify: {
    id: 'Justify',
    defaultMessage: 'Justify',
  },
  '': {
    id: 'Clear selection',
    defaultMessage: 'Clear selection',
  },
});
const defaultActionsInfo = ({ intl }) => ({
  left: [alignLeftSVG, intl.formatMessage(messages.left)],
  right: [alignRightSVG, intl.formatMessage(messages.right)],
  center: [alignCenterSVG, intl.formatMessage(messages.center)],
  justify: [alignJustifySVG, intl.formatMessage(messages.justify)],
  '': [clearSVG, intl.formatMessage(messages[''])],
});

export default (props) => {
  const intl = useIntl();
  const {
    onChange,
    id,
    actions = ['left', 'right', 'center', 'justify'],
    actionsInfoMap = {},
    value,
  } = props;
  // add clear selection button to the actions mapping if it's not already present
  if (actions[actions.length - 1] !== '') {
    actions.push('');
  }

  const actionsInfo = {
    ...defaultActionsInfo({ intl }),
    ...actionsInfoMap,
  };

  return (
    <FormFieldWrapper {...props}>
      <div className="align-tools">
        {actions.map((action, index) => (
          <Button.Group key={`button-group-${action}-${index}`}>
            <Button
              icon
              basic
              compact
              active={value === action}
              aria-label={actionsInfo[action][1]}
              onClick={() => {
                onChange(id, action);
              }}
            >
              <Icon
                name={actionsInfo[action][0]}
                title={actionsInfo[action][1] || action}
                size="24px"
              />
            </Button>
          </Button.Group>
        ))}
      </div>
    </FormFieldWrapper>
  );
};

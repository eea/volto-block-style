import React from 'react';
import { FormFieldWrapper, Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';
import clearSVG from '@plone/volto/icons/clear.svg';

import loadable from '@loadable/component';
const GithubPicker = loadable(() => import('react-color/lib/Github'));

const SimpleColorPicker = (props) => {
  const { id, value, onChange, available_colors } = props;
  const [showPicker, setShowPicker] = React.useState(false);

  return (
    <FormFieldWrapper
      {...props}
      draggable={false}
      className="simple-color-picker-widget"
    >
      <div className="wrapper">
        <Button.Group>
          <Button
            style={{ backgroundColor: value }}
            onClick={() => setShowPicker(!showPicker)}
            size="huge"
            title="Pick color"
          >
            {''}
          </Button>
          <Button
            compact
            style={{ paddingLeft: '8px', paddingRight: '0px' }}
            onClick={() => {
              setShowPicker(false);
              onChange(id, null);
            }}
          >
            <Icon name={clearSVG} size="18px" color="red" />
          </Button>
        </Button.Group>

        {showPicker ? (
          <GithubPicker
            width="220px"
            className="color-picker"
            colors={available_colors}
            color={value || '#000'}
            onChangeComplete={(value) => {
              setShowPicker(false);
              onChange(id, value.hex);
            }}
          />
        ) : (
          ''
        )}
      </div>
    </FormFieldWrapper>
  );
};

export default SimpleColorPicker;

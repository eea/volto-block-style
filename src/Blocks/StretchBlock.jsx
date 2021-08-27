import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';
import imageFitSVG from '@plone/volto/icons/image-fit.svg';
import imageFullSVG from '@plone/volto/icons/image-full.svg';

const messages = defineMessages({
  fit: {
    id: 'Fit',
    defaultMessage: 'Fit',
  },
  stretch: {
    id: 'Stretch',
    defaultMessage: 'Stretch',
  },
});

const StretchBlock = ({ stretch, onChangeBlock, data, intl, block }) => {
  /**
   * Stretch block handler
   * @method onStretchBlock
   * @param {string} stretch Stretchment option
   * @returns {undefined}
   */
  function onStretchBlock(stretch) {
    onChangeBlock(block, {
      ...data,
      stretch,
    });
  }

  return (
    <div>
      <Button.Group>
        <Button
          icon
          basic
          title={'Default'}
          aria-label={intl.formatMessage(messages.fit)}
          onClick={() => onStretchBlock('fit')}
          active={data.stretch === 'fit' || !data.stretch}
        >
          <Icon name={imageFitSVG} size="24px" />
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          icon
          basic
          title={'Stretch block to the edges'}
          aria-label={intl.formatMessage(messages.stretch)}
          onClick={() => onStretchBlock('stretch')}
          active={data.stretch === 'stretch'}
        >
          <Icon name={imageFullSVG} size="24px" />
        </Button>
      </Button.Group>
    </div>
  );
};

export default injectIntl(StretchBlock);

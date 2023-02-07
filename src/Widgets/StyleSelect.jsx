import React from 'react';
import { Card, Item } from 'semantic-ui-react';
import { FormFieldWrapper } from '@plone/volto/components';
import config from '@plone/volto/registry';
import cx from 'classnames';

const StyleSelectWidget = (props) => {
  const { id, value, onChange } = props;
  const {
    pluggableStyles = [],
    previewText = 'Block content',
  } = config.settings;

  const renderPreview = React.useCallback(
    (style) => {
      const Preview = style.previewComponent || style.component;

      return Preview ? (
        <Preview className={cx(style.cssClass, 'style-preview')}>
          {previewText}
        </Preview>
      ) : (
        <div className={cx(style.cssClass, 'style-preview')}>{previewText}</div>
      );
    },
    [previewText],
  );

  return (
    <>
      {pluggableStyles.length > 0 && (
        <FormFieldWrapper {...props}>
          <Card.Group itemsPerRow={2} className="style-select-widget">
            {pluggableStyles.map((style) => {
              return (
                <Card
                  as="div"
                  name={style.id}
                  onClick={() =>
                    onChange(id, style.id === value ? null : style.id)
                  }
                  key={style.id}
                  className={cx({ active: style.id === value }, 'styleCard')}
                >
                  <Card.Content>
                    <Item.Image>{renderPreview(style)}</Item.Image>
                  </Card.Content>
                  <Card.Content extra>{style.title}</Card.Content>
                </Card>
              );
            })}
          </Card.Group>
        </FormFieldWrapper>
      )}
    </>
  );
};

export default StyleSelectWidget;

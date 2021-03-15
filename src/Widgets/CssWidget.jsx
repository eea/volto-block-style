import React from 'react';
import { TextareaWidget } from '@plone/volto/components';
import { cssParser } from '@eeacms/volto-block-style/helpers';

const CssWidget = (props) => {
  const data = props.value || {};

  return (
    <div className="json-text-widget">
      <TextareaWidget
        id={props.id}
        title={props.title}
        onChange={(field, newData) => {
          props.onChange(field, { ...data, text: newData });
          cssParser(newData)
            .then((result) => {
              props.onChange(field, { text: newData, style: result });
            })
            .catch((result) => {
              props.onChange(field, { text: newData, style: result });
            });
        }}
        value={data.text}
      />
    </div>
  );
};

export default CssWidget;

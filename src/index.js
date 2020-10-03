import React from 'react';
import StyleWrapperEdit from './BlockStyleWrapper/Edit';
import StyleWrapperView from './BlockStyleWrapper/View';
import StyleSelectWidget from './Widgets/StyleSelect';
import AlignWidget from './Widgets/Align';
import SizeWidget from './Widgets/Size';
import SimpleColorPicker from './Widgets/SimpleColorPicker';

import './styles.less';

const applyConfig = (config) => {
  const whitelist = ['maps'];
  const { blocksConfig } = config.blocks;
  Object.keys(blocksConfig)
    .filter((name) => whitelist.includes(name))
    .forEach((name) => {
      const EditComponent = blocksConfig[name].edit;
      const ViewComponent = blocksConfig[name].view;
      blocksConfig[name].edit = (props) => (
        <StyleWrapperEdit {...props}>
          <EditComponent {...props} />
        </StyleWrapperEdit>
      );
      blocksConfig[name].view = (props) => (
        <StyleWrapperView {...props}>
          <ViewComponent {...props} />
        </StyleWrapperView>
      );
    });

  config.widgets.widget.style_select = StyleSelectWidget;
  config.widgets.widget.style_align = AlignWidget; // avoid conflict for now
  config.widgets.widget.style_size = SizeWidget; // avoid conflict for now
  config.widgets.widget.style_simple_color = SimpleColorPicker;

  return config;
};

export default applyConfig;

export const installDemoStyles = (config) => {
  config.settings.pluggableStyles = [
    ...(config.settings.pluggableStyles || []),
    {
      id: 'greenBox',
      title: 'Green box',
      cssClass: 'green-demo-box',
    },
    {
      id: 'blueShade',
      title: 'Blue Shade',
      cssClass: 'blue-demo-box',
      previewComponent: (props) => (
        <div className={`${props.className} preview-blue-demo-box`}>
          {props.children}
        </div>
      ),
      viewComponent: (props) => (
        <div className="blue-demo-box">{props.children}</div>
      ),
      // TODO: support also editComponent ?
    },
  ];

  return config;
};

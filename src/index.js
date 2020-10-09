import React from 'react';
import {
  BlockStyleWrapperEdit,
  BlockStyleWrapperView,
} from './BlockStyleWrapper';
import StyleSelectWidget from './Widgets/StyleSelect';
import AlignWidget from './Widgets/Align';
import TextAlignWidget from './Widgets/TextAlign';
import SizeWidget from './Widgets/Size';
import SimpleColorPicker from './Widgets/SimpleColorPicker';

import './styles.less';

const applyConfig = (config) => {
  const { settings } = config;
  const whitelist = settings.pluggableStylesBlocksWhitelist;
  const blacklist = settings.pluggableStylesBlocksBlacklist;
  const { blocksConfig } = config.blocks;

  const okBlocks = Object.keys(blocksConfig).filter(
    (name) =>
      (blacklist ? !blacklist.includes(name) : true) &&
      (whitelist ? whitelist.includes(name) : true),
  );
  okBlocks.forEach((name) => {
    const EditComponent = blocksConfig[name].edit;
    const ViewComponent = blocksConfig[name].view;
    blocksConfig[name].edit = (props) => (
      <BlockStyleWrapperEdit {...props}>
        <EditComponent {...props} />
      </BlockStyleWrapperEdit>
    );
    blocksConfig[name].edit.displayName = 'EditBlockWithStyleWrapper';

    blocksConfig[name].view = (props) => (
      <BlockStyleWrapperView {...props}>
        <ViewComponent {...props} />
      </BlockStyleWrapperView>
    );
    blocksConfig[name].view.displayName = 'ViewBlockWithStyleWrapper';
  });

  config.widgets.widget.style_select = StyleSelectWidget;
  config.widgets.widget.style_align = AlignWidget; // avoid conflict for now
  config.widgets.widget.style_text_align = TextAlignWidget; // avoid conflict for now
  config.widgets.widget.style_size = SizeWidget; // avoid conflict for now
  config.widgets.widget.style_simple_color = SimpleColorPicker;

  // types of blocks that natively integrate with the volto-block-style and
  // allow passing the style as a prop;
  config.settings.integratesBlockStyles = [
    ...(config.settings.integratesBlockStyles || []),
  ];
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

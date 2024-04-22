import React from 'react';
import {
  BlockStyleWrapperEdit,
  BlockStyleWrapperView,
} from './BlockStyleWrapper';
import StyleSelectWidget from './Widgets/StyleSelect';
import AlignWidget from './Widgets/Align';
import StretchWidget from './Widgets/Stretch';

import TextAlignWidget from './Widgets/TextAlign';
import SliderWidget from './Widgets/Slider';
import SizeWidget from './Widgets/Size';
import SimpleColorPicker from './Widgets/SimpleColorPicker';
import QuadSizeWidget from './Widgets/QuadSize';

import './styles.less';

/**
 * Given a block's config object, it wrapps the view and edit in style wrappers
 */
export const applyStyleWrapperToBlock = (blockConfig) => {
  const BaseEditComponent = blockConfig.edit;
  let EditComponent = BaseEditComponent;
  if (EditComponent && !EditComponent._styleWrapped) {
    EditComponent = (props) => (
      <BlockStyleWrapperEdit {...props}>
        <BaseEditComponent {...props} />
      </BlockStyleWrapperEdit>
    );
    EditComponent.displayName = `<EditBlockWithStyleWrapperFor(${blockConfig.id})>`;
    EditComponent._styleWrapped = true;
  }

  const BaseViewComponent = blockConfig.view;
  let ViewComponent = BaseViewComponent;
  if (ViewComponent && !ViewComponent._styleWrapped) {
    ViewComponent = (props) => (
      <BlockStyleWrapperView {...props}>
        <BaseViewComponent {...props} />
      </BlockStyleWrapperView>
    );
    ViewComponent.displayName = `<ViewBlockWithStyleWrapperFor(${blockConfig.id})>`;
    ViewComponent._styleWrapped = true;
  }
  return {
    ...blockConfig,
    view: ViewComponent,
    edit: EditComponent,
  };
};

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
    blocksConfig[name] = applyStyleWrapperToBlock(blocksConfig[name]);
  });

  config.widgets.widget.style_select = StyleSelectWidget;
  config.widgets.widget.style_align = AlignWidget; // avoid conflict for now
  config.widgets.widget.style_stretch = StretchWidget; // Make stretch widget
  config.widgets.widget.style_text_align = TextAlignWidget; // avoid conflict for now
  config.widgets.widget.style_size = SizeWidget; // avoid conflict for now
  config.widgets.widget.style_simple_color = SimpleColorPicker;
  config.widgets.widget.slider = SliderWidget;
  config.widgets.widget.quad_size = QuadSizeWidget;

  // types of blocks that natively integrate with the volto-block-style and
  // allow passing the style as a prop;
  config.settings.integratesBlockStyles = [
    ...(config.settings.integratesBlockStyles || []),
  ];

  // Restrict block settings to Layout
  if (config.settings.layoutOnlyBlockStyles === undefined) {
    config.settings.layoutOnlyBlockStyles = false;
  }

  config.settings.available_colors = [
    '#bbdbec',
    '#9dc6d4',
    '#5a93aa',
    '#005d7b',
    '#003d53',
    '#ebefc6',
    '#bdd494',
    '#6bb535',
    '#1e8339',
    '#025e37',
    '#464b0b',
    '#b5c234',
    '#777b1a',
    '#f4f1bc',
    '#e1e070',
    '#0070ae',
    '#fce6dc',
    '#f39a86',
    '#e73d5c',
    '#b92f47',
    '#8e1206',
    '#fff6a6',
    '#ffe525',
    '#f7a600',
    '#b94b19',
    '#8d4107',
    '#000000',
    '#6f6f6e',
    '#929291',
    '#bcbcbc',
    '#e3e3e3',
    '#ffffff',
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

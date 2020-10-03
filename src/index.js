import React from 'react';
import StyleWrapperEdit from './BlockStyleWrapper/Edit';
import StyleWrapperView from './BlockStyleWrapper/View';

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
  return config;
};

export default applyConfig;

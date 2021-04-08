import screen from './screen';

export default (config) => {
  config.addonReducers = { ...(config.addonReducers || {}), screen };

  return config;
};

import ScreenSize from './ScreenSize';

export default (config) => {
  config.settings.appExtras = [
    ...(config.settings.appExtras || []),
    {
      match: '/**',
      component: ScreenSize,
    },
  ];

  return config;
};

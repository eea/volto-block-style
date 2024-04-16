const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  viewportWidth: 1280,
  defaultCommandTimeout: 8888,
  chromeWebSecurity: false,
  reporter: 'junit',
  video: false,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  reporterOptions: {
    mochaFile: 'cypress/reports/cypress-[hash].xml',
    jenkinsMode: true,
    toConsole: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // e2e testing node events setup code
      require('@cypress/code-coverage/task')(on, config);

      on('task', {
        getVoltoVersion() {
          const baseProjectRoot = path.resolve(__dirname, '../../../');
          const packageJsonPath = path.join(
            baseProjectRoot,
            'node_modules/@plone/volto/package.json',
          );

          const contents = fs.readFileSync(packageJsonPath, 'utf-8');
          const file = JSON.parse(contents);
          return file.version;
        },
      });

      return config;
    },
    baseUrl: 'http://localhost:3000',
  },
});

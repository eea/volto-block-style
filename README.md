# volto-block-style
[![Releases](https://img.shields.io/github/v/release/eea/volto-block-style)](https://github.com/eea/volto-block-style/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-block-style%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-block-style/job/master/display/redirect)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-block-style%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-block-style/job/develop/display/redirect)

[Volto](https://github.com/plone/volto) add-on

## Features

A generic framework to style blocks and other components.

To configure it, set `settings.pluggableStylesBlocksWhitelist` as a list of
block types that you want to enable. By default it is enabled for all blocks.

#### IMPORTANT! Because of the way it works, you should always load this addon as the last addon in Volto project configuration.

###

![Screenshot](https://github.com/eea/volto-block-style/raw/docs/docs/screenshot.png)

## Getting started

1. Create new volto project if you don't already have one:

   ```
   $ npm install -g yo @plone/generator-volto
   $ yo @plone/volto my-volto-project --addon @eeacms/volto-block-style

   $ cd my-volto-project
   $ yarn add -W @eeacms/volto-block-style
   ```

1. If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-block-style"
   ],

   "dependencies": {
       "@eeacms/volto-block-style": "^1.0.0"
   }
   ```

1. Install new add-ons and restart Volto:

   ```
   $ yarn
   $ yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-block-style/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-block-style/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)

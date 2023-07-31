# volto-block-style

[![Releases](https://img.shields.io/github/v/release/eea/volto-block-style)](https://github.com/eea/volto-block-style/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-block-style%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-block-style/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-block-style-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-block-style-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-block-style-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-block-style-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-block-style-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-block-style-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-block-style-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-block-style-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-block-style%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-block-style/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-block-style-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-block-style-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-block-style-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-block-style-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-block-style-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-block-style-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-block-style-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-block-style-develop)

[Volto](https://github.com/plone/volto) add-on to style blocks and other components

## Features

A generic framework to style blocks and other components.

To configure it, set `settings.pluggableStylesBlocksWhitelist` as a list of
block types that you want to enable. By default it is enabled for all blocks.

#### IMPORTANT! Because of the way it works, you should always load this addon as the last addon in Volto project configuration.

![Screenshot](https://github.com/eea/volto-block-style/raw/docs/docs/screenshot.png)

## Getting started

### Try volto-block-style with Docker

1. Get the latest Docker images

   ```
   docker pull plone
   docker pull plone/volto
   ```

1. Start Plone backend

   ```
   docker run -d --name plone -p 8080:8080 -e SITE=Plone -e PROFILES="profile-plone.restapi:blocks" plone
   ```

1. Start Volto frontend

   ```
   docker run -it --rm -p 3000:3000 --link plone -e ADDONS="@eeacms/volto-block-style" plone/volto
   ```

1. Go to http://localhost:3000

### Add volto-block-style to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

- If you already have a volto project, just update `package.json`:

  ```JSON
  "addons": [
      "@eeacms/volto-block-style"
  ],

  "dependencies": {
      "@eeacms/volto-block-style": "^1.0.0"
  }
  ```

- If not, create one:

  ```
  npm install -g yo @plone/generator-volto
  yo @plone/volto my-volto-project --addon @eeacms/volto-block-style
  cd my-volto-project
  ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-block-style/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-block-style/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-block-style/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)

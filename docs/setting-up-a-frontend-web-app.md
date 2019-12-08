# Setting up a frontend web app

- Author: Kim Jihyeong(KJHRicky@gmail.com)
- Written in Nov 20, 2019

## Overview

This document gives a way to make a frontend web application with Vue. The steps below are exactly same as "inspired_by" blog.

## Create a vue project with vue-cli

> For information on how to use Vue CLI 3, visit [official documentation](https://cli.vuejs.org/guide/)

```bash
vue create inspired_by
```

- What I chose:

```bash
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, PWA, Router, Vuex, CSS Pre-processors, Linter
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS
? Pick a linter / formatter config: Basic
? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)Lint on save
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No
```

## Install vuetify

- They say:

> Vuetify is a Vue UI Library with beautifully handcrafted Material Components. No design skills required — everything you need to create amazing applications is at your fingertips.

```bash
vue add vuetify
```

## Install 'vue-markdown`

> See: [vue-markdown](https://github.com/miaolz123/vue-markdown)

```bash
npm install --save vue-markdown
```

## Install `simplemde-markdown-editor`

> See: [simplemde-markdown-editor](https://github.com/sparksuite/simplemde-markdown-editor)
> See: [vue-simplemde](https://www.npmjs.com/package/vue-simplemde)

```bash
npm install vue-simplemde -- save
npm install --save highlight.js
npm install --save simplemde-theme-base
```

## Apply dark theme

> See: [List of themes](https://github.com/xcatliu/simplemde-theme-base/wiki/List-of-themes)

## Install `vue-custom-scrollbar`

```bash
npm install vue-custom-scrollbar --save
```

## Syncing with github

> See: [forming calls for graphQL](https://developer.github.com/v4/guides/forming-calls/)

### Install `axios`

```bash
npm install axios --save
```

### Use `apollo`

> See: [how to use the github graphql api in vue js with apollo](https://medium.com/@anoob.bava/how-to-use-the-github-graphql-api-in-vue-js-with-vue-apollo-24304b6731cf)

```bash
vue add apollo
```

<!--
### install `eslint-plugin-graphql` and `typescript`

```bash
npm install eslint-plugin-graphql --save
npm install typescript --save
``` -->

### Warning

- when adding `app/.env` file for adding github auth token value, don't forget to add `app/.env` to `.gitignore`.

## run vue app

```bash
npm run serve
```

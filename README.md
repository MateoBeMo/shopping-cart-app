This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and has some extra libraries and file structure that we consider good to start a React project.

Original Create React App README available [here](./README_CRA.md)

## Local development

### Requirements

-   node 12.xx.x
-   npm 6.x.x
-   `npm i -g cross-env`

## How to run the API server locally
1. Install `json-server` globally: `npm i -g json-server`
2. Go to the server-api directory and run the `npm start` script, this will raise a [full fake REST API](https://www.npmjs.com/package/json-server) on port 3000.

## Available scripts

In the project directory, you can run (among others):

-   `start` - runs the app in the development mode. Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

-   `test` - launches the test runner in the interactive watch mode.

-   `build` - builds the app for production to the `build` folder.

-   `eject` - exposes content of `react-script` package.

-   `lint` - lints project files according to eslint rules. Typical use case: continuous integration environments, Travis, CircleCI, etc.

-   `lint:fix` - same as `lint`, but also fixes errors, when possible. Typical use case: local development environment, git hooks.

-   `prettier:check` - shows formatting errors.

-   `prettify` - fixes formatting errors, when possible.


## [Eslint](https://eslint.org/docs/user-guide/configuring) and [Prettier](https://prettier.io/docs/en/configuration.html) configurations

The project extends CRA ESLint rules with a custom set, tailored for the reasonable and clean development process. I added `prettier` to force consistent formatting. The rules can be modified in the corresponding file.

## File organization

```
src
├─── assets
├─── components
|    ├─── Button
|    ├─── Cart
|    ├─── ProductCard
│    └─── Switcher
├─── Layout
|    ├─── components/Footer
│    └─── components/Header
├─── models
├─── pages
|    ├─── CartPage
│    └─── HomePage
├─── routes
├─── services
├─── store
├─── styles
├─── translations
└─── utils
```

-   **assets**: All static files I need to run the project such as images, icons or SVGs.
-   **components**: Here I place all the reusable and indivisible React components used anywhere in the application. Such as buttons, inputs, dropdowns, etc.
-   **Layout**: Here I place the common layout used in the application. This module consists of the header and the footer.
-   **models**: Here I place the global models of the application.
-   **pages**: Here I place all the pages of the application.
-   **routes**: React routing config is placed here.
-   **services**: This module contains the global API calls I make in the application.
-   **store**: This is where I place the global store config.
-   **styles**: All the common and main SASS files are here.
-   **utils**: The global functions or constants that can be useful for the application are placed here.

## Styling

I use saas files for styling. The common and main saas files are placed in the styles folder.

-   **base**: For defaults (html, body, etc) and resets.
-   **settings**: Here I place the variables. Font, colors definitions, etc.
-   **themes**: Color schemes, typography, etc.
-   **utils**: Mixins and functions.
-   **app-styles.scss**: The main file. The other files, related to the styles, are imported here.
-   **style-utils.scss**: This file is to import inside any Component or Module .scss if you need it.




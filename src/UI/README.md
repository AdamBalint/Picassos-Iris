# UI for Picasso's Iris

This directory contains the src files Picasso's Iris UI.

## Table of contents

- [How it works](#how-it-works)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Technologies used](#technologies-used)
- [Development](#development)
  - [File structure](#file-structure)
  - [Setting up a local environment from fresh](#setting-up-a-local-environment-for-ui-development-from-fresh)
- [Testing](#testing)
- [Deployment](#deployment)

## How it works

<p align="center">
  <img alt="Big picture diagram of Iris GUI" src="http://i.imgur.com/BZ8HA8Q.png" />
  <b><i>Big picture overview of Iris GUI</i></b>
</p>

The UI primarily has 2 levels, **the backend** and **the frontend**.

### Backend
- Initially starts the server, and opens the WebView window
- Initially renders the page, `index.html`
- Contains various routes for handling different actions to communicate back to the frontend when requested

### Frontend
- Represents GUI app to be presented to the user.
- Built with HTML, CSS and JavaScript (Single-Page-Application)
- Communicates via HTTP (AJAX) requests to the backend server
- In terms of how the application is bundled and loaded:
    1. Webpack bundles all the assets (The React components, the images into a single `bundle.js` file, and the stylesheets (.css, .scss) into a single `style.css`)
    2. When the `index.html` is loaded, it loads the `bundle.js` file which then loads the app.

## Technologies used

We use a variety of open-source technologies, **all credits and thanks to original creators**.

- Backend
  - [Flask for Python HTTP server](http://flask.pocoo.org/)
  - [PyWebView for a lightweight WebView library for Linux, Mac, Windows](https://github.com/r0x0r/pywebview/)
    - **Important**, we use a fork (file-filter branch) of the PyWebView library to suit our needs, it can be found [here](https://github.com/fzxt/pywebview/tree/file-filter)

- Frontend
  - [NodeJS & NPM (Node package manager) for dependency management](https://www.npmjs.com/)
  - [React as a frontend library to build an SPA](https://facebook.github.io/react/)
  - [Webpack 2 for bundling app/modules](https://webpack.github.io/)
  - [SCSS/Sass, for CSS with superpowers](http://sass-lang.com/)
  - [Single-element CSS loaders](https://github.com/lukehaas/css-loaders)

- Deployment
  - [py2app for deployment on OSX](https://pythonhosted.org/py2app/)
  - [py2exe for deployment on Windows](http://www.py2exe.org/)


## Development

### File structure

```
.
├── backend
│   ├── app.py -- Application stub
│   ├── main.py -- Entry point of application
│   ├── server.py -- Responsible for starting and handling calls to Flask server
│   └── webview -- Customized fork of pywebview
├── frontend
│   ├── __tests__ -- Contains tests for the frontend
│   │   ├── app -- Tests for the application(root) component as a whole
│   │   ├── components -- Tests for individual components (filepicker, nav, etc)
│   │   └── reducers -- Tests for Redux reducers
│   ├── app
│   │   ├── actions -- Contains actions for individual components
│   │   ├── components -- React components
│   │   ├── index.js -- Entry point for webpack, frontend
│   │   ├── models -- Contains classes for models
│   │   ├── reducers -- Redux reducers
│   │   ├── routes.js -- Routes
│   │   └── util -- Utility module
│   ├── assets
│   │   ├── fonts -- Static fonts
│   │   ├── img -- Static images
│   │   └── vendor -- Static JS/CSS files
│   ├── global_styles -- Styles globally used throughout the app (base buttons, sass variables)
│   │   ├── global.scss
│   │   └── variables.scss
│   ├── index.html -- Page intiially served to the webview
│   ├── package.json -- Node package manager file
│   ├── postcss.config.js -- Config for postcss loader
│   ├── testFileTransformer.js -- File transformer for the testing environment
│   └── webpack.config.js -- Config for webpack, for producing bundles
├── icon.icns -- Icon for macOS
├── icon.ico -- Icon for Windows
├── py2app_setup.py -- Setup file for py2app (macOS)
└── py2exe_setup.py -- Setup file for py2exe (Windows)
```


### Requirements

- Node.js V6.0+ (Developed on Node 6.8.0)
- Python 3.5


### NPM build, development, testing scripts

`npm run build` -- For simply bundling with Webpack, generates a bundle.js and style.css in the frontend/dist folder.

`npm run build:watch` -- Tells webpack to watch for changes, any code changes in the frontend directory will cause Webpack to generate a dist folder.

`npm run test` -- Will run the tests.

`npm run test:watch` -- Will run tests in watch mode. That is, tests will run when file changes occur. Great for TDD.

You can find all scripts mentioned in the `package.json` file.

### Setting up a local environment for UI development from fresh

In a terminal window, fire the following commands

```sh
git clone https://github.com/Adam-Balint/Picassos-Iris
cd Picassos-Iris/
pip3 install -r requirements.txt
cd src/UI/frontend
npm install
npm run build:watch
```

Webpack will now watch the frontend directory for any changes during development
and generate the bundled application in `frontend/dist`.

**You'll want to leave this window open, as you are developing**

In a seperate terminal window.

```
cd Picassos-Iris/src/UI/backend
python3 main.py
```

You should see a WebView window pop up.

To quit the python process, simply close the WebView window.

#### Tips!
For debugging and general development of the GUI, we don't recommend you play around with the actual WebView window when developing.

Instead, start up the server, your favorite browser and navigate to [http://127.0.0.1:23948](http://127.0.0.1:23948) and develop/see changes from there.

## Testing
For testing on the frontend, we use [Jest](https://facebook.github.io/jest/) as a test runner and [Enzyme](https://github.com/airbnb/enzyme) to deal with React components.

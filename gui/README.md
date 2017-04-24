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
    - **Important**, we use a slightly modified fork (file-filter branch) of the PyWebView library to suit our needs, it can be found [here](https://github.com/fzxt/pywebview/tree/file-filter)

- Frontend
  - [NodeJS & NPM (Node package manager) for dependency management](https://www.npmjs.com/)
  - [React as a frontend library to build an SPA](https://facebook.github.io/react/)
  - [Webpack 2 for bundling app/modules](https://webpack.github.io/)
  - [SCSS/Sass, for CSS with superpowers](http://sass-lang.com/)
  - [Single-element CSS loaders](https://github.com/lukehaas/css-loaders)

- Deployment
  - [pyinstaller](https://github.com/pyinstaller/pyinstaller/)

## Development

### File structure

```
.
├── README.md
├── config
│   └── styles.json -- File which is used to read in styles. Modify this file to add in styles.
├── dist
├── gui -- GUI frontend code
│   ├── __tests__ -- Unit tests for UI
│   │   ├── components -- Unit tests for Components
│   │   └── reducers -- Unit tests for Redux reducers
│   ├── app
│   │   ├── actions -- Redux actions
│   │   ├── components -- React components
│   │   ├── index.js -- Entry point for bundling with webpack
│   │   ├── models -- Model classes
│   │   ├── reducers -- Redux reducers
│   │   ├── routes.js -- Routes defined in the UI
│   │   └── util -- Utility functions
│   ├── assets
│   ├── dist -- Folder which contains bundled js and css
│   ├── global_styles
│   ├── index.html -- Entry point for the GUI, loads dist/style.css and dist/bundle.js
│   ├── package.json -- Dependencies
│   ├── postcss.config.js
│   ├── testFileTransformer.js
│   └── webpack.config.js
├── src
│   ├── backend
│   │   ├── models
│   │   ├── server.py -- Flask server code
│   │   ├── stylize
│   │   │   ├── AI -- Directory for AI related code, written in tensorflow
│   │   └── util.py
│   └── main.py -- Entry point for starting the application (webview)
├── styles
└── stylize
    └── checkpoints -- Trained checkpoint values for styles
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
pip install -r requirements.txt
pip install -r requirements.[osx|windows].txt
cd gui
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

For running the tests, you can go ahead and run either `npm run test` or `npm run test:watch`

## Deployment

To deploy (or bundle an application), you will need `pyinstaller` from the dev branch.

To install:

```sh
$ pip install git+https://github.com/pyinstaller/pyinstaller.git
```

Then, after building the application, you may run the following commands depending on the OS to bundle the app.

(We don't use `--onefile` mode for bundling the application on Windows)

When it's done bundling, check the `dist` folder.

### Windows
```sh
$ pyinstaller src/backend/main.py --add-data gui;gui --add-data styles;styles --add-data stylize;stylize --add-data config;config --windowed
```

### macOS
```sh
$ pyinstaller src/backend/main.py --add-data gui:gui --add-data styles:styles --add-data stylize:stylize --add-data config:config --windowed --onefile
```

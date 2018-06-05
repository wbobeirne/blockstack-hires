# HiRes Resumes with Blockstack

This is a quick demo application using Blockstack to authenticate and store data
without a server.

## Running The App

First install all dependencies

```
# npm
npm install

# yarn
yarn
```

You can then either run it in dev mode

```
npm run start
```

Or build a production version which is meant to be run through a web server

```
npm run build
```

## Folder Structure

```
.
├── src                # Source code
│   ├── App.tsx        ### Root component & routing
│   ├── assets         ### Assets (images, fonts, etc.)
│   ├── components     ### Reusable components
│   ├── ducks          ### Redux files following the ducks pattern
│   ├── index.html     ### HTML template
│   ├── index.tsx      ### Entry point
│   ├── libs           ### Common use libraries
│   ├── pages          ### Components that encompass a single page
│   ├── sass           ### Reusable SASS variables and mixins
│   ├── utils          ### Simple utilities
│   └── typescript     ### TypeScript type definition files
├── dist               # Webpack output files
├── static             # Static assets to be copied to dist
├── tsconfig.json      # TypeScript config
└── webpack.config.js  # Webpack config
```

## Known Issues

* A username is required to share your resume. Ideally this could be handled better.
* npm is currently complaining about critical vulnerabilities from css loader, which the maintainer is currently working on removing the vulnerable dependency that reads MAC address seeded randomness.


## Potential Future Features

* Improved input validation (Most inputs are just raw text)
* Improved print styles / save to PDF instead
* More descriptive error states / messages
* Multiple resume templates

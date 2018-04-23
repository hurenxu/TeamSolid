# Setting Up ESDoc 

This description will assist developers in setting up ESDoc. We will be using ESDoc in this project for documentation 
purposes. 

ESDoc is a good documentation generator for Javascript.

ESDoc Website: `https://esdoc.org/`

## Installing ESDoc

First move into the working directory , run `cd TeamSolid`

### ESDoc Standard Plugin 

Next to install the ESDoc and the standard plugin, run `npm install esdoc esdoc-standard-plugin`

### ESDoc ECMAScript Proposal Plugin

Next to install the ECMAScript Proposal Plugin run `npm install esdoc-ecmascript-proposal-plugin`

### ESDoc JSX Plugin

Next to install the ESDoc JSX Plugin , run `npm install esdoc-jsx-plugin`

### ESDoc React Plugin 

Next to install the ESDoc React Plugin, run `npm install esdoc-react-plugin`

## Configuring ESDoc 

To proceed setting up ESDoc , you will need to create a configuration file name " .esdoc.json ". Running the command 
below will automatically create the file with specified attributes. 

To create the configuration file run : 

```
echo '{
 "source": "./client",
 "destination": "./doc/esdoc",
 "plugins": [
   {
     "name": "esdoc-ecmascript-proposal-plugin",
     "option": {
       "classProperties": true,
       "objectRestSpread": true,
       "doExpressions": true,
       "functionBind": true,
       "functionSent": true,
       "asyncGenerators": true,
       "decorators": true,
       "exportExtensions": true,
       "dynamicImport": true
     }
   },
   {"name": "esdoc-standard-plugin"},
   {"name": "esdoc-react-plugin"},
   {"name": "esdoc-jsx-plugin", "option": {"enable": true}}
 ]
}' > .esdoc.json 
```

## Running ESDoc 

To run ESDoc , run `./node_modules/.bin/esdoc`

## Generate Documentation 

To open up the generated documentation , run `open ./doc/esdoc/index.html`
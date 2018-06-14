# Quick Setup Scripts

The shell scripts I have written 'setup_environment.sh' and 'generate_docs.sh' can be run to install npm dependencies,
install the ESDoc plugins to parse javascript code, and generate the ESDoc documentation.

## Running Shell Scripts

First run , `./setup_enviroment.sh` to install npm dependencies and install ESDoc plugins.

Second run, `./generate_docs.sh` to generate ESDoc HTML documentation and open it in your browser.

### Setup Environment Script 

The 'setup_environment.sh' script consists of : 

```
#!/bin/bash

#install the dependencies
sudo npm install

#install all esdoc plugins
sudo npm install esdoc-ecmascript-proposal-plugin

sudo npm install esdoc-react-plugin

sudo npm install esdoc-jsx-plugin
```

### Generate Documentation Script

The 'generate_docs.sh' script consists of : 

```
#!/bin/bash

#run ESDOC 
./node_modules/.bin/esdoc

#open HTML generated documentation 
open ./doc/esdoc/index.html
```




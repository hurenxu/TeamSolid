# Environment Set Up 
This brief description will assist developers in setting up the environment.

All the instructions are tested in Ubuntu 16.04

Ubuntu: `https://www.ubuntu.com/download/desktop`

## 1. Getting source files from GitHub
Github: `https://github.com/hurenxu/TeamSolid`

If you haven't installed git yet, run `sudo apt-get install git`

Run `git clone https://github.com/hurenxu/TeamSolid.git` and it will create the folder containing all the source codes.

## 2. Installing Node.js
Official website: https://nodejs.org/en/download/package-manager/

Install curl by running `sudo apt-get install curl`

Run `curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash - `

To install Node.js and npm, run `sudo apt-get install -y nodejs`  

## 3. Installing Dependencies
Go to the folder that contains all the source code.
Run `sudo npm install` to install all the dependencies needed for developing.

## 4. Setting up precommit check
1. link the scrips to the git hooks scripts by running `./scripts/install-hooks.bash` if you are not able to execute the script, please do `chmod +x ./scripts/install-hooks.bash` first.
2. Use git as normal, but it will force to check the style before committing. The updates will not be commmitted if the tests are not passed

## 5. Running Eslint style check
Eslint is installed automatically when you run `npm install`. Although the precommit check will force to run Eslint, it's better to keep track of your code at all times. There are two ways to run Eslint:

1. Run `npm run lint` will run eslint only once and show the result
2. Run `npm run lint-watch` will keep monitoring the code and show the result everytime you modify and save the code.

## 6. Compiling and Running the Website!
Run `npm start` to start the local server. It should show a message like `running at localhost:8000`. Then open a browser and enter `localhost:8000` to visit the website

## 7. Setting Up MongoDB
We will use MongoDB as the database so you should have it locally for testing purpose.

### 7.1 Installing MongoDB
Offical Website: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

1. Import public key used by package management system `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5`
2. Create a list file for MongoDB in Ubuntu 16.04 `echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list`
3. Reload local package database `sudo apt-get update`
4. Install MongoDB package `sudo apt-get install -y mongodb-org`

### 7.2 Utilizing MongoDB
Official Website: `http://mongodb.github.io/node-mongodb-native/3.0/quick-start/quick-start/`

1. Start MongoDB server `sudo service mongod start`. The server will store data files in /var/lib/mongodb and its log files in /var/log/mongodb
2. Stop server `sudo service mongod stop`

### 7.3 Visualizing MongoDB
It's more clear to use the database visually, so we also have this tutorial to visualize it.

1. Download the lateset version of MongoDB Compass from the official website `https://www.mongodb.com/download-center?jmp=nav#compass`. Choose your OS and complete a short survey to download it.

2. Install MongoDB Compass by going to the download folder and running `sudo apt install ./mongodb-compass_1.12.7_amd64.deb`. Note that version might vary, and you should use the filename that you have.

3. Start MongoDB Compass by running `mongodb-compass`. You might prefer to lock it to launcher for quick access.

4. Connect to host. The default setting (port 27017) should work at this stage, but you should change port after you change the configuration of the server.

## 8. turn on/down server
1. Turn on: `sudo systemctl restart nginx`
2. Turn down: `sudo systemctl stop nginx`


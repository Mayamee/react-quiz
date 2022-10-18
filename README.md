# Quiz App

## Menu
- [Quiz App](#quiz-app)
	- [Menu](#menu)
		- [Installation](#installation)
		- [Development](#development)
		- [Production](#production)
			- [Build code](#build-code)
			- [Docker](#docker)
			- [Docker compose](#docker-compose)


### Installation
Install dependencies
```sh
yarn install
```

### Development
Frontend
```sh
yarn dev
```

SSR server
```sh
yarn dev:server
```

This project includes prettier

You can run command below for beautify your code
```sh
yarn prettify
```

### Production

#### Build code

Build code and move necessary files
```sh
yarn build
```
#### Docker
Build image
```sh
yarn docker:build
```
#### Docker compose

First build the project
```sh
yarn build
```
Then run [docker-compose](https://docs.docker.com/compose)
```sh
docker-compose up -d
```
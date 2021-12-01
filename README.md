# React.js Challenge
## Description
### Frontend
For the frontend I chose a minimal create-react-app project and used the recommended ReactFlow and TailwindCSS.

### Backend
The backend is based on [AdonisJS](https://adonisjs.com/). I chose it for simplicity to set up, the api version being relatively lightweight and
the first level database support.

The api has been kept very simple and has very small modifications to the standard installation, for
example enabled CORS.
All backend code files written by me are in the `api/app/Controllers` and `api/app/Models` folders.
I would have liked to flesh out the api with an own save state per user that would be identified via their key
in the localstorage, but I did not have time to do so in the recommended time frame.

### General
The challenge has been developed focusing on the main development process. Things like for example heavy and critical
security risks in the currently used npm packages would be handled in a real environment. 

## Installation
### Frontend Dependencies
```shell
# Use lock file
npm ci

#OR: 

# Fresh install 
npm install
```
### Backend Dependencies

In the `api/.env` file settings for a database can be made. 
AdonisJS supports following databases: https://docs.adonisjs.com/guides/database/introduction#drivers-config

For easiest use set the `DB_CONNECTION` to `sqlite`, which does not
require an external database.

```shell
# NPM dependencies
npm install

# Setup database
node ace migration:run
```

## Starting the application
### Start frontend
```shell
npm run start
```

### Start backend
```shell
# Serve the api
node ace serve
```

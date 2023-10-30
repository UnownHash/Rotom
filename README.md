# Rotom (MITM Connector)

A connector to connect MITM and other applications (eg a scanner).

## Config

Default configuration accepts inbound connections from devices on port 7070 and accepts 
inbound connections from raw processors on port 7071 and marries the two.

There is a file `config/default.json` - copy this to `config/local.json` to override these
port settings

## Starting

First, install the dependencies:
```shell
npm install
```
Then build the application:
```shell
npm run build
```
And then you can run the app:
```shell
npm run start
```

## PM2

First, install the dependencies:
```shell
npm install
```
Then build the application:
```shell
npm run build
```
And then start application in PM2
```shell
pm2 start dist/packages/server/main.js --name rotom
```

## Updating

When pulling an update, if you see a change on the `package-lock.json` file, then you can run:
```shell
npm install
```
Rebuild the app:
```shell
npm run build
```
Then you can restart the app.

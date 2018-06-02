# Overview

At this point we have a working react-native application with almost zero functionality.

## Scripts

* Run ios:
  * `yarn ios`
* Run android:
  * Create an Android virtual device (AVD)
  * Or Plug in an android device
  * Once emulator or device is ready:
    * `yarn android`
* Run Unit Tests:
   * `yarn test`
* Start Packager:
  * This command is used to inject our transpiled javascript into the phone/emulator's installed application
  * **NOTE**: `yarn ios` and `yarn android` start this for you.
    * `yarn start`

## Steps
The steps taken up to this point have been:

1. Initialize new react-native application using:
    1. `create-react-native-app {app-name}`
1. Ejected from create-react-native-app using:
    1. `yarn eject`
1. Deleted app.json
    1. This file isn't needed since we aren't using expo.
1. Installed node as a dependency
    1. `yarn add node@9.11.0`
        1. react-native is incompatible with node version 10 (Latest) if we install node as a dependency we can get around this without using nvm or some other solution.
    1. Updated [.gitignore](./.gitignore) to ignore ios and android output
    
# What is here?

## [App.js](./App.js)

This the main component for our application. Currently this component just displays some text. 

If you are used to seeing React components this should look very familiar.

## [App.test.js](./App.test.js)

This contains a very simple test for our first component.

## [index.js](./index.js)

This is the entry point to our application. If you are used to webpack configurations think of this as the entry point of your bundle.

## [package.json](./package.json)

This is a normal package.json. This is also used to configure [jest](https://facebook.github.io/jest/) (our unit testing framework). 

If you are used to jest take note of the preset of jest.

```json
{
  ...
  "jest": {
    "preset": "react-native"
  },
  ...
}
```

## .babelrc

This is a normal babel configuration file. Yes, when using react-native we still need to use babel.

### Why do we need to use [babel](https://babeljs.io/)?

To understand this we need to understand how react-native works a little deeper. 

#### How does react-native work?

The short version of this is that when running your application on a phone the javascript portion of your app runs on the
javascript engine on your phone. On Android the javascript engine is V8. On iOS the javascript engine is WebKit. 

I thought react-native could render native components? This is true. However, the native components have to be created using
native code. To achieve this feat react-native communicates to the native platform by sending/receiving messages between a native platform
process and the javascript engine. This is how react-native is able to render native components using javascript.

#### What does that have to do with babel?

This also means that the only javascript that can run on the phone is javascript compatible with Android's V8 **and** iOS's WebKit. 
Babel to the rescue. Babel is the library that allows us to write javascript in ES2015+ and transpile it to ES5, which is the version 
of javascript that can be understood by both javascript engines. 

## ios App

In the [ios](./ios) directory is the native iOS code. This includes a full XCode project.

## android App

In the [android](./android) directory is the native Android code. This includes a full 
gradle project.

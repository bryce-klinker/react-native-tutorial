# Overview 

At this point we have a react-native application with no real functionality. Let's go ahead and add some functionality.

# Application

The application we are going to be building is an application that will show various information about football (soccer) players, clubs, and competitions.

## First User Story

As an Arsenal fan
I want to view Arsenal's position in the Premier League
So that I know if they will reach the champions league next year

### Getting started

For this story we can plan to simply show a small league table when the app starts. 

We don't plan to add any interaction logic or anything of that kind. We will just show a league table from an api that could be
built at a later date. 

**NOTE**: We will use a mock api instead of a real rest api. This will allow us some nice flexibility throughout the tutorial.

#### Writing our first unit test

I prefer to use enzyme to test react components as I find the api for enzyme to be more natural than the one provided with react-test-renderer. Let's go ahead and add enzyme to our packages:

```bash
# Open a terminal and execute:
yarn add enzyme enzyme-adapter-react-16 react-dom --dev --exact # installs enzyme, adapter and react-dom. Saving as dev dependencies with exact version numbers
```

Now we need to update our [package.json](./package.json) with configuration for jest.

```json
{
  ...
  "jest": {
    "preset": "react-native",
    "setupTestFrameworkScriptFile": "<rootDir>/testing/setup.js"
  }
  ...
}
``` 

Inside the [testing/setup.js](./testing/setup.js) file we can add the following lines:

```javascript
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
```



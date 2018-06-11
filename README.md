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

#### Setting up our unit testing framework

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
Okay now our framework is all setup and we can begin writing tests against our application. 

#### Writing our first test

My preference is to have a [src](./src) directory for all source code. Let's move our [App.js](src/App.js) and [App.spec.js](src/App.spec.js) to our [src](./src) directory.

I also prefer the convention of .spec.js files to .test.js. So I'm going to rename App.spec.js to App.spec.js

Now let's make our [App.spec.js](./src/App.spec.js) actually test something of value.

```javascript
// App.spec.js
import React from 'react';
import { FlatList } from 'react-native';
import App from './App';
import { shallow } from 'enzyme';

it('shows list of clubs', () => {
  const clubs = [{}, {}, {}];
  const app = shallow(<App clubs={clubs}/>); // Shallow render the component using enzyme
  expect(app.find(FlatList).props().data.length).toBe(3); // We expect to see 3 clubs in a flat list
});
```
This gives us our first failing test:

```
shows list of clubs

    Method “props” is only meant to be run on a single node. 0 found instead.

       7 |   const clubs = [{}, {}, {}];
       8 |   const app = shallow(<App clubs={clubs} />);
    >  9 |   expect(app.find(FlatList).props().data.length).toBe(3);
         |                             ^
      10 | });
      11 | 
```

To pass this test I believe we can change the following:

```javascript

```

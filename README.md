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
// ./src/App.spec.js
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
// ./src/App.js
import React from 'react';
import { FlatList } from 'react-native';

const App = ({ clubs }) => {
  return <FlatList data={clubs}/>
};

export default App;
```

#### Loading clubs from a rest api

We can now start adding tests that expect our list of clubs to be loaded from a rest api. Let's start with a test that expects this.

To start with I want to pull in one more package to aid with mocking fetch: 

```bash
yarn add jest-fetch-mock --dev --exact
```

To use the mock fetch we need to update our [testing/setup.js](./testing/setup.js) file with the following:

```javascript
...
global.fetch = require('jest-fetch-mock');
```

No we can update our test to have the following:

```javascript
// ./src/App.spec.js
...
beforeEach(() => {
  jest.useFakeTimers(); // Allows us to use jest.runAllTicks();
});
...
it('shows list of clubs', () => {
  const clubs = [{}, {}, {}];
  fetch.mockResponse(JSON.stringify(clubs));

  const app = shallow(<App />);
  expect(app.find(FlatList).props().data.length).toBe(0);

  jest.runAllTicks(); // This runs all outstanding promises such as our fetch.
  app.update();

  expect(app.find(FlatList).props().data.length).toBe(3);
});
```

This gives us the failure of:

```
shows list of clubs

    TypeError: Cannot read property 'length' of undefined

       9 | 
      10 |   const app = shallow(<App />);
    > 11 |   expect(app.find(FlatList).props().data.length).toBe(0);
         |          ^
      12 | 
      13 |   jest.runAllTicks();
      14 |   app.update();
```

Now we need to add the following to our component:

```javascript
// ./src/App.js
import React, { Component } from 'react';
import { FlatList } from 'react-native';

export default class App extends Component {
  state = {
    clubs: []
  };

  async componentDidMount() {
    const response = await fetch(''); // Our test doesn't yet expect a url to be used hence we leave that out.
    const clubs = await response.json();
    this.setState({ clubs });
  }

  render() {
    const { clubs } = this.state;
    return <FlatList data={clubs}/>
  }
}
```

Now we have a passing test. However, we should update our test to make sure we use the correct url:

```javascript
// ./src/App.spec.js
it('shows list of clubs', () => {
  ...
  expect(fetch).toHaveBeenCalledWith('http://somewhere.com/api/clubs');
});
```

This causes our test to fail:

```
Expected mock function to have been called with:
      "http://somewhere.com/api/clubs"
    as argument 1, but it was called with
      "".

      19 | 
      20 |   expect(app.find(FlatList).props().data.length).toBe(3);
    > 21 |   expect(fetch).toHaveBeenCalledWith('http://somewhere.com/api/clubs');
         |                 ^
      22 | });
```

To pass our test we need to use the url given from the test:

```javascript
// ./src/App.js
export default class App extends Component {
  ...
  async componentDidMount() {
    const response = await fetch('http://somewhere.com/api/clubs');
    const clubs = await response.json();
    this.setState({ clubs });
  }
  ...
}
```
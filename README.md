### Remine Front End Interview Test

#### Environment

You may use whatever coding environment you would like, though, we will be testing your code with the following:

- Node version 8+ 
- Chrome browser version 60+

#### To Do

1. Obtain the list of locations and building type categories from [front-end-interview-test-api](https://github.com/remineapp/front-end-interview-test-api) using the included `API.js` in **_this_** project
2. Populate the `RemineTable` component inside of `CHANGEME.js` with the locations obtained from step 1.
3. Build out the `CHANGEME.js` view to allow a user to filter the `RemineTable` contents based on whether the location has:
    * a number of beds in a user specified **range**
    * a number of baths in a user specified **range**
    * the same building type as the one specified by the user (the user can select from a list of building types that come from the API)

    If a user has not specified a bound in a range or a type for the building type, default to show all. If no filters are active or being applied, all locations should be shown in the `RemineTable`. 

#### Grading

**THIS SHOULD BE PRODUCTION LEVEL CODE** 

We will critique on UX and code quality, but not design. Testing your code is not required.

Good luck.

![](https://media.giphy.com/media/26DOs997h6fgsCthu/giphy.gif)

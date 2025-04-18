# react-xapi-wrapper
`react-xapi-wrapper` is a library for automating the process of creating and sending xAPI statements within React environments.

## Table of Contents
1. [General Information](#general-information)
2. [Contents](#contents)
3. [Setup](#setup)
4. [Development](#development)

## General Information
Based on the [xAPI.js](https://github.com/xapijs/xapi) library, `react-xapi-wrapper` simplifies xAPI integration in React applications by overwriting event handlers to automatically collect xAPI statements. Its usage within an adaptive learning system for software engineering can be seen in [HASKI-Frontend](https://github.com/HASKI-RAK/HASKI-Frontend). A paper describing this approach is also published on [ACM](not yet available).

## Contents
To generate and dispatch xAPI statements, the library provides the following four main components and functions:
    - `setupXAPI()`: Function used to create an xAPI object containing the information required to create and send xAPI statements.
    - `UserInteractionTracker`: A component that tracks user interactions such as mouse movement and keystrokes. 
    - `withXAPI()`: A higher-order function that enhances components with automatic xAPI tracking.
    - `XAPIProvider`: A context provider that makes the xAPI object available to all xAPI-enhanced components within the application.

## Setup
1. Install this library via [npm](https://www.npmjs.com/package/react-xapi-wrapper) or [yarn](https://classic.yarnpkg.com/en/package/react-xapi-wrapper):
`npm install react-xapi-wrapper` or `yarn add react-xapi-wrapper`
```
2. Initialize the `XAPIProvider` with an xAPI object created using `setupXAPI()`. Components must be rendered within this provider to collect xAPI statements.
```typescript
const xAPI = setupXAPI({
    currentLanguage: 'en',
    projectURL: 'https://github.com/HASKI-RAK/react-xapi-wrapper',
    projectVersion: '1.0.0',
    repositories: 'wiki.haski.app/',
    userID: '1',
    xAPI: {
        auth: {
            username: 'username',
            password: 'password',
        }
        endpoint: 'endpoint',
        version '1.0.3'
    }
}) 

return (
    <XAPIProvider value={xAPI}>
        <App />
    </XAPIProvider>
)
```
3. Add the `UserInteractionTracker` at the top level of your app to track user interactions globally.
```typescript
return (
    <XAPIProvider value={xAPI}>
        <UserInteractionTracker />
        <App />
    </XAPIProvider>
)
```
4. Wrap components with `withXAPI()` to enable automatic xAPI collection. Supported event handlers (e.g. `onClick`) will trigger statement creation and dispatching when used. 
```typescript
const Button = withXAPI(() => <button />, {
    componentFilePath: new URL(import.meta.url).pathname,
    componentType: 'button',
    pageName: 'Home'
})

export default Button
```

## Development
The project can be built by cloning the repository and running `yarn build` to create a `dist/`-folder containing the output. All tests are written using `jest`, with 100% coverage on statements, branches, functions, and lines. They can be run using: `yarn test`. Further documentation is provided via `TSDoc` comments in the source code.

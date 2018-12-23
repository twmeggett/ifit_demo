# itamaro-vue2-boiletplate

> A Vue 2 Webpack Boilerplate with Firebase integration, using Vuex & VuexFire to sync state, and FirebaseUI for authentication

Check out the deployed demo (Firebase Hosting): https://counter-demo-w00t.firebaseapp.com/

## Build & Dev Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn build

# build for production and view the bundle analyzer report
yarn run build --report

# run unit tests
yarn run unit

# run e2e tests
yarn run e2e

# run all tests
yarn test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Firebase Setup

Create a Firebase project through the [Firebase console](https://console.firebase.google.com/), and set up Google Sign-In method (https://firebase.google.com/docs/auth/).

The Firebase configuration for this project was created by running `firebase init` in the project root dir, after installing the Firebase CLI (`brew install firebase-cli`).

Run `firebase login` to authenticate.

Deploy the entire app:

```
yarn build
firebase deploy
```

Deploy only database rules (described in `database.rules.json`):

```
firebase deploy --only database
```
# data-grid

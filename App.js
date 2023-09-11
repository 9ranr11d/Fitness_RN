/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
 
import "react-native-gesture-handler";
import "react-native-get-random-values";
import React from "react";
/* Redux */
import { Provider } from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "./store/reducers/rootReducer";
/* Navigation */
import MainNavigation from "./src/navigation/MainNavigation";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const App = () => {
  return(
    <Provider store={store}>
      <MainNavigation/>
    </Provider>
  );
};

export default App;

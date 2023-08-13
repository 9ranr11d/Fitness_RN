/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
 
import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Timer from "./src/screen/Timer/Timer";
import Calendar from "./src/screen/Calendar/Calendar";

const Tab = createBottomTabNavigator();

function App() {
  const TabBarIcon = (focused, name) => {
    let iconName, iconSize;
  
    if(name === "Timer")
      iconName = "timer-outline";
    else if(name === "Calendar")
      iconName = "calendar-outline";
  
    iconSize = focused ? 30 : 20;
  
    return(
      <Ionicons
        name={iconName}
        size={iconSize}
      />
    )
  };
  
  return(
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Timer"
        screenOptions = {({route}) => ({
          headerShown: false,
          tabBarLabel: route.name,
          tabBarIcon: ({focused}) => (
            TabBarIcon(focused, route.name)
          )
        })}
      >
        <Tab.Screen
          name="Timer"
          component={Timer}
        />
        <Tab.Screen
          name="Calendar"
          component={Calendar}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

export default App;

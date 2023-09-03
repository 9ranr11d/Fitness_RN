/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
 
import "react-native-gesture-handler";
import 'react-native-get-random-values';
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Timer from "./src/screen/Timer/Timer";
import Calendar from "./src/screen/Calendar/Calendar";
import Diary from "./src/screen/Diary/Diary";

const Tab = createBottomTabNavigator();

function App() {
  const TabBarIcon = (focused, name) => {
    let iconName, iconSize;

    switch(name) {
      case "Timer":
        iconName = "timer-outline";
        break;
      case "Calendar":
        iconName = "calendar-outline";
        break;
      case "Diary":
        iconName = "list-outline";
        break;
      default:
        iconName = "ban-outline";
        break;
    }
  
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
        <Tab.Screen
          name="Diary"
          component={Diary}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

export default App;

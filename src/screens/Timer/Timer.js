import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* Screens */
import TimerSetting from "./TimerSetting";
import TimerRunning from "./TimerRunning";

const Stack = createStackNavigator();

const Timer = () => {
  return (
    <Stack.Navigator
      initialRouteName="TimerSetting"
      screenOptions = {() => ({
        headerShown: false
    })}
    >
      <Stack.Screen
        name="TimerSetting"
        component={TimerSetting}
      />
      <Stack.Screen 
        name="TimerRunning"
        component={TimerRunning}
      />
    </Stack.Navigator>
  );
};

export default Timer;
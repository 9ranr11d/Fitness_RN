import React, { useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
/* Redux */
import { fetchRecord } from "../../store/actions/recordAction";
import { useDispatch, useSelector } from "react-redux";
/* Screens */
import Timer from "../screens/Timer/Timer";
import Calendar from "../screens/Calendar/Calendar";
import Diary from "../screens/Diary/Diary";

const Tab = createBottomTabNavigator();

/**
 * 바텀 네비게이션
 */
const MainNavigation = () => {
  const dispatch = useDispatch();

  const recordReducer = useSelector(state => state.recordReducer);

  // 바텀 네비게이션 스타일
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

  useEffect(() => {
    dispatch(fetchRecord());
  }, [dispatch]);

  useEffect(() => {
    if(recordReducer.msg !== "")
      Alert.alert("ERROR", `데이터를 받아오지 못했습니다.\n Error: ${recordReducer.msg}`);
  }, [recordReducer]);
  
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
};

const styles = StyleSheet.create({

});

export default MainNavigation;
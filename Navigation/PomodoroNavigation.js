import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Customer Screen Imports
import Pomodoro from "../Screens/Pomodoro";
import colors from "../Constants/colors";

const Stack = createStackNavigator();

function myStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pomodoro" component={Pomodoro} options={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: colors.primaryColor,
          }
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default myStack;

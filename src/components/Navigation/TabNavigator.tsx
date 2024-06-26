import {  createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LeaderboardScreen from "../../screens/LeaderboardScreen";
import QuizzesScreen from "../../screens/QuizzesScreen";
import HomeScreen from "../../screens/HomeScreen";
import BadgeScreen from "../../screens/CoursesScreen";
const Tab = createBottomTabNavigator();

/**
 * TabNavigator creates the bottom tab navigation for the app.
 * It includes four main screens: Home, Badges, Quizzes, and Leaderboard.
 * Each tab is associated with an icon from MaterialIcons.
 *
 * @returns {JSX.Element} The bottom tab navigator with the defined screens and options.
 */
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) =>(
            <MaterialIcons
              name="home"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Badges"
        component={BadgeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) =>(
            <MaterialIcons
              name="school"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Quizzes"
        component={QuizzesScreen}
        options={{
          tabBarIcon: ({color, size}) =>(
            <MaterialIcons
              name="quiz"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        // @ts-ignore
        component={LeaderboardScreen}
        options={{
          tabBarIcon: ({color, size}) =>(
            <MaterialIcons
              name="leaderboard"
              size={size}
              color={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator;

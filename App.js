import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons'
import IconButton from './components/ui/IconButton';
import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

function ExpensesOverview() {
  return <BottomTabs.Navigator screenOptions={({ navigation }) => ({
    headerStyle: {
      backgroundColor: GlobalStyles.colors.primary500,
    },
    headerTintColor: 'white',
    tabBarStyle: {
      backgroundColor: GlobalStyles.colors.primary500,
    },
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    headerRight: ({ tintColor }) => (<IconButton onPress={() => {
      navigation.navigate('ManageExpense')
    }} icon='add' size={24} color={tintColor} />)
  })
  }>
    <BottomTabs.Screen name='RecentExpenses' component={RecentExpenses} options={
      {
        headerTitle: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({ color, size }) => <Ionicons name='hourglass' size={size} color={color} />
      }
    } />
    <BottomTabs.Screen name='AllExpenses' component={AllExpenses} options={
      {
        headerTitle: 'All Expenses',
        tabBarLabel: 'All',
        tabBarIcon: ({ color, size }) => <Ionicons name='calendar' size={size} color={color} />
      }
    } />
  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={
            {
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500,
                headerTintColor: 'white'
              }
            }
          }>
            <Stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={
              { headerShown: false }
            } />
            <Stack.Screen name='ManageExpense' component={ManageExpense} options={{
              presentation: 'modal'
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

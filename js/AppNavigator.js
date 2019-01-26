import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import { Icon } from 'expo';

import ArsenalScreen from './screens/ArsenalScreen';
import LaborierungScreen from './screens/LaborierungScreen';
import LaborierungItemScreen from './screens/LaborierenScreens/LaborierungItemScreen';
import SchießstandScreen from './screens/SchießstandScreen';
import SchießstandItemScreen from './screens/SchießstandScreens/SchießstandItemScreen';
import InfoScreen from './screens/InfoScreen';
import ArsenalSubMenueScreen from './screens/ArsenalScreens/ArsenalSubMenueScreen';
import ArsenalHinzufügenScreen from './screens/ArsenalScreens/ArsenalHinzufügenScreen';
import LaborierungHinzufügenScreen from './screens/LaborierenScreens/LaborierungHinzufügenScreen';


//Um von Stapel an Laborierungen immer das selbe Untermenü aufzurufen -> LaborierungItemScreen
const ArsenalStack = createStackNavigator(
  { ArsenalScreen, ArsenalSubMenueScreen, ArsenalHinzufügenScreen},
  {
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: 'aliceblue' }
    }
  }
);

const LaborierungsStack = createStackNavigator(
  { LaborierungScreen, LaborierungItemScreen, LaborierungHinzufügenScreen, SchießstandScreen},
  {
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: 'aliceblue' }
    }
  }
);

const SchießstandStack = createStackNavigator(
  { SchießstandScreen, SchießstandItemScreen, LaborierungScreen, LaborierungItemScreen, LaborierungHinzufügenScreen,  },
  {
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: 'aliceblue' }
    }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    TabLinks: {
      screen: ArsenalStack,
      navigationOptions: {
        title: 'Arsenal',
        tabBarIcon: ({ tintColor }) => (
          <Icon.Feather name="shopping-bag" size={24} color={tintColor} />
        )
      }
    },
    TabMitte: {
      screen: LaborierungsStack,
      navigationOptions: {
        title: 'Laborierung',
        tabBarIcon: ({ tintColor }) => (
          <Icon.AntDesign name="form" size={24} color={tintColor} />
        )
      }
    },
    TabMitteRechts: {
      screen: SchießstandStack,
      navigationOptions: {
        title: 'Schießstand',
        tabBarIcon: ({ tintColor }) => (
          <Icon.MaterialCommunityIcons name="target" size={24} color={tintColor} />
        )
      }
    },
    TabRechts: {
      screen: InfoScreen,
      navigationOptions: {
        title: 'Schießstand',
        tabBarIcon: ({ tintColor }) => (
          <Icon.Feather name="info" size={24} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'darkorange',
      style: {
        backgroundColor: 'aliceblue'
      }
    }
  }
);

export default createAppContainer(TabNavigator);

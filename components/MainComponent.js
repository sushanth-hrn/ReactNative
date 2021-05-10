import React , { Component } from 'react';
import { View, Platform } from "react-native";
import { createStackNavigator } from "react-navigation";
import { Dishes } from '../shared/dishes'
import Dishdetail from './DishdetailComponent';
import Menu from './MenuComponent';

const MenuNavigator = createStackNavigator({
    Menu : { screen : Menu },
    Dishdetail : { screen : Dishdetail }
}, {
    initialRouteName : 'Menu',
    navigationOptions : {
        headerStyle : {
            backgroundColor : '#512DA8'
        },
        haederTintColor : '#fff',
        headerTitleStyle : {
            color : '#fff'
        }
    }
})

class Main extends Component {
    render() {
        return (
            <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Consts.statusBarHeight}}>
                <MenuNavigator />
            </View>
        )
    }

}

export default Main;
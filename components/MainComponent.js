import React , { Component } from 'react';
import { View, Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import Dishdetail from './DishdetailComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';

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
});

const HomeNavigator = createStackNavigator({
    Home : { screen : Home }
}, {
    navigationOptions : {
        headerStyle : {
            backgroundColor : '#512DA8'
        },
        haederTintColor : '#fff',
        headerTitleStyle : {
            color : '#fff'
        }
    }
});

const AboutNavigator = createStackNavigator({
    About : { screen : About }
}, {
    navigationOptions : {
        headerStyle : {
            backgroundColor : '#512DA8'
        },
        haederTintColor : '#fff',
        headerTitleStyle : {
            color : '#fff'
        }
    }
});

const ContactNavigator = createStackNavigator({
    Contact : { screen : Contact }
}, {
    navigationOptions : {
        headerStyle : {
            backgroundColor : '#512DA8'
        },
        haederTintColor : '#fff',
        headerTitleStyle : {
            color : '#fff'
        }
    }
});

const MainNavigator = createDrawerNavigator({
    Home : {
        screen : HomeNavigator,
        navigationOptions : {
            title : 'Home',
            drawerLabel : 'Home'
        }
    },
    About : {
        screen : AboutNavigator,
        navigationOptions : {
            title : 'About Us',
            drawerLabel : 'About Us'
        }
    },
    Menu : {
        screen : MenuNavigator,
        navigationOptions : {
            title : 'Menu',
            drawerLabel : 'Menu'
        }
    },
    Contact : {
        screen : ContactNavigator,
        navigationOptions : {
            title : 'Contact Us',
            drawerLabel : 'Contact Us'
        }
    }
}, {
    drawerBackgroundColor : '#D1C4E9',
})

//const AppStack = StackNavigator({ MainNavigator : { screen: MainNavigator } });

const MainContainer = createAppContainer(MainNavigator);

class Main extends Component {
    render() {
        return (
            // <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Consts.statusBarHeight}}>
            //     <MainContainer />
            // </View>
            <MainContainer />
        )
    }

}

export default Main;
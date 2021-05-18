import React , { Component } from 'react';
import { View, Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Icon } from "react-navigation-elements";
import Dishdetail from './DishdetailComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';

const MenuNavigator = createStackNavigator({
    Menu : { screen : Menu,
                navigationOptions: ({navigation}) => ({
                    headerLeft : <Icon name='menu' color='white'
                                    size={24} onPress={() => navigation.toggleDrawer()}
                                />
                })
            },
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
    navigationOptions : ({navigation}) => ({
        headerStyle : {
            backgroundColor : '#512DA8'
        },
        haederTintColor : '#fff',
        headerTitleStyle : {
            color : '#fff'
        },
        headerLeft : <Icon name='menu' color='white'
                        size={24} onPress={() => navigation.toggleDrawer()}
                    />

    })
});

const AboutNavigator = createStackNavigator({
    About : { screen : About }
}, {
    navigationOptions : ({navigation}) => ({
        headerStyle : {
            backgroundColor : '#512DA8'
        },
        haederTintColor : '#fff',
        headerTitleStyle : {
            color : '#fff'
        },
        headerLeft : <Icon name='menu' color='white'
                        size={24} onPress={() => navigation.toggleDrawer()}
                     />

    })
});

const ContactNavigator = createStackNavigator({
    Contact : { screen : Contact }
}, {
    navigationOptions : ({navigation}) => ({
        headerStyle : {
            backgroundColor : '#512DA8'
        },
        haederTintColor : '#fff',
        headerTitleStyle : {
            color : '#fff'
        },
        headerLeft : <Icon name='menu' color='white'
                        size={24} onPress={() => navigation.toggleDrawer()}
                     />

    })
});

const MainNavigator = createDrawerNavigator({
    Home : {
        screen : HomeNavigator,
        navigationOptions : {
            title : 'Home',
            drawerLabel : 'Home',
            drawerIcon : ({ tintColor }) => (
                <Icon
                    name='home'
                    type='font-awesome'
                    color={tintColor}
                    size={24}
                />
            )
        }
    },
    About : {
        screen : AboutNavigator,
        navigationOptions : {
            title : 'About Us',
            drawerLabel : 'About Us',
            drawerIcon : ({ tintColor }) => (
                <Icon
                    name='info-circle'
                    type='font-awesome'
                    color={tintColor}
                    size={24}
                />
            )
        }
    },
    Menu : {
        screen : MenuNavigator,
        navigationOptions : {
            title : 'Menu',
            drawerLabel : 'Menu',
            drawerIcon : ({ tintColor }) => (
                <Icon
                    name='list'
                    type='font-awesome'
                    color={tintColor}
                    size={24}
                />
            )
        }
    },
    Contact : {
        screen : ContactNavigator,
        navigationOptions : {
            title : 'Contact Us',
            drawerLabel : 'Contact Us',
            drawerIcon : ({ tintColor }) => (
                <Icon
                    name='address-card'
                    type='font-awesome'
                    color={tintColor}
                    size={22}
                />
            )
        }
    }
}, {
    drawerBackgroundColor : '#D1C4E9',
})

const MainContainer = createAppContainer(MainNavigator);

class Main extends Component {
    render() {
        return (
            <MainContainer />
        )
    }

}

export default Main;
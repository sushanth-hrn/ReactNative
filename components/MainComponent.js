import React , { Component } from 'react';
import { View, Platform, Image, StyleSheet, ScrollView, Text, NetInfo, ToastAndroid } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer, SafeAreaView } from "react-navigation";
import { Icon } from "react-native-elements";
import Dishdetail from './DishdetailComponent';
import Login from './LoginComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import Favorite from './FavoriteComponent';
import { connect } from 'react-redux';
import { baseurl } from '../shared/baseUrl';
import { fetchComments, fetchDishes, fetchLeaders, fetchPromos } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes : () => dispatch(fetchDishes()),
    fetchComments : () => dispatch(fetchComments()),
    fetchLeaders : () => dispatch(fetchLeaders()),
    fetchPromos : () => dispatch(fetchPromos()),
})

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

const FavoriteNavigator = createStackNavigator({
    Favorite : { screen : Favorite }
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

const ReservationNavigator = createStackNavigator({
    Reservation : { screen : Reservation }
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

const LoginNavigator = createStackNavigator({
    Login : { screen : Login }
}, {
    navigationOptions : ({navigation}) => ({
        headerStyle : {
            backgroundColor : '#512DA8'
        },
        haederTintColor : '#fff',
        headerTitleStyle : {
            color : '#fff'
        },
        title: 'Login',
        headerLeft : <Icon name='menu' color='white'
                        size={24} onPress={() => navigation.toggleDrawer()}
                     />

    })
});

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container}
                forceInset={{ top : 'always' , horizontal : 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{ flex : 1 }}>
                    <Image source={{ uri: baseurl + 'images/logo.png' }}
                        style={styles.drawerImage}/>
                </View>
                <View style={{ flex : 2 }}>
                    <Text style={styles.drawerHeaderText}>Restaurant ConFusion</Text>
                </View>
            </View>
            <DrawerItems {...props}/>
        </SafeAreaView>
    </ScrollView>
)

const MainNavigator = createDrawerNavigator({
    Login : {
        screen : LoginNavigator,
        navigationOptions : {
            title : 'Login',
            drawerLabel : 'Login',
            drawerIcon : ({ tintColor }) => (
                <Icon
                    name='sign-in'
                    type='font-awesome'
                    color={tintColor}
                    size={24}
                />
            )
        }
    },
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
    },
    Favorite : {
        screen : FavoriteNavigator,
        navigationOptions : {
            title : 'My Favorites',
            drawerLabel : 'My Favorites',
            drawerIcon : ({ tintColor }) => (
                <Icon
                    name='heart'
                    type='font-awesome'
                    color={tintColor}
                    size={24}
                />
            )
        }
    },
    Reservation : {
        screen : ReservationNavigator,
        navigationOptions : {
            title : 'Reserve Table',
            drawerLabel : 'Reserve Table',
            drawerIcon : ({ tintColor }) => (
                <Icon
                    name='cutlery'
                    type='font-awesome'
                    color={tintColor}
                    size={24}
                />
            )
        }
    }
}, {
    initialRouteName: 'Home',
    drawerBackgroundColor : '#D1C4E9',
    contentComponent : CustomDrawerContentComponent
})

const MainContainer = createAppContainer(MainNavigator);

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();

        NetInfo.getConnectionInfo()
            .then((connectionInfo) => {
                ToastAndroid.show(
                    'Your Initial Network Connection Type: ' + connectionInfo.type +
                    ' and effectiveType: ' + connectionInfo.effectiveType,
                    ToastAndroid.LONG
                )
            });
        
        NetInfo.addEventListener('connectionChange',this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange(connectionInfo) {
        switch(connectionInfo.type) {
            case 'none':
                ToastAndroid.show('You are offline',ToastAndroid.LONG);
                break;
            case 'wifi':
                ToastAndroid.show('You are connected to WiFi network',ToastAndroid.LONG);
                break;
            case 'cellular':
                ToastAndroid.show('You are connected to cellular network',ToastAndroid.LONG);
                break;
            case 'unknown':
                ToastAndroid.show('You are connected to unknown network',ToastAndroid.LONG);
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <MainContainer />
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader : {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(Main);
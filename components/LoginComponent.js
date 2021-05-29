import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Card, Icon, Input, CheckBox, Button } from 'react-native-elements';
import { SecureStore, Permissions, ImagePicker, Asset, ImageManipulator } from 'expo';
import { createBottomTabNavigator } from 'ract-navigation';
import { baseurl } from '../shared/baseUrl';


class LoginTab extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((data) => JSON.parse(data))
            .then((data) => {
                if(data) {
                    this.setState({username: data.username});
                    this.setState({password: data.password});
                    this.setState({remember: true});
                }
            })
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <Icon 
                name='sign-in'
                type='font-awesome'
                size={24}
                iconStyle={{ color:tintColor }}
            />
        )
    };

    handleLogin() {
        console.log(JSON.stringify(this.state))
        if(this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({username : this.state.username, password : this.state.password})
            )
            .catch((err) => console.log('Could not save user info', err))
        }
        else {
            SecureStore.deleteItemAsync('userinfo')
                .catch((err) => console.log('Could not save user info', err))
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Input
                    placeholder='Enter the username' 
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    containerStyle={styles.formInput}
                />
                <Input 
                    placeholder='Enter the password'
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    leftIcon={{ type: 'font-awesome', name: 'key'}}
                    containerStyle={styles.formInput}
                />
                <CheckBox 
                    onPress={() => {this.setState({remember : !this.state.remember})}}
                    checked={this.state.remember}
                    title="Remember Me"
                    center
                    containerStyle={styles.CheckBox}
                />
                <View style={styles.formButton}>
                    <Button 
                        title='Login'
                        onPress={() => this.handleLogin()}
                        icon={<Icon name='sign-in' type='font-awesome' size={24} color='white'/>}
                        buttonStyle={{backgroundColor : '#512DA8'}}
                    />
                </View>
                <View style={styles.formButton}>
                    <Button 
                        title='Register?'
                        clear
                        onPress={() => this.props.navigation.navigate('Register')}
                        icon={<Icon name='user-plus' type='font-awesome' size={24} color='blue' />}
                        titleStyle={{color : 'blue'}}
                    />
                </View>
            </View>
        );
    }
}

class RegisterTab extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseurl + 'images/logo.png'
        }
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor }) => (
            <Icon 
                name='user-plus'
                type='font-awesome'
                size={24}
                iconStyle={{ color:tintColor }}
            />
        )
    };

    handleRegister() {
        console.log(JSON.stringify(this.state))
        if(this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({username : this.state.username, password : this.state.password})
            )
            .catch((err) => console.log('Could not save user info', err))
        }
    };

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if(cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsyns({
                allwsEditing: true,
                aspect: [4,3]
            })
            if(!capturedImage.cancelled) {
                this.processImage(capturedImage.uri)
            }
        }
    }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulate(
            imageUri,
            [
                { resize : { width : 400 }}
            ],
            {
                format : 'png'
            }
        );
        this.setState({ imageUrl : processedImage.uri });
    }

    render() {
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri: this.state.imageUrl}}
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image} 
                    />
                    <Button 
                        title='Camera'
                        onPress={() => this.getImageFromCamera()}
                    />
                </View>
                <Input
                    placeholder='Username' 
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    containerStyle={styles.formInput}
                />
                <Input 
                    placeholder='Password'
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    leftIcon={{ type: 'font-awesome', name: 'key'}}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder='First Name' 
                    onChangeText={(firstname) => this.setState({firstname})}
                    value={this.state.firstname}
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder='Last Name' 
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.lastname}
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder='Email' 
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    containerStyle={styles.formInput}
                />
                <CheckBox 
                    onPress={() => {this.setState({remember : !this.state.remember})}}
                    checked={this.state.remember}
                    title="Remember Me"
                    center
                    containerStyle={styles.CheckBox}
                />
                <View style={styles.formButton}>
                    <Button 
                        title='Register'
                        onPress={() => this.handleRegister()}
                        icon={<Icon name='user-plus' type='font-awesome' size={24} color='white'/>}
                        buttonStyle={{backgroundColor : '#512DA8'}}
                    />
                </View>
            </View>
        </ScrollView>
    }
}

const Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab
},{
    tabBarOptions : {
        activeBackgroundColor : '#9575CD',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor: 'white',
        inactiveTintColor: 'gray'
    }
});

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
      margin: 10,
      width: 80,
      height: 60
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});

export default Login;
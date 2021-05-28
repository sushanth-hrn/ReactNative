import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Card, Icon, Input, CheckBox } from 'react-native-elements';
import { SecureStore } from 'expo';

class Login extends Component {

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
                    onChangeText={(val) => this.setState({username})}
                    value={this.state.username}
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    containerStyle={styles.formInput}
                />
                <Input 
                    placeholder='Enter the password'
                    onChangeText={(val) => this.setState({password})}
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
                        color='#512DA8'
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    formInput: {
        margin: 40
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});

export default Login;
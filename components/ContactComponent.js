import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { MailComposer } from 'expo';

class Contact extends Component {

    static navigationOptions = {
        title : 'Contact Us'
    }

    sendEmail() {
        MailComposer.composeAsync({
            recipients: ['sushanthnukala280@gmail.com'],
            subject: 'Test Mail',
            body: 'It worked lol'
        });
    }

    render() {
        return (
            <SafeAreaView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Card>
                        <Card.Title>Contact Information</Card.Title>
                        <Card.Divider />
                        <Text style={{margin: 10,lineHeight: 30}}>
                            {`
                            121, Clear Water Bay Road 
                            Clear Water Bay, Kowloon 
                            HONG KONG 
                            Tel: +852 1234 5678 
                            Fax: +852 8765 4321 
                            Email:confusion@food.net
                            `}
                        </Text>
                        <Button 
                            title='Send Email'
                            buttonStyle={{backgroundColor: "#512DA8"}}
                            icon={<Icon name='envelope-o' type='font-awesome' color='white'/>}
                            onPress={() => this.sendEmail}
                        />
                    </Card>
                </Animatable.View>
            </SafeAreaView>
        )
    }
}

export default Contact;
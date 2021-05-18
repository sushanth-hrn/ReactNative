import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Card } from 'react-native-elements';

class Contact extends Component {

    static navigationOptions = {
        title : 'Contact Us'
    }

    render() {
        return (
            <SafeAreaView>
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
                </Card>
            </SafeAreaView>
        )
    }
}

export default Contact;
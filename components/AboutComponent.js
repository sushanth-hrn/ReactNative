import React, { Component } from 'react';
import { Text, ScrollView, FlatList } from 'react-native';
import { Avatar ,Card, ListItem } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';

function History() {
    return (
        <Card style={{margin : 10}}>
            <Card.Title>Our History</Card.Title>
            <Card.Divider/>
            <Text style={{margin: 5}}>
                Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. 
                With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong. 
                Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
            </Text>
            <Text style={{margin: 5}}>
                The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the
                first time the world's best cuisines in a pan.
            </Text>
        </Card>
    )
}

function RenderLeader(props) {

    const renderItems = ({item, index}) => {
        return (
            <ListItem key={index} bottomDivider>
                <Avatar rounded source={{ uri: './images/alberto.png' }} />
                <ListItem.Content>
                    <ListItem.Title>
                        {item.name}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                        {item.designation}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    }

    return (
        <Card>
            <Card.Title>Corporate Leadership</Card.Title>
            <Card.Divider />
            <FlatList 
                data = {props.leaders}
                renderItem = {renderItems}
                keyExtractor = {(item) => item.id.toString()}
            />
        </Card>
    )
    
}

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaders : LEADERS
        }
    }

    static navigationOptions = {
        title: 'About Us'
    }

    render() {
        return (
            <ScrollView>
                <History />
                <RenderLeader leaders={this.state.leaders} />
            </ScrollView>
        )
    }
}

export default About;
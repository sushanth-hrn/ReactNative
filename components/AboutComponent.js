import React, { Component } from 'react';
import { Text, ScrollView, FlatList } from 'react-native';
import { Avatar ,Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseurl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        leaders : state.leaders
    }
}

function History() {
    return (
        <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
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
        </Animatable.View>
    )
}

function RenderLeader(props) {

    const renderItems = ({item, index}) => {
        return (
            <ListItem key={index} bottomDivider>
                <Avatar rounded source={{ uri: baseurl + item.image }} />
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

    if(props.isLoading) {
        return (
            <ScrollView>
                <Card>
                    <Card.Title>Corporate Leadership</Card.Title>
                    <Card.Divider />
                    <Loading />
                </Card>
            </ScrollView>
        );        
    } 
    else if(props.errMess) {
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Card>
                        <Card.Title>Corporate Leadership</Card.Title>
                        <Card.Divider />
                        <Text>{props.errMess}</Text>
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
    else {
        return (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                <Card>
                    <Card.Title>Corporate Leadership</Card.Title>
                    <Card.Divider />
                    <FlatList 
                        data = {props.leaders}
                        renderItem = {renderItems}
                        keyExtractor = {(item) => item.id.toString()}
                    />
                </Card>
            </Animatable.View>
        );
    }
}

class About extends Component {

    static navigationOptions = {
        title: 'About Us'
    }

    render() {
        return (
            <ScrollView>
                <History />
                <RenderLeader leaders={this.props.leaders.leaders} 
                    isLoading={this.props.leaders.isLoading}
                    errMess={this.props.leaders.errMess}
                />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(About);
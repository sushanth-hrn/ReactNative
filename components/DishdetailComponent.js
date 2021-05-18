import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

function RenderDish(props) {
    
    var dish = props.dish;
        
    if(dish) {
        return (
            <Card>
                <Card.Image source={require('./images/uthappizza.png')}>
                    <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
                </Card.Image>
                <Text style={{margin: 10}}>{dish.description}</Text>
            </Card>
        );
    } else {
        return (
            <View></View>
        );
    }
    
}

class Dishdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        }
    }

    static navigationOptions = {
        title: 'Dish Detail'
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return (
            <RenderDish dish={this.state.dishes[+dishId]} />
        );
    }
}

export default Dishdetail;
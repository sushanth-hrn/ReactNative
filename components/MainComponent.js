import React , { Component } from 'react';
import { View } from "react-native";
import { Dishes } from '../shared/dishes'
import Dishdetail from './DishdetailComponent';
import Menu from './MenuComponent';

class Main extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dishes : Dishes,
            selectedDish : null
        }
    }

    onDishSelect(dishId) {
        this.setState({
            selectedDish : dishId
        })
    }

    render() {
        return (
            <View>
                <Menu dishes={this.state.dishes} onpress={(dishId) => this.onDishSelect(dishId)}/>
                <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
            </View>
        )
    }

}

export default Main;
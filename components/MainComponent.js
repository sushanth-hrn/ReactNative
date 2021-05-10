import React , { Component } from 'react';
import { Dishes } from '../shared/dishes'
import Menu from './MenuComponent';

class Main extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dishes : Dishes
        }
    }

    render() {
        return (
            <Menu dishes={this.state.dishes} />
        )
    }

}

export default Main;
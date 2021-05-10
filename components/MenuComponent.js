import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        }
    }

    static navigationOptions = {
        title : 'Menu'
    }

    render() {

        const renderMenuItem = ({item, key}) => {
            return (
                    <ListItem
                        key={key}
                        onPress={() => navigate('Dishdetail',{ dishId: item.id })}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        leftAvatar={{ source: require('./images/uthappizza.png')}}
                    />
            );
        };

        const { navigate } = this.props.navigation;

        return (  
            <View>
                <FlatList 
                    data={this.state.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        );
    
    }

}


export default Menu;
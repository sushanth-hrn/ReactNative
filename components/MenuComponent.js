import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
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
                    key = {key}
                    onPress={() => navigate('Dishdetail',{ dishId: item.id })} 
                    bottomDivider
                >
                    <Avatar rounded source={{ uri: './images/uthappizza.png' }} />
                    <ListItem.Content>
                        <ListItem.Title>
                            {item.name}
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            {item.description}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
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
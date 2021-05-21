import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseurl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes : state.dishes,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
    }
}

class Favorite extends Component {

    static navigationOptions = {
        title : 'My Favorites'
    }

    render() {
        const { navigate } = this.props.navigation;
        
        const renderFavorites = ({item, index}) => {

            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => this.props.deleteFavorite(item.id)
                }
            ];

            <Swipeout autoClose={true} right={rightButton}>
                <ListItem
                    key={index}
                    onPress={() => navigate('Dishdetail',{ dishId: item.id })}
                    bottomDivider
                >
                    <Avatar rounded source={{ uri: baseurl + item.image }} />
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
            </Swipeout>
        }

        if(this.props.dishes.isLoading) {
            return (
                <Loading />
            );
        }
        else if(this.props.dishes.errMess) {
            return (
                <Text>{this.props.dishes.errMess}</Text>
            );
        }
        else {
            return (
                <FlatList 
                    data={this.props.dishes.dishes.filter((dish) => this.props.favorites.favorites.some(el => el === dish.id))}
                    renderItem={renderFavorites}
                    keyExtractor={(item) => item.id.toString()}
                />
            );
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Favorite);
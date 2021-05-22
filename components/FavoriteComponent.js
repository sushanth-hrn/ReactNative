import React, { Component } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseurl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable'

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

            const leftButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Favorite',
                            'Are you sure you want to delete this as your favorite?',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                    onPress: () => console.log('The Favorite' + item.name + 'is not deleted')
                                },
                                {
                                    text: 'Yes',
                                    onPress: () => this.props.deleteFavorite(item.id)
                                }
                            ],
                            {cancelable : false}
                        )
                    }
                }
            ];

            <Swipeout autoClose={true} left={leftButton}>
                <Animatable.View animation='fadeInRightBig' duration={2000} delay={1000}>
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
                </Animatable.View>
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
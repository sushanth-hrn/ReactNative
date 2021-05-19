import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

function RenderDish(props) {
    
    var dish = props.dish;
        
    if(dish) {
        return (
            <Card>
                <Card.Image source={require('./images/uthappizza.png')}>
                    <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
                </Card.Image>
                <Text style={{margin: 10}}>{dish.description}</Text>
                <Icon 
                    raised
                    reverse
                    name= {props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color= '#f50'
                    onPress={() => props.favorite ? console.log('Already a favorite') : props.onPress()}
                />
            </Card>
        );
    } else {
        return (
            <View></View>
        );
    }
}

function RenderComments(props) {
    const comments = props.comments;

    if(comments) {
        const renderCommentItem = ({item,index}) => {
            return (
                <View key={index} style={{margin: 10,borderBottomColor: 'grey',borderBottomWidth: 0.5,}}>
                    <Text style={{fontSize: 14}}>{item.comment}</Text>
                    <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                    <Text style={{fontSize: 12, paddingBottom: 10}}>{'-- ' + item.author + ', ' + item.date}</Text>
                </View>
            );
        }
        return (
            <Card>
                <Card.Title>Comments</Card.Title>
                <Card.Divider />
                <FlatList 
                    data = {comments}
                    renderItem = {renderCommentItem}
                    keyExtractor = {(item) => item.id.toString()}
                />
            </Card>
        )
    } else {
        <View>
            <Card>
                <Text>No Comments available for this dish</Text>
            </Card>
        </View>
    }
}

class Dishdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            favorites: []
        }
    }

    static navigationOptions = {
        title: 'Dish Detail'
    }

    markFavorites(dishId) {
        this.setState({
            favorites: this.state.favorites.concat(dishId)
        })
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return (
            <ScrollView>
                <RenderDish dish={this.state.dishes[+dishId]} 
                    favorite={this.state.favorites.some((fav) => fav == dishId)}
                    onPress={() => this.markFavorites(dishId)}
                />
                <RenderComments comments={this.state.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}

export default Dishdetail;
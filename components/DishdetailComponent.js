import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, Modal, StyleSheet } from 'react-native';
import { Card, ListItem, Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseurl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import ReviewModal from "react-native-review-modal";
import { postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes : state.dishes,
        comments: state.comments,
        favorites : state.favorites
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postFavorite: (dishId) => dispatch(postFavorite(dishId)),
        postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
    }
}

function RenderDish(props) {
    
    var dish = props.dish;
        
    if(dish) {
        return (
            <Card>
                <Card.Image source={{uri: baseurl + dish.image}}>
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
                <Icon 
                    raised
                    reverse
                    name= 'pencil'
                    type='font-awesome'
                    color= '#512DA8'
                    onPress={() => props.toggleModal()}
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
            author: '',
            comment: '',
            showModal: false,
            starCount: 3
        }
    }

    static navigationOptions = {
        title: 'Dish Detail'
    }

    markFavorites(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    resetForm() {
        this.setState({
            author: '',
            comment: '',
            startCount: 3
        })
    }

    onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
    }

    handleComment(dishId) {
        console.log(JSON.stringify(this.state));
        this.props.postComment(dishId, this.state.starCount, this.state.author, this.state.comment);
        this.toggleModal();
        this.resetForm();
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.props.favorites.favorites.some((fav) => fav == dishId)}
                    onPress={() => this.markFavorites(dishId)}
                    toggleModal={() => this.toggleModal()}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {this.toggleModal();this.resetForm()}}
                    onRequestClose={() => {this.toggleModal();this.resetForm()}}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Comment</Text>
                        <Text style={{justifyContent: 'center'}}>Rating: </Text>
                        <ReviewModal
                            starRating={this.state.starCount}
                            onStarRatingPress={rating => {
                                this.onStarRatingPress(rating);
                            }}
                        />
                        <Input
                            placeholder='Name . . .'
                            leftIcon={
                                <Icon
                                    name='user'
                                    size={24}
                                    color='grey'
                                />
                            }
                            style={{margin: 10}}
                            onChangeText={value => this.setState({ author: value })}
                        />
                        <Input
                            placeholder="Comment . . ."
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                            style={{margin: 10}}
                            onChangeText={value => this.setState({ comment: value })}
                        />
                        <View style={styles.formRow}>
                            <View style={styles.formItem}>
                                <Button 
                                    onPress={() => {this.toggleModal();this.resetForm()}}
                                    title="Close"
                                    color="#841584"
                                />
                            </View>
                            <View style={styles.formItem}>
                                <Button 
                                    onPress={() => {this.handleComment(dishId)}}
                                    title="Submit"
                                    color="#34eb40"
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        color: 'white',
        backgroundColor: '#512DA8',
        fontweight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(Dishdetail);
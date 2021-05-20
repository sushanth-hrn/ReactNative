import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Avatar, ListItem, Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseurl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        dishes : state.dishes
    }
}
class Menu extends Component {

    static navigationOptions = {
        title : 'Menu'
    }

    render() {

        const renderMenuItem = ({item, index}) => {
            return (
                // <ListItem
                //     key = {index}
                //     onPress={() => navigate('Dishdetail',{ dishId: item.id })} 
                //     bottomDivider
                // >
                //     <Avatar rounded source={{ uri: baseurl + item.image }} />
                //     <ListItem.Content>
                //         <ListItem.Title>
                //             {item.name}
                //         </ListItem.Title>
                //         <ListItem.Subtitle>
                //             {item.description}
                //         </ListItem.Subtitle>
                //     </ListItem.Content>
                //     <ListItem.Chevron/>
                // </ListItem>
                <Tile 
                    key = {index}
                    onPress={() => navigate('Dishdetail',{ dishId: item.id })} 
                    title={item.name}
                    caption={item.description}
                    featured
                    imageSrc={{ uri : baseurl + item.image }}
                >

                </Tile>
            );
        };

        const { navigate } = this.props.navigation;

        if(this.props.dishes.isLoading) {
            return (
                <Loading />
            );
        }
        else if(this.props.dishes.errMess) {
            return (
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            )
        }
        else {
            return (  
                <View>
                    <FlatList 
                        data={this.props.dishes.dishes}
                        renderItem={renderMenuItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            );
        }
    }
}

export default connect(mapStateToProps)(Menu);
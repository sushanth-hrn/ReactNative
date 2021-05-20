import React , { Component } from 'react';
import { ScrollView ,View, Text } from "react-native";
import { Card } from "react-native-elements";
import { connect } from 'react-redux';
import { baseurl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        dishes : state.dishes,
        leaders : state.leaders,
        promotions : state.promotions
    }
}

function RenderItem(props) {
    const item = props.item;

    if(props.isLoading) {
        return (
            <Loading />
        );
    }
    else if(props.errMess) {
        return (
            <View>
                <Text style={{fontSize:15}}>{props.errMess}</Text>
            </View>
        );
    }
    else {
        if (item != null) {
            return (
                <Card>
                    <Card.Image source={{uri: baseurl + item.image}}>
                        <Card.FeaturedTitle>{item.name}</Card.FeaturedTitle>
                        {/* <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle> */}
                    </Card.Image>
                    <Text style={{margin:10}}>
                        {item.description}
                    </Text>
                </Card>
            );
        } else {
            return (
                <View>
                    <Text>Dint receive any props data</Text>
                </View>
            );
        }
    }
}

class Home extends Component {
    
    static navigationOptions = {
        title : 'Home'
    }

    render() {
        return (
            <ScrollView>
                <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                />
                <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess}
                />
                <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    isLoading={this.props.leaders.isLoading}
                    errMess={this.props.leaders.errMess}
                />
            </ScrollView>
        );
    }

}

export default connect(mapStateToProps)(Home);
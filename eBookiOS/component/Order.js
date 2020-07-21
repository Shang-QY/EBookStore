import {Button, Text, View, AsyncStorage, StyleSheet} from 'react-native';
import React from 'react';
import {getOrderItems} from '../service/OrderService';
import {OrderItem} from './OrderItem';
import {height, width} from '../utility/Dimensions';


export class Order extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderItems: [],
        };
    }

    componentDidMount() {
        const callback = (data) => {
            this.setState({orderItems: data});
        };
        getOrderItems(this.props.info.orderID, callback);
    }

    render() {
        let that = this;
        return (
            <View style={styles.card}>
                <Text style={styles.date}>购买日期：{this.props.info.date.substr(0,10)}</Text>
                {this.state.orderItems.map(function (item) {
                    return (<OrderItem info={item} navigation={that.props.navigation}/>)
                }, this)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card:{
        alignSelf:'center',
        marginTop:15,
        backgroundColor:'white',
        borderRadius:30,
        width:width * 0.93
    },
    date:{
        marginBottom:3,
        marginTop:3,
        alignSelf:'center',
        color:'rgb(125,125,125)'
    }
});

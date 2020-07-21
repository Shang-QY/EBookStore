import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet, ScrollView, AsyncStorage, Alert, Modal, DeviceEventEmitter } from "react-native";
import { width, height} from '../utility/Dimensions';
import {getOrders} from '../service/OrderService';
import {Order} from '../component/Order';


export class OrderScreen extends Component {
    constructor() {
        super();
        this.state = {
            orders:[],
        }
    }

    getData = () => {
        const callback = (data) => {
            this.setState({
                orders: data.reverse(),
            });
        };
        AsyncStorage.getItem("userId").then((value) => {
            let userId = parseInt(value);
            getOrders(userId, callback);
        });
    };

    //这里用到了事件监听器，并在页面销毁时释放
    componentDidMount(){
        this.subscription = DeviceEventEmitter.addListener('UPDATE_ORDER', () => {this.getData()});
        this.getData();
    }

    componentWillUnmount() {
        this.subscription.remove();
    };

    render () {
        if(this.state.orders.length === 0){
            return (
                <View >
                    <Text>还没有订单呢，快去主页逛逛吧～</Text>
                </View>
            )
        }
        let that = this;
        return (
            <View>
                <ScrollView style={styles.scrollList}>
                    {this.state.orders.map(function (item, idx) {
                        return(
                            <Order info={item} navigation={that.props.navigation}/>
                        )
                    })}
                    <View style={{minHeight:100}}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollList:{
        height:height * 0.85,
        width:width,
        backgroundColor: 'rgb(238,238,238)'
    }
});

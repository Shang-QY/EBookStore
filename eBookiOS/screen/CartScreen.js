import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet, ScrollView, AsyncStorage, Alert, Modal, DeviceEventEmitter } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { width, height} from '../utility/Dimensions';
import {getCart, changeItemAmount, deleteCartItem, addCartToOrder} from '../service/CartService';
import {NumberChooserButton} from '../component/NumberChooserButton';
import Toast from "react-native-tiny-toast";
import {noImage} from '../images/noImageBase64';
import {getOrders} from '../service/OrderService';


export class CartScreen extends Component {
    constructor() {
        super();
        this.state = {
            cartItems:[],
            chooseItems:[],
            itemChooseBool:[],
            chooseNumber: 0,
            chooseTotal:true,
            totalPrice:0,
            modalVisible:false,
            willBeDelete:0
        }
    }

    getData = () => {
        const callback = (data) => {
            let chooseBool = [];
            let price = 0;
            for(let i = 0; i < data.length; ++i){
                chooseBool.push(true);
                price += data[i].book.price * data[i].amount;
            }
            this.setState({
                cartItems: data,
                chooseItems: data,
                itemChooseBool: chooseBool,
                chooseNumber: data.length,
                totalPrice: price
            });
        };
        AsyncStorage.getItem("userId").then((value) => {
            let userId = parseInt(value);
            getCart(userId, callback);
        });
    };

    //这里用到了事件监听器，并在页面销毁时释放，目的在于购物车作为堆栈底部已存在的页面，需要在用户添加购物车后及时更新
    componentDidMount(){
        this.subscription = DeviceEventEmitter.addListener('UPDATE_CART', () => {this.getData()});
        this.getData();
    }

    componentWillUnmount() {
        this.subscription.remove();
    };

    onNumberMinus = (index) => {
        let cartIts = this.state.cartItems;
        if(cartIts[index].amount === 1){
            this.setState({modalVisible:true,willBeDelete:cartIts[index].id});
            return;
        }
        let price = this.state.totalPrice;
        cartIts[index].amount--;
        changeItemAmount(cartIts[index].id, cartIts[index].amount, () => {});
        if(this.state.itemChooseBool[index]) price -= cartIts[index].book.price;
        this.setState({
            cartItems: cartIts,
            totalPrice: price
        });
    };

    deleteCancel = () => {
        this.setState({modalVisible:false});
    };

    deleteSubmit = () => {
        this.setState({modalVisible:false});
        const callback = () => {
            Toast.showSuccess('移出购物车成功');
            this.getData();
        };
        AsyncStorage.getItem("userId").then((value) => {
            let userId = parseInt(value);
            deleteCartItem(userId,this.state.willBeDelete,callback);
        });
    };

    onNumberPlus = (index) => {
        let cartIts = this.state.cartItems;
        let price = this.state.totalPrice;
        cartIts[index].amount++;
        changeItemAmount(cartIts[index].id, cartIts[index].amount, () => {});
        if(this.state.itemChooseBool[index]) price += cartIts[index].book.price;
        this.setState({
            cartItems: cartIts,
            totalPrice: price
        });
    };

    onWholeChoose = () => {
        let totalChooseTrue = this.state.chooseTotal;
        let chooseBool = this.state.itemChooseBool;
        let price = this.state.totalPrice;
        let chooseNum = this.state.chooseNumber;
        if(totalChooseTrue) chooseNum = 0;
        else chooseNum = chooseBool.length;
        for(let i = 0; i < chooseBool.length; ++i){
            if(chooseBool[i] === totalChooseTrue){
                if(totalChooseTrue) price -= this.state.cartItems[i].book.price * this.state.cartItems[i].amount;
                else price += this.state.cartItems[i].book.price * this.state.cartItems[i].amount;
                chooseBool[i] = !totalChooseTrue;
            }
        }
        totalChooseTrue = !totalChooseTrue;
        this.setState({itemChooseBool:chooseBool, totalPrice:price, chooseTotal:totalChooseTrue, chooseNumber:chooseNum});
    };

    onItemChoose = (index) => {
        let price = this.state.totalPrice;
        let chooseBool = this.state.itemChooseBool;
        let chooseNum = this.state.chooseNumber;
        let totalChooseTrue = false;

        if(chooseBool[index]){
            price -= this.state.cartItems[index].book.price * this.state.cartItems[index].amount;
        }
        else{
            price += this.state.cartItems[index].book.price * this.state.cartItems[index].amount;
        }
        chooseBool[index] = !chooseBool[index];
        if(chooseBool[index]) chooseNum += 1; else chooseNum -= 1;
        for(let i = 0; i < chooseBool.length; ++i){
            if(chooseBool[i] === true) totalChooseTrue = true;
        }
        this.setState({itemChooseBool:chooseBool, totalPrice:price, chooseTotal:totalChooseTrue, chooseNumber:chooseNum});
    };

    settle = () => {
        const callback = () => {
            this.setState({
                cartItems:[],
                chooseItems:[],
                itemChooseBool:[],
                chooseNumber: 0,
                chooseTotal:true,
                totalPrice:0,
                modalVisible:false,
                willBeDelete:0
            });
            Toast.showSuccess('购买成功，稍后可在订单中查看');
            DeviceEventEmitter.emit('UPDATE_ORDER');
        };
        AsyncStorage.getItem("userId").then((value) => {
            let userId = parseInt(value);
            addCartToOrder(userId, callback);
        });
    };

    render () {
        if(this.state.cartItems.length === 0){
            return (
                <View style={styles.blankPage}>
                    <Text style={styles.blank}>购物车空空如野哦，快去主页逛逛吧～</Text>
                    <Image source={require('../images/goodwish.jpg')} style={styles.goodWish}/>
                </View>
            )
        }
        let that = this;
        return (
            <View>
                <ScrollView style={styles.scrollList}>
                    {this.state.cartItems.map(function (item, idx) {
                        let book = item.book;
                        let imgUrl = noImage;
                        if(book.image != null){
                            imgUrl = book.image.imageBase64;
                        }
                        return(
                            <View style={styles.grid}>
                            <View style={styles.card}>
                                <TouchableOpacity style={styles.icon} onPress={() => {that.onItemChoose(idx)}}>
                                    {that.state.itemChooseBool[idx] === true ?
                                        <MaterialCommunityIcons name="checkbox-marked-circle" color={'rgb(255, 121, 68)'} size={30} /> :
                                        <MaterialCommunityIcons name="checkbox-blank-circle-outline" color={'rgb(208,208,208)'} size={30} />
                                    }
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>{that.navigateToDetail({item});}}>
                                    <Image
                                        source={{uri: imgUrl}}
                                        style={styles.bookImage}
                                    />
                                </TouchableOpacity>

                                <View style={styles.bookDescribe}>
                                    <View >
                                        <Text numberOfLines={1} style={styles.bookDescribeName}>{book.name}</Text>
                                        <Text numberOfLines={1} style={styles.bookDescribeAuthor}>{book.author}</Text>
                                    </View>
                                    <Text style={styles.bookDescribePrice}>¥{book.price}</Text>
                                </View>
                                <NumberChooserButton index={idx} bookNumber={item.amount} onNumberMinus={that.onNumberMinus} onNumberPlus={that.onNumberPlus}/>
                            </View>
                            </View>
                        )
                    })}
                    <View style={styles.scrollFooter}>
                        <MaterialCommunityIcons name="castle" color={'orange'} size={20} />
                        <Text style={styles.scrollFooterText}>已同步至好物圈</Text>
                    </View>
                </ScrollView>

                <View style={styles.bottomBar}>
                    <View style={styles.bottomBarDescribe}>
                        <TouchableOpacity style={styles.bottomBarIcon} onPress={this.onWholeChoose}>
                            {that.state.chooseTotal === true ?
                                <MaterialCommunityIcons name="checkbox-marked-circle" color={'rgb(255, 121, 68)'} size={30} /> :
                                <MaterialCommunityIcons name="checkbox-blank-circle-outline" color={'rgb(208,208,208)'} size={30} />
                            }
                        </TouchableOpacity>
                        <Text style={styles.bottomBarIconText}>全选</Text>
                        <Text style={styles.bottomBarPriceDescribe}>合计：</Text>
                        <Text style={styles.bottomBarPrice}>¥{this.state.totalPrice}</Text>
                    </View>

                    <TouchableOpacity onPress={this.settle} style={styles.buyButton}>
                        <Text style={styles.buyButtonText}>去结算({this.state.chooseNumber})</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.modelBackground}>
                        <View style={styles.modelWindow}>
                            <View style={styles.windowDescribe}>
                                <Text style={styles.windowDescribeText}>确定将此商品移出购物车？</Text>
                            </View>
                            <View style={styles.windowCheckField}>
                                <TouchableOpacity style={styles.windowCancelButton} onPress={this.deleteCancel}>
                                    <Text style={styles.windowCancelButtonText}>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.windowSubmitButton} onPress={this.deleteSubmit}>
                                    <Text style={styles.windowSubmitButtonText}>确定</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    navigateToDetail({item}){
        this.props.navigation.push("BookDetail",{detail:item.book});
    }
}

const styles = StyleSheet.create({
    scrollList:{
        height:height * 0.73 + 15,
        width:width,
        backgroundColor: 'rgb(238,238,238)'
    },
    grid:{
        backgroundColor:'white',
        borderTopWidth:1,
        borderTopColor:'rgb(208,208,208)'
    },
    card:{
        margin:15,
        flexDirection:'row',
        alignItems:'flex-end',
    },
    icon:{
        height:100,
        justifyContent:'center'
    },
    bookImage: {
        marginLeft:10,
        width: 100,
        height: 100,
    },
    bookDescribe:{
        marginLeft:8,
        height:100,
        width:125,
        justifyContent:'space-between'
    },
    bookDescribeName:{
        marginTop:4,
        fontSize:17,
    },
    bookDescribeAuthor:{
        marginTop:5,
        color:'rgb(125,125,125)'
    },
    bookDescribePrice:{
        color:'rgb(255, 121, 68)',
        fontSize: 22,
        marginBottom:3
    },
    scrollFooter:{
        flexDirection:'row',
        alignSelf:'center',
        marginTop:10,
        height:25,
        alignItems:'center'
    },
    scrollFooterText:{
        marginLeft:4,
        color:'rgb(125,125,125)'
    },
    bottomBar:{
        height: 55,
        width:width,
        backgroundColor:'white',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomBarDescribe:{
        height: 55,
        width: width * 0.5,
        flexDirection:'row',
        alignItems:'center'
    },
    bottomBarIcon:{
        height: 55,
        marginLeft:15,
        marginTop:3,
        justifyContent:'center',
        alignItems:'center'
    },
    bottomBarIconText:{
        fontSize:20,
        marginLeft:5
    },
    bottomBarPriceDescribe:{
        fontSize:20,
        marginLeft:20,
    },
    bottomBarPrice:{
        fontSize:20,
        color:'rgb(255, 121, 68)'
    },
    buyButton:{
        height:55,
        width:width * 0.35,
        backgroundColor:'rgb(255, 121, 68)',
        justifyContent:'center',
        alignItems: 'center'
    },
    buyButtonText:{
        fontSize:20,
        fontWeight:'bold',
        color:'white'
    },
    modelBackground: {
        height: height,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    modelWindow: {
        width: width * 0.8,
        backgroundColor:'white',
        borderRadius:12
    },
    windowDescribe:{
        width: width * 0.8,
        height: height * 0.1,
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'rgb(208,208,208)'
    },
    windowDescribeText:{
        fontSize:20,
    },
    windowCheckField:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    windowCancelButton:{
        height:height * 0.06,
        width:width * 0.4,
        justifyContent:'center',
        alignItems:'center',
        borderRightWidth:1,
        borderRightColor:'rgb(208,208,208)'
    },
    windowCancelButtonText:{
        fontSize:20,
        fontWeight: 'bold'
    },
    windowSubmitButton:{
        height:height * 0.06,
        width:width * 0.4,
        justifyContent:'center',
        alignItems:'center'
    },
    windowSubmitButtonText:{
        fontSize:20,
        fontWeight:'bold',
        color:'rgb(48,76,115)'
    },
    blank:{
        fontSize:20,
        fontWeight:'bold',
        color:'rgb(142,162,255)'
    },
    blankPage:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:30
    },
    goodWish:{
        marginTop:20
    }
});

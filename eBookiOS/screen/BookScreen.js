import React, { Component } from "react";
import {
    Modal,
    Text,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    ScrollView,
    AsyncStorage,
    DeviceEventEmitter,
} from 'react-native';
import { width, height} from '../utility/Dimensions';
import {addOrderItem, deleteCartItem} from '../service/CartService';
import Toast from 'react-native-tiny-toast';
import {noImage} from '../images/noImageBase64';

export class BookScreen extends Component {
    state = {
        modalVisible: false,
        operation: '',
        bookNumber: 1,
        minusDisable: true
    };

    addToCart = () => {
        this.setState({
            modalVisible: true,
            operation: '加入购物车'
        });
    };

    buyNow = () => {
        this.setState({
            modalVisible: true,
            operation: '立即购买'
        });
    };

    //这里用到了页面间的事件发送，写在回调函数中，在加入购物车完成后让之前的购物车页面重新获取数据，并重绘页面
    //是本项目操作复杂性方面最大亮点之一
    //TODO：未区分加入购物车和立即购买两种情况，两入口均以加入购物车处理
    onSubmitOrder = () => {
        const callback = () => {
            Toast.showSuccess('宝贝已添加进购物车');
            DeviceEventEmitter.emit('UPDATE_CART');
        };
        AsyncStorage.getItem("userId").then((value) => {
            let userId = parseInt(value);
            addOrderItem(this.props.route.params.detail.bookId,this.state.bookNumber,userId,callback);
            this.setState({
                modalVisible: false,
                bookNumber: 1,
                minusDisable: true
            });
        });
    };

    onCancelOrder = () => {
        this.setState({
            modalVisible: false,
            bookNumber: 1,
            minusDisable: true
        });
    };

    onNumberPlus = () => {
        let newNumber = this.state.bookNumber + 1;
        if(newNumber > 1) this.setState({minusDisable:false});
        this.setState({bookNumber: newNumber});
    };

    onNumberMinus = () => {
        let newNumber = this.state.bookNumber - 1;
        if(newNumber === 1) this.setState({minusDisable:true});
        this.setState({bookNumber: newNumber});
    };

    render() {
        let detail=this.props.route.params.detail;
        let imgUrl = noImage;
        if(detail.image != null){
            imgUrl = detail.image.imageBase64;
        }
        return (
            <View>
                <ScrollView style={{height:height* 0.8}}>
                    <View style={styles.ImageBackground}>
                        <Image
                            source={{uri: imgUrl}}
                            style={styles.bookImage}
                        />
                    </View>

                    <View style={styles.DescribeBackground}>
                        <Text style={styles.price}>¥ {detail.price}</Text>
                        <Text style={styles.name}>{detail.name}</Text>

                        <View style={styles.cell}>
                            <Text style={styles.title}>作者：</Text>
                            <Text style={styles.context}>{detail.author}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.title}>分类：</Text>
                            <Text style={styles.context}>{detail.type}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.title}>状态：</Text>
                            <Text style={styles.context}>{detail.inventory !== 0 ?
                                <Text>有货<Text style={styles.additional}>   库存：{detail.inventory}</Text></Text> : <Text>无货</Text>}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.title}>作品简介：</Text>
                        </View>
                        <View>
                            <Text style={styles.description}>{detail.description}</Text>
                        </View>
                    </View>
                </ScrollView>


                <View style={styles.buttonGroup}>
                    <TouchableOpacity onPress={this.addToCart}>
                        <View style={styles.button1}>
                            <Image source={require('../images/gouwuche.png')} style={styles.buttonImage}/>
                            <Text style={styles.buttonText}>加入购物车</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.buyNow}>
                        <View style={styles.button2}>
                            <Image source={require('../images/lipin.png')} style={styles.buttonImage}/>
                            <Text style={styles.buttonText}>立即购买</Text>
                        </View>
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
                            <View style={styles.windowTop}>
                                {/*空元素占位符，解决了子元素主轴上对齐方式不同的问题，细节满满*/}
                                <Text style={styles.windowCancelImage}> </Text>
                                <Text style={styles.windowTitle}>{this.state.operation}</Text>
                                <TouchableOpacity
                                    onPress={this.onCancelOrder}
                                >
                                    <Image source={{uri: 'https://yunshang.365jia.cn/assets/images/weixin_product_ico/ico_grep_delete.png'}} style={styles.windowCancelImage}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.windowMainLine}/>
                            <View style={styles.windowProduct}>
                                <Image source={{uri: imgUrl}} style={styles.windowProductImage}/>
                                <Text style={styles.price}>¥ {detail.price}</Text>
                            </View>
                            <View style={styles.windowCommonLine}/>
                            <View style={styles.windowNumber}>
                                <Text style={styles.windowNumberText}>数量：</Text>
                                <View style={styles.windowNumberChooser}>
                                    <TouchableOpacity disabled={this.state.minusDisable} onPress={this.onNumberMinus} style={styles.NumberChooserButtonLeft}>
                                        <Text style={styles.NumberChooserButtonText}>-</Text>
                                    </TouchableOpacity>
                                    <View style={styles.NumberChooserText}>
                                        <Text>{this.state.bookNumber}</Text>
                                    </View>
                                    <TouchableOpacity onPress={this.onNumberPlus} style={styles.NumberChooserButtonRight}>
                                        <Text style={styles.NumberChooserButtonText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={this.onSubmitOrder}
                                style={styles.submitButton}
                            >
                                <Text style={styles.windowSubmitButtonText}>确 定</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ImageBackground:{
        width: width,
        height: width * 0.75,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    bookImage: {
        width: width * 0.75,
        height: width * 0.75,
    },
    DescribeBackground: {
        margin: 30
    },
    price: {
        color: 'red',
        fontSize:30,
        fontWeight:'bold',
        marginBottom: 5
    },
    name: {
        fontSize:30,
        fontWeight:'bold',
        marginBottom: 20
    },
    cell: {
        flexDirection:'row',
        marginBottom: 5,
        alignItems: 'flex-end',
        height:20.5
    },
    title: {
        fontWeight:'bold',
        fontSize:17
    },
    context: {
        fontSize:17
    },
    additional: {
        fontSize:13,
        color: 'rgb(94,94,94)'
    },
    description: {
        fontSize:17
    },
    buttonGroup: {
        height: height * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    button1:{
        width: 170,
        height: 50,
        backgroundColor: 'rgb(255, 172, 77)',
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button2:{
        width: 170,
        height: 50,
        backgroundColor: 'rgb(255, 90, 68)',
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonImage: {
        marginRight: 8,
        width:21,
        height:21
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    modelBackground: {
        height: height,
        justifyContent:'flex-end',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    modelWindow: {
        width: width,
        backgroundColor:'white',
    },
    submitButton: {
        height:80,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgb(255, 121, 68)'
    },
    windowTop: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    windowTitle: {
        fontSize:20,
    },
    windowProduct: {
        margin:20,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    windowProductImage: {
        width: width/4,
        height: width/4
    },
    windowCancelImage: {
        width: 30,
        height: 30
    },
    windowMainLine: {
        width:width,
        height: 1.5,
        backgroundColor: '#39cc6a'
    },
    windowCommonLine: {
        width:width,
        height: 0.5,
        backgroundColor: 'rgb(180,180,180)'
    },
    windowNumber:{
        margin: 15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    windowNumberText:{
        fontSize:20,
        marginLeft:25
    },
    windowNumberChooser:{
        flexDirection:'row',
        alignItems:'center',
        marginRight: 20,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: 'rgb(80,80,80)',
    },
    NumberChooserButtonLeft: {
        width:30,
        height:30,
        backgroundColor:'rgb(238,238,238)',
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        justifyContent:'center',
        alignItems:'center'
    },
    NumberChooserButtonRight: {
        width:30,
        height:30,
        backgroundColor:'rgb(238,238,238)',
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        justifyContent:'center',
        alignItems:'center'
    },
    NumberChooserButtonText: {
        fontSize:16,
    },
    NumberChooserText:{
        width:40,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        borderRightColor:'rgb(99,99,99)',
        borderRightWidth:1,
        borderLeftColor:'rgb(99,99,99)',
        borderLeftWidth:1,
    },
    windowSubmitButtonText: {
        fontSize:30,
        color: 'white',
        fontWeight:'bold',
    }
});

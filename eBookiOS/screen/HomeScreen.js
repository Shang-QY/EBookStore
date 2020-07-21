import * as React from 'react';
import {Text, View, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {MySwiper} from '../component/MySwiper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProfileScreen} from './ProfileScreen';
import {CartScreen} from './CartScreen';
import {width, height} from '../utility/Dimensions';
import {getBooks} from '../service/BookService';
import {noImage} from '../images/noImageBase64';
import {OrderScreen} from './OrderScreen';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Book:[]
        };
    }

    componentDidMount(){
        const callback = (data) => {
            this.setState({Book: data});
        };
        getBooks(callback);
    }

    render() {
        return (
            <ScrollView style={styles.containerStyle}>
                <MySwiper/>

                <View style={styles.carServiceStyle}>
                    <View style={styles.serviceItemStyle}>
                        <Image source={require('../images/tabbar1/new.png')} style={styles.serviceItemImage}/>
                        <Text style={styles.serviceItemText}>新品推荐</Text>
                    </View>
                    <View style={styles.serviceItemStyle}>
                        <Image source={require('../images/tabbar1/hot.png')} style={styles.serviceItemImage}/>
                        <Text style={styles.serviceItemText}>爆款热销</Text>
                    </View>
                    <View style={styles.serviceItemStyle}>
                        <Image source={require('../images/tabbar1/tuan.png')} style={styles.serviceItemImage}/>
                        <Text style={styles.serviceItemText}>团购好物</Text>
                    </View>
                </View>

                {this.renderBookList()}
            </ScrollView>
        );
    }

    renderBookList(){
        return(
            <View style={styles.bookList}>
                {this.state.Book.map(function (item) {
                    let imgUrl = noImage;
                    if(item.image != null){
                        imgUrl = item.image.imageBase64;
                    }
                    return(
                        <TouchableOpacity style={styles.bookCard} onPress={()=>{this.navigateToDetail({item});}}>
                            <View>
                                <Image
                                    source={{uri:imgUrl}}
                                    style={styles.bookImage}
                                />
                                <Text numberOfLines={1} style={styles.bookName}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                },this)}
            </View>
        )
    }

    navigateToDetail({item}){
        this.props.navigation.push("BookDetail",{detail:item});
    }
}

const Tab = createBottomTabNavigator();

export function HomeScreen() {
    return (
        <Tab.Navigator
            initialRouteName="HomePage"
            tabBarOptions={{
                activeTintColor: '#e91e63',
            }}>
            <Tab.Screen
                name="HomePage"
                component={HomePage}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={CartScreen}
                options={{
                    tabBarLabel: 'Cart',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="cart" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Order"
                component={OrderScreen}
                options={{
                    tabBarLabel: 'Order',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="view-list" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    containerStyle:{
        padding: 10,
    },
    carServiceStyle:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    serviceItemStyle:{
        alignItems: 'center'
    },
    serviceItemImage:{
        width:45,
        height:45,
    },
    serviceItemText:{
        marginTop: 11,
        fontSize:12,
        color:'rgba(51,51,51,1.0)',
    },
    bookList:{
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-around',
        flexWrap:'wrap'
    },
    bookCard:{
        width: width/4 + 10,
        height: width/3,
        margin: 8,
        borderRadius:10,
        backgroundColor:'#ffffff',
        alignItems: 'center'
    },
    bookImage: {
        marginTop: 5,
        width: width/4,
        height: width/4
    },
    bookName:{
        marginTop: 5,
        color: 'rgb(94,94,94)',
        fontSize: 13,
        textAlign:'center'
    }
});

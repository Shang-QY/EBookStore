import {Button, Text, View, AsyncStorage, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {noImage} from '../images/noImageBase64';


export class OrderItem extends React.Component{

    render() {
        let book = this.props.info.book;
        let imgUrl = noImage;
        if(book.image != null){
            imgUrl = book.image.imageBase64;
        }
        return (
            <View style={styles.grid}>
                <View style={styles.card}>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.push("BookDetail",{detail:book});
                    }}>
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
                        <View style={styles.bookDescribe2}>
                            <Text style={styles.bookDescribePrice}>¥{book.price}</Text>
                            <Text> x {this.props.info.amount}</Text>
                        </View>
                    </View>

                    <Text style={styles.bookDescribePrice2}>¥{book.price * this.props.info.amount}</Text>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    grid:{
        backgroundColor:'white',
        borderTopWidth:1,
        borderTopColor:'rgb(208,208,208)',
        borderRadius:30,
    },
    card:{
        margin:15,
        flexDirection:'row',
        alignItems:'flex-end',
    },
    bookImage: {
        marginLeft:10,
        width: 100,
        height: 100,
    },
    bookDescribe:{
        marginLeft:10,
        height:100,
        width:140,
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
        fontSize: 20,
        marginBottom:3
    },
    bookDescribe2:{
        flexDirection:'row',
        alignItems:'center',
    },
    bookDescribePrice2:{
        marginLeft:23,
        color:'rgb(255, 121, 68)',
        fontSize: 22,
        marginBottom:3
    }
});

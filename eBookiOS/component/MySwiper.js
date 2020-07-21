import {Button, Text, View, AsyncStorage, StyleSheet, Image} from 'react-native';
import React from 'react';
import {width} from '../utility/Dimensions';
import Swiper from 'react-native-swiper';

export class MySwiper extends React.Component {

    render() {
        return (
            <Swiper
                style={styles.swiperStyle}
                removeClippedSubviews={false}
                autoplayTimeout={3}
                autoplay={true}
                horizontal={true}
                paginationStyle={styles.pagStyle}
                dot={<View style={[styles.dotStyle,styles.dotCommonStyle]}/>}
                activeDot={<View style={[styles.activeDotStyle,styles.dotCommonStyle]} />}
            >
                <Image source={require('../images/carousel/book1.jpg')} style={styles.bannerStyle}/>
                <Image source={require('../images/carousel/book2.jpg')} style={styles.bannerStyle}/>
                <Image source={require('../images/carousel/book3.jpg')} style={styles.bannerStyle}/>
                <Image source={require('../images/carousel/book4.jpg')} style={styles.bannerStyle}/>
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    swiperStyle:{
        height:165,
    },
    bannerStyle:{
        resizeMode:'contain',
        height:165,
        width:width - 20,
        borderRadius: 20,
    },
    pagStyle:{
        height:1
    },
    dotStyle:{
        width:8,
        backgroundColor:'white',
    },
    activeDotStyle:{
        width:16,
        backgroundColor: '#fdd000',
    },
    dotCommonStyle:{
        borderRadius: 8,
        marginLeft:5,
        height:8,
    },
});

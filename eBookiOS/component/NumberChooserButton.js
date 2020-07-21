import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export class NumberChooserButton extends React.Component{

    constructor() {
        super();
        this.state = {
            minusDisable: false
        }
    }

    componentDidMount(){
        if(this.props.bookNumber === 1){
            this.setState({minusDisable: true})
        }
        else{
            this.setState({minusDisable: false})
        }
    }

    onNumberPlus = () => {
        this.props.onNumberPlus(this.props.index)
    };

    onNumberMinus = () => {
        this.props.onNumberMinus(this.props.index)
    };

    render() {
        return(
            <View style={styles.windowNumberChooser}>
                <TouchableOpacity onPress={this.onNumberMinus} style={styles.NumberChooserButtonLeft}>
                    <Text style={styles.NumberChooserButtonText}>-</Text>
                </TouchableOpacity>
                <View style={styles.NumberChooserText}>
                    <Text>{this.props.bookNumber}</Text>
                </View>
                <TouchableOpacity onPress={this.onNumberPlus} style={styles.NumberChooserButtonRight}>
                    <Text style={styles.NumberChooserButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    windowNumberChooser: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: 'rgb(80,80,80)',
    },
    NumberChooserButtonLeft: {
        width: 30,
        height: 30,
        backgroundColor: 'rgb(238,238,238)',
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    NumberChooserButtonRight: {
        width: 30,
        height: 30,
        backgroundColor: 'rgb(238,238,238)',
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    NumberChooserButtonText: {
        fontSize: 16,
    },
    NumberChooserText: {
        width: 40,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: 'rgb(99,99,99)',
        borderRightWidth: 1,
        borderLeftColor: 'rgb(99,99,99)',
        borderLeftWidth: 1,
    },
});

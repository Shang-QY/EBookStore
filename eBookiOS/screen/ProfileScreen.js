import {AsyncStorage, Modal, Text, View, Image, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import React from 'react';
import {height, width} from '../utility/Dimensions';
import {SignOutButton} from '../component/SignOutButton';
import {changeIcon, showIcons} from '../service/UserService';

export class ProfileScreen extends React.Component{

    constructor() {
        super();
        this.state = {
            userInfo:null,
            icons:[],
            modalVisible: false,
            chooseIconId: 0,
        }
    }

    componentDidMount(){
        AsyncStorage.getItem("userInfo").then((value) => {
            let user = JSON.parse(value);
            this.setState({userInfo:user});
        });
    }

    showIcons = () => {
        const callback = (data) => {
            this.setState({icons:data, modalVisible:true});
        };
        showIcons(callback);
    };

    changeIcon = () => {
        const callback = (data) => {
            AsyncStorage.setItem("userInfo", JSON.stringify(data)).then(
                () => {this.setState({userInfo:data})}
            )
        };
        changeIcon(this.state.userInfo.userId, this.state.chooseIconId, callback);
    };

    render() {
        if(this.state.userInfo === null) return <View/>;
        let imgUrl = null;
        if(this.state.userInfo.icon != null){
            imgUrl = this.state.userInfo.icon.iconBase64;
        }
        let that = this;
        return (
            <View style={styles.page}>
                <Image source={{uri:imgUrl}} style={{width:50,height:50}}/>
                <Text>{this.state.userInfo.username}</Text>
                <SignOutButton/>
                <TouchableOpacity onPress={this.showIcons}>
                    <Text>press me and show icons!</Text>
                </TouchableOpacity>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.modal}>
                        <Text>Choose your icon here!</Text>
                        <View style={styles.pictureField}>
                            {this.state.icons.map(function (item,idx) {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        that.setState({chooseIconId:idx+1});
                                    }}>
                                        <Image source={{uri:item.iconBase64}} style={{width:50,height:50}}/>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        <View style={styles.buttonBar}>
                            <TouchableOpacity onPress={() => {this.setState({modalVisible:false})}}>
                                <Text>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.changeIcon}>
                                <Text>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page:{
        alignItems:'center'
    },
    modal:{
        height:height * 0.3,
        width: 300,
        marginTop:300,
        alignSelf:'center',
        alignItems: 'center'
    },
    pictureField:{
        flexDirection:'row',
        flexWrap:'wrap',
    },
    buttonBar:{
        width: 300,
        flexDirection: 'row',
        justifyContent:'space-between'
    }
});

import {Button, TextInput, View, StyleSheet, Text, TouchableOpacity, ImageBackground, Alert, AsyncStorage} from 'react-native';
import {AuthContext} from '../utility/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {width, height} from '../utility/Dimensions';
import {login} from '../service/UserService';


function SignUp(navigation) {
    navigation.push("SignUp");
}

function SignIn(username, password, signIn) {
    if(username === '' || password === ''){
        Alert.alert("用户名或密码不能为空");
        return;
    }
    let data = {"username":username,"password":password};
    const callback = (data) => {
        if(data.userType !== -1){
            let uid = data.userId.toString();
            let userInfo = JSON.stringify(data);
            AsyncStorage.setItem("userInfo", userInfo).then(() => {});
            AsyncStorage.setItem("userId", uid).then(() => {signIn();});
        }
        else{
            Alert.alert("用户名或秘密错误！");
        }
    };
    login(data, callback);
}

export function SignInScreen({navigation}){
    const [username, setUserName] = React.useState('');
    const [password,setPassword]=React.useState('');

    const { signIn } = React.useContext(AuthContext);
    return (
        <ImageBackground style={styles.backgroundImage} source={require('../images/signIn.jpg')}>
            <View style={styles.page}>
                <Text style={styles.title}>欢迎来到电子书城</Text>
                <View style={styles.form}>
                    <View style={styles.cell}>
                        <MaterialCommunityIcons name="account-circle" size={22} />
                        <Text style={styles.cellText}>用户名：</Text>
                        <TextInput
                            placeholder="Username"
                            value={username}
                            onChangeText={(text) => setUserName(text)}
                            style={styles.cellInput}
                        />
                    </View>
                    <View style={styles.cell}>
                        <MaterialCommunityIcons name="lock" size={22} />
                        <Text style={styles.cellText}>密码：</Text>
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            style={styles.cellInput}
                            secureTextEntry
                        />
                    </View>
                </View>
                <View style={styles.buttonGroup}>
                    <Button title="立即注册" onPress={() => {SignUp(navigation)}} />
                    <Button title="忘记密码" onPress={() => {signIn()}} />
                </View>
                <TouchableOpacity style={styles.mainButton} onPress={() => {SignIn(username,password,signIn)}}>
                    <Text style={styles.mainButtonText}>登录</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage:{
        flex:1,
        alignItems:'center'
    },
    page:{
        marginTop: 200,
        height: height * 0.35,
        width: width * 0.8,
        alignItems:'center',
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 40
    },
    title:{
        marginTop:40,
        fontSize:30,
        fontWeight:'bold',
    },
    form:{
        marginTop:30,
        alignItems: 'center',
        width: width * 0.7,
    },
    cell:{
        marginTop: 10,
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'rgba(0,0,0,0.85)'
    },
    cellText:{
        fontSize: 20,
        width: width * 0.2,
    },
    cellInput:{
        width: width * 0.4
    },
    mainButton:{
        height: 60,
        width: width * 0.65,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue'
    },
    mainButtonText:{
        fontSize:30,
        fontWeight: 'bold',
        color:'white'
    },
    buttonGroup:{
        marginTop:20,
        width: width * 0.65,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

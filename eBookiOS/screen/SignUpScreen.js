import {
    Button,
    TextInput,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ImageBackground,
    Alert,
    AsyncStorage,
} from 'react-native';
import {AuthContext} from '../utility/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {width, height} from '../utility/Dimensions';
import {signUp} from '../service/UserService';


function SignUp(data, signIn) {
    const callback = (data) => {
        if(data != null){
            let uid = data.userId.toString();
            AsyncStorage.setItem("userId", uid).then(() => {signIn();});
        }
        else{
            Alert.alert("用户名或秘密错误！");
        }
    };
    signUp(data, callback);
}

export function SignUpScreen(){
    const [username, setUserName] = React.useState('');
    const [password,setPassword]=React.useState('');
    const [tel, setTel] = React.useState('');
    const [name, setName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [email, setEmail] = React.useState('');


    const { signIn } = React.useContext(AuthContext);
    return (
        <ImageBackground style={styles.backgroundImage} source={require('../images/signIn.jpg')}>
            <View style={styles.page}>
                <Text style={styles.title}>即刻加入我们！</Text>
                <View style={styles.form}>
                    <View style={styles.cell}>
                        <MaterialCommunityIcons name="account-circle" size={16} />
                        <Text style={styles.cellText}>用户名：</Text>
                        <TextInput
                            placeholder="Username"
                            value={username}
                            onChangeText={(text) => setUserName(text)}
                            style={styles.cellInput}
                        />
                    </View>
                    <View style={styles.cell}>
                        <MaterialCommunityIcons name="lock" size={16} />
                        <Text style={styles.cellText}>密码：</Text>
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            style={styles.cellInput}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.cell}>
                        <MaterialCommunityIcons name="account-circle" size={16} />
                        <Text style={styles.cellText}>姓名：</Text>
                        <TextInput
                            placeholder="Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={styles.cellInput}
                        />
                    </View>
                    <View style={styles.cell}>
                        <MaterialCommunityIcons name="account-circle" size={16} />
                        <Text style={styles.cellText}>电话：</Text>
                        <TextInput
                            placeholder="Tel"
                            value={tel}
                            onChangeText={(text) => setTel(text)}
                            style={styles.cellInput}
                        />
                    </View>
                    <View style={styles.cell}>
                        <MaterialCommunityIcons name="account-circle" size={16} />
                        <Text style={styles.cellText}>邮箱：</Text>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={styles.cellInput}
                        />
                    </View>
                    <View style={styles.cell}>
                        <MaterialCommunityIcons name="account-circle" size={16} />
                        <Text style={styles.cellText}>住址：</Text>
                        <TextInput
                            placeholder="Address"
                            value={address}
                            onChangeText={(text) => setAddress(text)}
                            style={styles.cellInput}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.mainButton} onPress={() => {
                    if(username === '' || password === '' || name === '' || tel === '' || email === '' || address === ''){
                        Alert.alert("信息不能为空！");
                        return;
                    }
                    let data = {
                        "username":username,
                        "password":password,
                        "name":name,
                        "tel":tel,
                        "email":email,
                        "address":address
                    };
                    SignUp(data,signIn)}
                }>
                    <Text style={styles.mainButtonText}>注册</Text>
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
        height: height * 0.5,
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
        marginTop: 20,
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'rgba(0,0,0,0.85)'
    },
    cellText:{
        fontSize: 15,
        width: width * 0.2,
    },
    cellInput:{
        width: width * 0.4
    },
    mainButton:{
        marginTop:30,
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

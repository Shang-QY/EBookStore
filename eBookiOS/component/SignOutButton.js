import {AuthContext} from '../utility/AuthContext';
import {Button, Text, View, AsyncStorage} from 'react-native';
import React from 'react';

export function SignOutButton() {

    const { signOut } = React.useContext(AuthContext);

    return (
        <View>
            <Button title="Sign out" onPress={() => {AsyncStorage.clear();signOut()}} />
        </View>
    );
}

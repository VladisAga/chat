import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { IUser } from './IUser';
import { changeCurrent } from '../../redux/users';

interface IUserProps {
    user: IUser;
    selectedUserId: any;
    setSelectedUserId: React.Dispatch<React.SetStateAction<any>>;
}

export const User: React.FC<IUserProps> = ({ user, selectedUserId, setSelectedUserId }) => {
    const dispatch = useDispatch();

    return (
        <TouchableOpacity
            style={[styles.user, { backgroundColor: selectedUserId === user.id ? 'lightgrey' : 'transparent' }]}
            onPress={() => {
                dispatch(changeCurrent(user.id));
                setSelectedUserId(user.id);
            }}
        >
            <View>
                <Image
                    style={styles.avatar}
                    source={{ uri: user?.avatar }}
                />
                <Text style={styles.text}>
                    {user.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    user: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderColor: 'lightgrey',
        borderBottomWidth: 1,
    },
    userHover: {
        backgroundColor: 'lightgrey',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 16,
    },
});

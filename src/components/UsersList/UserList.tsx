import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useStoreDispatch } from '../../redux/store';
import { View, FlatList, StyleSheet } from 'react-native';
import { User } from '../User/User';
import { getUsers } from '../../redux/users';

interface IUserListProps {
    className?: string;
}

export const UsersList: FC<IUserListProps> = ({ className }) => {
    const users = useSelector((state: RootState) => state.users.list);

    const dispatch = useStoreDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const [selectedUserId, setSelectedUserId] = useState(null);

    return (
        <View style={styles.userList}>
            <FlatList
                data={users}
                keyExtractor={(user) => user.id.toString()}
                renderItem={({ item }) => (
                    <User
                        user={item}
                        selectedUserId={selectedUserId}
                        setSelectedUserId={setSelectedUserId}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    userList: {
        backgroundColor: 'white',
        flex: 1, // Занимает всю доступную вертикальную высоту
        padding: 0,
        margin: 0,
        borderRightWidth: 1,
        borderColor: 'lightgray',
    },
});



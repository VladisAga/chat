import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@react-navigation/native';
import { RootState } from '../../redux/store';
import { chatCreation } from '../../redux/chats';
import { createChatByName } from '../../redux/posts';
import { IChat } from './IChat';
import { View, Button, TextInput, FlatList, Text } from 'react-native';
import { initialState } from '../../redux/posts';

export const Chat: FC = () => {
    const [obj, setObj] = useState(initialState);
    const [textValue, setTextValue] = useState('');
    const dispatch = useDispatch<any>();
    const currentUser = useSelector((state: RootState) => state.users.current);
    const chatList = useSelector((state: RootState) => state.chats.chatList);
    const [chat, setChat] = useState<IChat[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8001/chats`, {
            method: 'GET',
            headers: {
                'X-API-KEY': '8c8e1a50-6322-4135-8875-5d40a5420d86',
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => setChat(json))
    }, [chatList]);

    useEffect(() => {
        fetch(`http://localhost:8001/posts`, {
            method: 'GET',
            headers: {
                'X-API-KEY': '8c8e1a50-6322-4135-8875-5d40a5420d86',
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => setObj(json))
    }, [initialState]);

    return (
        <>
            <View>
                <Link to='PostsList'><Text>Домой</Text></Link>
                <TextInput
                    value={textValue}
                    onChangeText={(text) => setTextValue(text)}
                    placeholder=""
                />
                <Button
                    title="Создать чат"
                    onPress={() => {
                        if (textValue) {
                            dispatch(
                                chatCreation({
                                    chatName: textValue,
                                    authorId: currentUser.id,
                                    linkOnChat: 'http://localhost:8001/posts',
                                })
                            );
                            dispatch(
                                createChatByName({
                                    ...obj,
                                    [textValue]: [],
                                })
                            );

                            setTextValue('');
                        }
                    }}
                />
                <FlatList
                    data={chat}
                    keyExtractor={(chat, index) => index.toString()}
                    renderItem={({ item }) => <Text>{item.chatName}</Text>}
                />
            </View>
        </>
    );
}

import { FC, useState } from 'react';
import { Link } from '@react-navigation/native';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { StyleSheet } from 'react-native';
//import styles from './AddPost.module.css';
import { RootState } from '../../redux/store';
//import SendIcon from './assets/send.svg';
import { sendPost } from '../../redux/posts';
import { initialState } from '../../redux/posts';
import { fetchPosts } from '../../redux/posts';

interface IAddPostProps {
    className?: string;
}

export const AddPost: FC<IAddPostProps> = () => {
    const [text, textChange] = useState<string>('');
    const dispatch = useDispatch<any>();

    const styles = StyleSheet.create({
        addPost: {
            display: 'flex',
            height: 40,
            padding: 10,
            alignItems: 'center',
        },
        form: {
            display: 'flex',
            flexGrow: 1,
        },
        input: {
            
            borderWidth: 0,
            flexGrow: 1,
            marginHorizontal: 10,
        },
        avatar: {
            width: 30,
            height: 30,
            borderRadius: 15, // Радиус должен быть половиной ширины и высоты для круглой формы
            backgroundColor: 'white',
        },
        sendButton: {
            width: 50,
            height: 50,
            backgroundColor: 'transparent',
            borderWidth: 0,
        },
    });

    const currentUser = useSelector((state: RootState) => state.users.current);

    const handleSendPost = async () => {
        try {
            const response = await dispatch(fetchPosts());
            const receivedData = response.payload;
            console.log(receivedData); // Received data here
        } catch (error) {
            console.error('An error occurred:', error);
        }

        const postData = {
            id: 1,
            date: new Date().toISOString(),
            authorId: currentUser.id,
            text,
        };

        dispatch(
            sendPost({
                postData,
                key: 'чат', // Replace with the necessary key
                dataArray: {}, // Replace with the necessary key
            })
        );

        textChange('');
    };

    return (
        <View style={styles.addPost}>
            <Link to='Chat'><Text>ссылка</Text></Link>
            <Image
                style={styles.avatar}
                source={{ uri: currentUser.avatar }}
            />
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={(value) => textChange(value)}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendPost}>
                    <Image source={require('../../image/free-icon-arrow-6909659.png')} accessibilityLabel="SendIcon" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

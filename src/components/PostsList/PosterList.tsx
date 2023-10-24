import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { IPost } from '../Post/IPost';
import { Post } from '../Post/Post';
import { AddPost } from '../AddPost/AddPost';

interface IPostsListProps {
    className?: string;
}

export const PostsList: FC<IPostsListProps> = () => {
    const posts = useSelector((state: RootState) => state.posts.mainObj.dfgnfgfn);
    const [message, setMessage] = useState<IPost[]>([]);

    useEffect(() => {
        fetch('http://localhost:8001/posts', {
            method: 'GET',
            headers: {
                'X-API-KEY': '8c8e1a50-6322-4135-8875-5d40a5420d86',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => setMessage(data)) // Установите данные в состояние
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    return (
        <View style={styles.postsList}>
            <FlatList
                data={message}
                keyExtractor={(post) => post.id.toString()}
                renderItem={({ item }) => <Post post={item} />}
                ListHeaderComponent={<AddPost />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    postsList: {
        backgroundColor: 'cadetblue',
        flexDirection: 'column',
        flex: 1, // Занимает всю доступную высоту
        padding: 0,
        margin: 0,
    },
});

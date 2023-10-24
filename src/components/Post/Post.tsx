import { FC } from 'react'
import classnames from 'classnames'
import { Image, View, Text } from 'react-native'
import { IPost } from './IPost';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { StyleSheet } from 'react-native';

interface IPostProps {
    post: IPost
}

export const Post = ({ post }: IPostProps) => {

    const styles = StyleSheet.create({
        postContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginVertical: 10,
        },
        text: {
            backgroundColor: 'white',
            borderRadius: 15,
            padding: 10,
            flex: 1,
        },
        image: {
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: 'white',
        },
        currentUsersPost: {
            flexDirection: 'row-reverse', // Для перевернутого порядка элементов
        },
        currentUsersPostText: {
            backgroundColor: 'lightgreen',
        },
    });

    const users = useSelector((state: RootState) => state.users.list);
    const currentUser = useSelector((state: RootState) => state.users.current);
    const user = users.find(({ id }) => id === post.authorId);

    return (
        <View style={styles.postContainer}>
            <Image
                style={styles.image}
                source={{ uri: user?.avatar }}
            />
            <Text style={[styles.text, post.authorId === currentUser.id && styles.currentUsersPostText]}>
                {post.text}
            </Text>
        </View>
    );
}

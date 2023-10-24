import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createChatApi, getChatsFromServer } from '../api/chats';
import { IChat } from '../components/Chat/IChat';

interface IChatState {
    chatList: Array<IChat>
}

const initialState: IChatState = {
    chatList: [],
};

export const chatCreation = createAsyncThunk( // Изменено имя действия на sendPost
    'createChat', // Изменено имя действия
    async (postData: IChat) => {
        const response = await createChatApi(postData); // Вызываем API-метод для отправки данных
        return await response.json();
    }
);

export const fetchChats = createAsyncThunk<IChat[], void>(
    'fetchChats',
    async () => {
        const response = await getChatsFromServer();
        const data = await response.json();
        console.log('Data received from the server:', data); // Выводим данные в консоль
        return data;
    }
);

const counterSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        createChat: (state, action) => {
            state.chatList.push(
                {
                    chatName: 'ver',
                    authorId: 1,
                    linkOnChat: 'aca'
                }
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(chatCreation.fulfilled, (state, action) => {
            state.chatList.push(action.payload); // Добавляем отправленный пост в список
        });
        builder.addCase(fetchChats.fulfilled, (state, action) => {
            state.chatList = action.payload;
        });
    },
});

export const { createChat } = counterSlice.actions;
export default counterSlice.reducer;
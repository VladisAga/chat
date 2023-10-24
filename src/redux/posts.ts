import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendPostApi, getPostsFromServer } from '../api/posts';
import { sendChatByName } from '../api/chats';
import { IPost } from '../components/Post/IPost';


interface IPostState {
  mainObj: any;
}

export const initialState: IPostState = {
  mainObj: {},
};

interface SendPostArgs {
  postData: IPost; // Замените IPost на ваш тип данных postData
  key: string;
  dataArray: { [key: string]: any };
}


export const sendPost = createAsyncThunk(
  'sendPost',
  async ({ postData, key, dataArray }: SendPostArgs, thunkAPI,) => {
    try {
      const response = await sendPostApi(postData, key, dataArray);
      return response;
    } catch (error) {
      console.error("Error:", error); // Вывести ошибку в консоль для отладки
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const createChatByName = createAsyncThunk(
  'createChatByName',
  async (chatByName: {}) => {
    const response = await sendChatByName(chatByName);
    return await response.json();
  }
);

export const fetchPosts = createAsyncThunk<IPost[], void>(
  'fetchPosts',
  async () => {
    const response = await getPostsFromServer();
    const data = await response;
    console.log('Data received from the server:', data);
    return data;
  }
);


const counterSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
    },
  },
  extraReducers: (builder) => {

    builder.addCase(sendPost.fulfilled, (state, action) => {
      /* if (action.payload.key) {
         state.mainObj.data.push(action.payload.data);
       }*/

      //  console.log(state.mainObj)
      //    console.log(action.payload.key); // Добавляем отправленный пост в список
    });
    builder.addCase(fetchPosts.fulfilled, (state, action: any) => {
      //console.log(action.payload[0].dbvsd.push(action.payload[2]));
      //console.log(state)
      //const newState = { ...state.mainObj, ...action.payload };
      // const newState =  action.payload;
      // Обновите state с данными из action.payload
      // Например, сохраните данные в state.mainObj
      //state.mainObj = newState;
      //console.log('Обновленный mainObj:', state.mainObj);
    });

  },
});

console.log(initialState);


export const { addPost } = counterSlice.actions;
export default counterSlice.reducer;

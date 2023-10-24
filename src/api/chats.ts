import { IChat } from "../components/Chat/IChat";

export const createChatApi = async (postData: IChat) => {
    return await fetch('http://localhost:8001/chats', {
        method: 'POST', // Вы указываете метод POST для отправки данных на сервер
        headers: {
            'Content-Type': 'application/json', // Указываете заголовок для данных JSON
        },
        body: JSON.stringify(postData), // Преобразуете данные в формат JSON и отправляете на сервер
    });
};

export const getChatsFromServer = async () => {
    try {
        const response = await fetch('http://localhost:8001/chats');
        if (!response.ok) {
            console.log('error');
            throw new Error('Failed to fetch posts.');  
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const sendChatByName = async (postData: any) => {
    return await fetch('http://localhost:8001/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Полученные данные:', data);
            // Здесь вы можете выполнить другие действия с данными
            return data;
        });
};
import { IPost } from "../components/Post/IPost";

export const sendPostApi = async (postData: IPost, key: string, dataArray: any) => {
    const dataToSend = {
        [key]: postData,
    };

    // Отправляем данные на сервер
    const response = await fetch('http://localhost:8001/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
        throw new Error('Failed to send the post data.');
    }

    const result = await response.json();

    // Добавляем полученные данные в соответствующий массив
    if (dataArray[key] && Array.isArray(dataArray[key])) {
        dataArray[key].push(result[key]);
    } else {
        console.log(`Ключ "${key}" не найден в полученных данных. Данные не добавлены.`);
    }

    return { data: result, key };
};




export const getPostsFromServer = async () => {
    try {
        const response = await fetch('http://localhost:8001/posts', {
            method: 'GET',
            headers: {
                'X-API-KEY': '8c8e1a50-6322-4135-8875-5d40a5420d86',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            console.log('error');
            throw new Error('Failed to fetch posts.');
        }

        return response.json().then((data) => {
            console.log(data); // Обработка данных
            return data; // Возврат данных
        });
    } catch (error) {
        throw error;
    }
};


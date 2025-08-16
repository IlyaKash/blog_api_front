import axios from 'axios';

const API_URL= 'http://localhost:8000';

export const registr=async (username, email, password ) =>{
    try {
        const response= await axios.post(
            `${API_URL}/authentication/registr`,
            `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'accept': 'application/json'
                }
            }
        );
        return response.data
    } catch (error) {
        console.error("Ошибка авторизации:", {
            status: error.response?.status,
            data: error.response?.data,
            config: error.response?.config
        });
        throw error;
    }
}

export const login = async (username, password) => {
    try {
        const response = await axios.post(
            `${API_URL}/authentication/login`,
            `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'accept': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка авторизации:", {
            status: error.response?.status,
            data: error.response?.data,
            config: error.response?.config
        });
        throw error;
    }
};

export const getMe= async(token) => {
    const response = await axios.get(`${API_URL}/user/me`, {
        headers: {Authorization: `Bearer ${token}` }
    });
    return response.data;
}

export const getMyArticles=async (token) => {
    const response = await axios.get(`${API_URL}/article/my_articles`, {
    headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const createArticle = async (content, token) => {
    await axios.post(`${API_URL}/article/create_article`, 
        { content },  // Исправлено: передаем объект с полем content
        {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json' 
            }
        }
    );
};
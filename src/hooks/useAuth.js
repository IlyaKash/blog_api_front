import { useState, useEffect, useCallback } from "react";
import { login, getMe, getMyArticles } from '../api/api';

const useAuth = () => {
    const [user, setUser] = useState(null);//данные пользователя
    const [articles, setArticles] = useState([]);//список статей пользователя
    const [token, setToken] = useState(localStorage.getItem('token'));//токен инициализурется из локал сторедж
    
    const [loading, setLoading] = useState(false);//флаг загрузки

    const loadUserData = useCallback(async (token) => {
        setLoading(true);
        try {
            //загрузка пользователя и его статей
            const [userData, userArticles] = await Promise.all([
                getMe(token),
                getMyArticles(token)
            ]);
            setUser(userData);
            setArticles(userArticles);
            return true;
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
            logout();
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const signUp = async (username, email, password) => {
        try {
            setLoading(true);
            const data = await registr(username, email, password);
            

        } catch (error){
            console.error("Ошибка входа:", error);
            return false;
        }
    };

    const signIn = async (username, password) => {
        try {
            setLoading(true);
            const data = await login(username, password);//запрос на вход
            
            //сохраняем токен
            localStorage.setItem('token', data.access_token);
            setToken(data.access_token);

            //загрузка данных пользователя
            const loaded = await loadUserData(data.access_token);
            return loaded;
        } catch (error) {
            console.error("Ошибка входа:", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');//удаялем токен
        setToken(null);//сбрасываем состояние
        setUser(null);//очищаем данные пользователя
        setArticles([]);//очищаем статьи
    };

    useEffect(() => {
        if (token && !user) {//если есть токен, но нет данных загружаем их
            loadUserData(token);
        }
    }, [token, user, loadUserData]);//зависимости

    return {
        user,
        articles,
        loading,
        token,
        signIn,
        logout,
        isAuthenticated: !!user
    };
};

export default useAuth;
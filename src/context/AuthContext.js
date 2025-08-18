import { createContext, useContext, useEffect, useState } from "react";
import {login as apiLogin, register as apiRegister, getMe, getMyArticles} from '../api/api';

const AuthContext=createContext();

export const AuthProvider=({children}) => {
    const [user, setUser] =useState(null);
    const [loading, setLoading] =useState(true);
    const [error, setError] = useState(null);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const loadUser = async () => {
            //получаем токен из localStorage
            const token=localStorage.getItem('token');

            
            //если есть токен
            if (token){
                try {
                    const [userData, userArticles] = await Promise.all([
                    //проверяем его валидность через запрос к API
                        await getMe(token), await getMyArticles(token)
                    ]);
                    //если запрос успешен сохраняем данные пользователя
                    setUser(userData);
                    setArticles(userArticles);
                } catch (error) {
                    //если токен невалиден - очищаем хранилище
                    localStorage.removeItem('token');
                }
            }

            //завершаем загрузку
            setLoading(false);
        };
        //запускаем процесс
        loadUser();

    }, []);

    //функция входа
    const login = async (username, password) => {
        try{
            setLoading(true);
            const token = await apiLogin(username, password);//получаем токен при входе
            localStorage.setItem('token', token);//загружаем в localStore
            // Загружаем данные пользователя и статьи параллельно
            const [userData, userArticles] = await Promise.all([
                getMe(token),
                getMyArticles(token)
            ]);
            setUser(userData);
            setArticles(userArticles);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка входа')
            return false;
        } finally{
            setLoading(false);
        }
    };

    //функция выхода
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setArticles([]); // Очищаем статьи при выходе
        setError(null); // Очищаем ошибки
    };

    //функция регистрации
    const register = async (username,email, password) => {
        try {
            setLoading(true);
            const data = await apiRegister(username, email, password);

            const isSuccess = data.message= "User created successfully" || 
                            (Array.isArray(data) && data.includes("User created successfully"));
            
            if (isSuccess) {
                // Автоматический вход после регистрации
                const loginSuccess=await login(username, password);

                if (!loginSuccess) {
                    console.error('Автоматический вход после регистрации ну удался');
                    return false;
                }
                return true;
            }
            return false;
        } catch (error) {
            console.error("Ошибка регистрации", error.response?.data || error.message);

            const errorMessage=error.response?.data?.detail ||
                                (Array.isArray(error.response?.data) ? error.response?.data.join(', ') : 
                            'Ошибка регистрации')
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    //значения контектста
    const value = {
        user,
        articles,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
};

//хук для удобного использования
export const useAuth = () => {
    return useContext(AuthContext);
};
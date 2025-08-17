import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";


export const Register = () =>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');

    const [error, setError] = useState('');

    const {signUp} = useAuth();

    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const success = await signUp(username, email, password);
            if (success) {
                navigate('/', { replace: true });
            } else {
                setError('Не удалось завершить регистрацию');
            }
        } catch (err) {
            const errorMsg = err.message.includes('already exists') 
                ? 'Пользователь уже существует' 
                : err.message.includes('validation')
                ? 'Некорректные данные'
                : 'Ошибка при регистрации';
            
            setError(errorMsg);
            console.error("Registration error:", err);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}> 
            <Typography>Регестрация</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Имя пользователя"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="E-mail"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Пароль"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Зарегестрироваться
                </Button>
                <Button variant='contained' fullWidth sx={{mt:2}} onClick={() => navigate('/login')}>
                    Войти
                </Button>
            </form>
        </Box>
    );

};
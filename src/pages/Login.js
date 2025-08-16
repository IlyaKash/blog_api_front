import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { TextField, Button, Box, Typography } from '@mui/material';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const success = await signIn(username, password);
            if (success) {
                navigate('/', { replace: true }); // Добавьте replace: true
            } else {
                setError('Неверное имя пользователя или пароль');
            }
        } catch (err) {
            setError('Ошибка при входе в систему');
            console.error("Login error:", err);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Вход</Typography>
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
                    label="Пароль"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Войти
                </Button>
            </form>
        </Box>
    );
};
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


export const Register = () =>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');
    const { register, error: authError, loading } = useAuth();
    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const success = await register(username, email, password);
            if (success) {
                navigate('/');
            }
        } catch (err) {
            console.error("Registration error:", err);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}> 
            <Typography>Регестрация</Typography>
            {authError && <Typography color="error">{authError}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Имя пользователя"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                />
                <TextField
                    label="E-mail"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />
                <TextField
                    label="Пароль"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={loading}>
                    Зарегестрироваться
                </Button>
                <Button variant='contained' fullWidth sx={{mt:2}} onClick={() => navigate('/login')} disabled={loading}>
                    Войти
                </Button>
            </form>
        </Box>
    );

};
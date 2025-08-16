import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CardActions,
  Grid,
  Avatar,
  Divider,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, articles, loading, logout, token } = useAuth();//получаем данные из хука аутентификации
  const navigate = useNavigate();

  // Если нет пользователя и загрузка завершена - перенаправляем на логин
    useEffect(() => {
    // Редиректим только если загрузка ЗАВЕРШЕНА и пользователя нет
        if (!loading && !user && !token) {
            navigate('/login');
        }
    }, [user, loading, navigate, token]);

  if (loading) {//индикатор загрузки
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!user) {
    return null; // Перенаправление уже обработано в useEffect
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Шапка с информацией о пользователе */}
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar 
          sx={{ width: 80, height: 80, mr: 3 }}
          src={user.avatar || '/default-avatar.jpg'}
        >
          {user.username.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h4" component="h1">
            {user.username}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {user.email}
          </Typography>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={logout}
            sx={{ mt: 1 }}
          >
            Выйти
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Секция статей */}
      <Typography variant="h5" gutterBottom>
        Мои статьи ({articles.length})
      </Typography>

      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {new Date(article.created_at).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  {article.content.length > 150 
                    ? `${article.content.substring(0, 150)}...` 
                    : article.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate(`/article/${article.id}`)}>
                  Читать далее
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Если статей нет */}
      {articles.length === 0 && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            У вас пока нет статей
          </Typography>
          <Button 
            variant="contained" 
            sx={{ mt: 2 }}
            onClick={() => navigate('/create-article')}
          >
            Создать первую статью
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Home;
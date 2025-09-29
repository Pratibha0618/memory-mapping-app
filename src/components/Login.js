import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Paper,
    Link
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
                // After successful login, navigate to map
                navigate('/map', { replace: true });
            } else {
                await signup(email, password);
                // After successful signup, clear form and switch to login
                setEmail('');
                setPassword('');
                setIsLogin(true);
                // Show success message
                setError('Account created successfully! Please log in.');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBackToLanding = () => {
        navigate('/');
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.100'
            }}
        >
            <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '90%', position: 'relative' }}>
                <Button
                    onClick={handleBackToLanding}
                    sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10
                    }}
                >
                    Back to Home
                </Button>

                <Typography variant="h5" component="h1" gutterBottom align="center">
                    {isLogin ? 'Login' : 'Sign Up'}
                </Typography>

                {error && (
                    <Alert
                        severity={error.includes('successfully') ? 'success' : 'error'}
                        sx={{ mb: 2 }}
                    >
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3 }}
                        disabled={loading}
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </Button>
                </form>

                <Button
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setError('');
                    }}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
                </Button>

                {isLogin && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate('/forgot-password')}
                        >
                            Forgot Password?
                        </Link>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default Login;

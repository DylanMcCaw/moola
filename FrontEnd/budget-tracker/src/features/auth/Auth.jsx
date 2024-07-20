import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import AuthenticationApi from '../../api/AuthenticationApi';
import { setUser } from '../../store/slices/userSlice';
import { jwtDecode } from 'jwt-decode';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const response = await AuthenticationApi.loginUser({ email, password });
        localStorage.setItem('token', response.token);
        const decodedToken = jwtDecode(response.token);
        dispatch(setUser({
          id: decodedToken.nameid,
          name: decodedToken.unique_name,
          email: decodedToken.email,
        }));
        notifications.show({
          title: 'Successfully Logged In',
          color: "#4333A1"
        });
        navigate('/');
      } else {
        await AuthenticationApi.registerUser({ name, email, password });
        notifications.show({
          title: 'Successfully Registered!',
          color: "#4333A1"
        });
        setIsLogin(true);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">
        {isLogin ? 'Welcome back!' : 'Create an account'}
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {isLogin ? "Don't have an account yet? " : "Already have an account? "}
        <Anchor size="sm" component="button" onClick={toggleAuthMode} style={{ color: '#4333A1' }}>
          {isLogin ? 'Create account' : 'Login'}
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextInput
              label="Name"
              placeholder="Your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            mt="md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isLogin && (
            <Group justify="space-between" mt="lg">
              <Checkbox label="Remember me" color='#4333A1'/>
              <Anchor component="button" size="sm" style={{ color: '#4333A1' }}>
                Forgot password?
              </Anchor>
            </Group>
          )}
          {error && (
            <Text c="red" size="sm" mt="sm">
              {error}
            </Text>
          )}
          <Button type="submit" fullWidth mt="xl" style={{ backgroundColor: '#4333A1' }}>
            {isLogin ? 'Sign in' : 'Register'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
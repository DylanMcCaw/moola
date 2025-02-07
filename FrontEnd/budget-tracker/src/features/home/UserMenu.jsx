import React, { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import AuthenticationApi from '../../api/AuthenticationApi';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { clearUser } from '../../store/slices/userSlice'; // Import the clearUser action
import {
  IconSettings,
  IconLogout,
  IconChevronRight,
} from '@tabler/icons-react';

const UserButton = forwardRef(({ image, name, email, icon, ...others }, ref) => (
  <UnstyledButton
    ref={ref}
    style={{
      padding: 'var(--mantine-spacing-md)',
      color: 'var(--mantine-color-text)',
      borderRadius: 'var(--mantine-radius-sm)',
    }}
    {...others}
  >
    <Group>
      <Avatar src={image} radius="xl" />

      <div style={{ flex: 1 }}>
        <Text size="sm" fw={500}>
          {name}
        </Text>

        <Text size="xs">
          {email}
        </Text>
      </div>

      {icon || <IconChevronRight size="1rem" />}
    </Group>
  </UnstyledButton>
));

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleLogout = async () => {
    try {
      await AuthenticationApi.logoutUser(); // Call the logout API
      localStorage.removeItem('token');
      dispatch(clearUser()); // Dispatch the clearUser action
      notifications.show({
        title: 'Successfully Logged Out',
        color: "#4333A1"
      });
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      notifications.show({
        title: 'Logout Failed',
        color: "red",
        message: 'An error occurred during logout. Please try again.'
      });
    }
  };

  return (
    <Menu transitionProps={{ transition: 'fade-down', duration: 500 }} radius="lg" position="bottom">
      <Menu.Target>
        <UserButton
          image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          name={user.name}
          email={user.email}
        />
      </Menu.Target>
      <Menu.Dropdown style={{ width: rem(225)}}>
        <Menu.Item
          leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
          component="a"
          href="/settings"
        >
          Settings
        </Menu.Item>
        <Menu.Item
          leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
          onClick={handleLogout}
        >
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;
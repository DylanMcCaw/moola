import React, { forwardRef } from 'react';
import { Menu, UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
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
  return (
    <Menu transitionProps={{ transition: 'fade-down', duration: 500 }} radius="lg" position="bottom">
      <Menu.Target>
        <UserButton
          image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          name="Dylan McCaw"
          email="dylanmccaw@email.com"
        />
      </Menu.Target>
      <Menu.Dropdown style={{ width: rem(225)}}>
        <Menu.Item
          leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
          component="a"
          href=""
          target="_blank"
        >
          Settings
        </Menu.Item>
        <Menu.Item
          leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
          component="a"
          href=""
          target="_blank"
        >
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;

import React from 'react';
import { Switch, rem, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

function DarkModeSwitch() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={colorScheme === 'dark' ? 'white' : '#4333A1'}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={colorScheme === 'dark' ? 'white' : '#4333A1'}
    />
  );

  return (
    <Switch
      size="md"
      color="dark.4"
      onLabel={sunIcon}
      offLabel={moonIcon}
      onChange={() => toggleColorScheme()}
      checked={colorScheme === 'dark'}
    />
  );
}

export default DarkModeSwitch;
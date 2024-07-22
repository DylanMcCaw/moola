import { Switch, rem } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

function DarkModeSwitch() {

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color="white"
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color="#4333A1"
    />
  );

  return <Switch size="md" color="dark.4" onLabel={sunIcon} offLabel={moonIcon} />;
}

export default DarkModeSwitch;
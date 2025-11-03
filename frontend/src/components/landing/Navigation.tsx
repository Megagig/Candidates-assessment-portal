import { Link } from 'react-router-dom';
import {
  Burger,
  Button,
  Container,
  Group,
  Menu,
  Text,
  UnstyledButton,
  useMantineColorScheme,
  useComputedColorScheme,
  rem,
  Box,
  Stack,
} from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import { IconCode, IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';

export const Navigation = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const [scroll] = useWindowScroll();

  const navLinks = [
    { to: '/register', label: 'Register' },
    { to: '/admin/login', label: 'Admin' },
    { to: '/contact', label: 'Contact' },
  ];

  const themeIcons = {
    light: <IconSun size={18} />,
    dark: <IconMoon size={18} />,
    auto: <IconDeviceDesktop size={18} />,
  };

  return (
    <Box
      component="nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(12px)',
        backgroundColor: scroll.y > 10 
          ? 'var(--mantine-color-body)' 
          : 'transparent',
        borderBottom: scroll.y > 10 
          ? `${rem(1)} solid var(--mantine-color-default-border)` 
          : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <Container size="xl" py="md">
        <Group justify="space-between" h="100%">
          {/* Logo */}
          <UnstyledButton
            component={Link}
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: rem(8),
              textDecoration: 'none',
            }}
          >
            <IconCode 
              size={32} 
              style={{ 
                color: 'var(--mantine-color-blue-6)',
                transition: 'transform 0.3s ease',
              }}
            />
            <Text
              size="xl"
              fw={800}
              variant="gradient"
              gradient={{ from: 'blue', to: 'violet', deg: 90 }}
            >
              MegaHub
            </Text>
          </UnstyledButton>

          {/* Desktop Navigation */}
          <Group gap="xs" visibleFrom="sm">
            {navLinks.map((link) => (
              <Button
                key={link.to}
                component={Link}
                to={link.to}
                variant="subtle"
                size="md"
                fw={600}
              >
                {link.label}
              </Button>
            ))}

            {/* Theme Toggle */}
            <Menu shadow="md" width={150}>
              <Menu.Target>
                <Button variant="default" size="md">
                  {themeIcons[computedColorScheme]}
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconSun size={16} />}
                  onClick={() => setColorScheme('light')}
                >
                  Light
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconMoon size={16} />}
                  onClick={() => setColorScheme('dark')}
                >
                  Dark
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconDeviceDesktop size={16} />}
                  onClick={() => setColorScheme('auto')}
                >
                  System
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>

          {/* Mobile Menu */}
          <Group hiddenFrom="sm">
            <Button
              variant="default"
              size="md"
              onClick={() => {
                const schemes: Array<'light' | 'dark' | 'auto'> = ['light', 'dark', 'auto'];
                const currentIndex = schemes.indexOf(computedColorScheme);
                const nextScheme = schemes[(currentIndex + 1) % schemes.length];
                setColorScheme(nextScheme);
              }}
            >
              {themeIcons[computedColorScheme]}
            </Button>
            <Burger opened={opened} onClick={toggle} size="sm" />
          </Group>
        </Group>

        {/* Mobile Menu Dropdown */}
        {opened && (
          <Box mt="md" hiddenFrom="sm">
            <Stack gap="xs">
              {navLinks.map((link) => (
                <Button
                  key={link.to}
                  component={Link}
                  to={link.to}
                  variant="subtle"
                  fullWidth
                  onClick={close}
                  fw={600}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
};

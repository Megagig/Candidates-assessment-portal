import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppShell,
  Burger,
  Group,
  Button,
  Avatar,
  Text,
  Menu,
  UnstyledButton,
  rem,
  Box,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconHome,
  IconUsers,
  IconLogout,
  IconChevronDown,
  IconUserCheck,
} from '@tabler/icons-react';
import { useAuthStore } from '../stores';
import { useLogout } from '../hooks';

export const MantineAdminLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const user = useAuthStore((state) => state.user);
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate('/admin/login');
      },
    });
  };

  const isActive = (path: string) => {
    if (path === '/admin/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Group gap="xs">
                <Box
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </Box>
                <div>
                  <Text size="lg" fw={700}>MegaHub</Text>
                  <Text size="xs" c="dimmed">Admin Portal</Text>
                </div>
              </Group>
            </Link>
          </Group>

          <Menu shadow="md" width={200}>
            <Menu.Target>
              <UnstyledButton>
                <Group gap="xs">
                  <Avatar color="violet" radius="xl">
                    {user?.name?.charAt(0).toUpperCase() || 'A'}
                  </Avatar>
                  <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                      {user?.name || 'Admin'}
                    </Text>
                    <Text size="xs" c="dimmed">
                      Administrator
                    </Text>
                  </div>
                  <IconChevronDown size={16} />
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Account</Menu.Label>
              <Menu.Item
                leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                onClick={handleLogout}
                color="red"
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section grow>
          <Button
            component={Link}
            to="/admin/dashboard"
            leftSection={<IconHome size={18} />}
            variant={isActive('/admin/dashboard') ? 'filled' : 'subtle'}
            fullWidth
            justify="flex-start"
            mb="xs"
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to="/admin/candidates"
            leftSection={<IconUsers size={18} />}
            variant={isActive('/admin/candidates') ? 'filled' : 'subtle'}
            fullWidth
            justify="flex-start"
            mb="xs"
          >
            Candidates
          </Button>
          {user?.role === 'super_admin' && (
            <Button
              component={Link}
              to="/admin/pending-admins"
              leftSection={<IconUserCheck size={18} />}
              variant={isActive('/admin/pending-admins') ? 'filled' : 'subtle'}
              fullWidth
              justify="flex-start"
              mb="xs"
            >
              Pending Admins
            </Button>
          )}
        </AppShell.Section>

        <AppShell.Section>
          <Button
            leftSection={<IconLogout size={18} />}
            variant="light"
            color="red"
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

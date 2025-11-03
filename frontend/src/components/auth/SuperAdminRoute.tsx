import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores';
import { Container, Paper, Stack, ThemeIcon, Title, Text } from '@mantine/core';
import { IconShieldX } from '@tabler/icons-react';

interface SuperAdminRouteProps {
  children: React.ReactNode;
}

export const SuperAdminRoute: React.FC<SuperAdminRouteProps> = ({ children }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (user.role !== 'super_admin') {
    return (
      <Container size="sm" py="xl">
        <Paper p="xl" radius="md" withBorder>
          <Stack align="center" gap="md">
            <ThemeIcon size={80} radius="xl" variant="light" color="red">
              <IconShieldX size={40} />
            </ThemeIcon>
            <Title order={2}>Access Denied</Title>
            <Text c="dimmed" ta="center">
              You do not have permission to access this page. This area is restricted to super
              administrators only.
            </Text>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return <>{children}</>;
};

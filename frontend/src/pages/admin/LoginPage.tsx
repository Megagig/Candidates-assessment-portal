import { Navigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Title,
  Text,
  Box,
  Stack,
  ThemeIcon,
  Anchor,
  Divider,
} from '@mantine/core';
import { IconLock, IconArrowLeft, IconShieldCheck } from '@tabler/icons-react';
import { Navigation } from '../../components/landing';
import { LoginForm } from '../../components/auth';
import { useAuthStore } from '../../stores';

export const LoginPage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <Box style={{ minHeight: '100vh', background: 'var(--mantine-color-body)' }}>
      <Navigation />
      <Box
        style={{
          minHeight: 'calc(100vh - 80px)',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, var(--mantine-color-blue-0) 0%, var(--mantine-color-violet-0) 100%)',
        }}
      >
        {/* Animated Background Blobs */}
        <Box
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: '40%',
            height: '40%',
            background: 'radial-gradient(circle, rgba(103, 126, 234, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <Box
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-10%',
            width: '40%',
            height: '40%',
            background: 'radial-gradient(circle, rgba(118, 75, 162, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            animation: 'float 10s ease-in-out infinite reverse',
          }}
        />

        {/* Main Content */}
        <Container size="xs" style={{ position: 'relative', zIndex: 1 }} py={80}>
          <Stack align="center" gap="xl">
            {/* Logo/Brand Section */}
            <Stack align="center" gap="md">
              <ThemeIcon
                size={80}
                radius="xl"
                variant="gradient"
                gradient={{ from: 'blue', to: 'violet', deg: 90 }}
                style={{
                  boxShadow: '0 8px 32px rgba(103, 126, 234, 0.3)',
                }}
              >
                <IconLock size={40} stroke={2.5} />
              </ThemeIcon>
              <Title
                order={1}
                ta="center"
                style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
              >
                <Text
                  component="span"
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'violet', deg: 90 }}
                  inherit
                >
                  Admin Portal
                </Text>
              </Title>
              <Text size="lg" c="dimmed" ta="center">
                Welcome back! Sign in to continue
              </Text>
            </Stack>

            {/* Login Card */}
            <Paper
              shadow="xl"
              radius="lg"
              p="xl"
              withBorder
              style={{
                width: '100%',
                maxWidth: 480,
                backdropFilter: 'blur(12px)',
                backgroundColor: 'var(--mantine-color-body)',
              }}
            >
              <Stack gap="lg">
                <Box>
                  <Title order={2} size="h3" mb="xs">
                    Sign In
                  </Title>
                  <Text size="sm" c="dimmed">
                    Access your admin dashboard
                  </Text>
                </Box>

                <LoginForm />

                <Divider label="or" labelPosition="center" />

                <Text size="sm" ta="center" c="dimmed">
                  Don't have an account?{' '}
                  <Anchor
                    component={Link}
                    to="/admin/register"
                    fw={600}
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'violet' }}
                  >
                    Register here
                  </Anchor>
                </Text>
              </Stack>
            </Paper>

            {/* Back to Home Link */}
            <Anchor
              component={Link}
              to="/"
              c="dimmed"
              size="sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <IconArrowLeft size={16} />
              Back to Home
            </Anchor>

            {/* Security Badge */}
            <Paper
              p="sm"
              radius="xl"
              style={{
                backgroundColor: 'var(--mantine-color-default-hover)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <IconShieldCheck size={16} color="var(--mantine-color-green-6)" />
              <Text size="xs" c="dimmed" fw={500}>
                Secured with end-to-end encryption
              </Text>
            </Paper>
          </Stack>
        </Container>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(30px, -30px); }
          }
        `}</style>
      </Box>
    </Box>
  );
};

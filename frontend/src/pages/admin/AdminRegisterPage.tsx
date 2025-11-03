import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Box,
  ThemeIcon,
  Alert,
  List,
  Anchor,
  Group,
} from '@mantine/core';
import {
  IconUserPlus,
  IconClock,
  IconAlertCircle,
  IconCircleCheck,
  IconMail,
  IconLock,
  IconUser,
} from '@tabler/icons-react';
import { Navigation } from '../../components/landing';
import { authApi } from '../../services';

const adminRegisterSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type AdminRegisterFormData = z.infer<typeof adminRegisterSchema>;

export const AdminRegisterPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminRegisterFormData>({
    resolver: zodResolver(adminRegisterSchema),
  });

  const onSubmit = async (data: AdminRegisterFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      await authApi.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Box style={{ minHeight: '100vh', background: 'var(--mantine-color-body)' }}>
        <Navigation />
        <Box
          style={{
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--mantine-color-body)',
            padding: 'var(--mantine-spacing-md)',
          }}
        >
          <Container size="sm">
            <Paper shadow="xl" radius="lg" p="xl" withBorder>
              <Stack align="center" gap="xl">
                <ThemeIcon
                  size={80}
                  radius="xl"
                  variant="gradient"
                  gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                >
                  <IconClock size={40} stroke={2} />
                </ThemeIcon>

                <Stack align="center" gap="md">
                  <Title order={2} ta="center">
                    Registration Pending Approval
                  </Title>
                  <Text size="lg" c="dimmed" ta="center">
                    Thank you for registering! Your admin account has been submitted for approval.
                    Our super admin team will review your request and send you an email once approved.
                  </Text>
                </Stack>

                <Alert
                  icon={<IconAlertCircle size={16} />}
                  title="What's Next?"
                  color="blue"
                  variant="light"
                  w="100%"
                >
                  <List size="sm" spacing="xs">
                    <List.Item>Our team will verify your details</List.Item>
                    <List.Item>You'll receive an approval email within 24-48 hours</List.Item>
                    <List.Item>Once approved, you can log in and access the dashboard</List.Item>
                  </List>
                </Alert>

                <Group w="100%" grow>
                  <Button component={Link} to="/" variant="default" size="md">
                    Back to Home
                  </Button>
                  <Button
                    component={Link}
                    to="/admin/login"
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'violet' }}
                    size="md"
                  >
                    Go to Login
                  </Button>
                </Group>
              </Stack>
            </Paper>
          </Container>
        </Box>
      </Box>
    );
  }

  return (
    <Box style={{ minHeight: '100vh', background: 'var(--mantine-color-body)' }}>
      <Navigation />
      <Box
        style={{
          background: 'var(--mantine-color-body)',
        }}
      >
        <Container size="sm" py="xl">
          <Stack gap="xl">
            {/* Header */}
            <Stack align="center" gap="md">
              <ThemeIcon
                size={64}
                radius="xl"
                variant="gradient"
                gradient={{ from: 'blue', to: 'violet', deg: 90 }}
              >
                <IconUserPlus size={32} />
              </ThemeIcon>
              <Title order={1} ta="center" style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)' }}>
                Admin Registration
              </Title>
              <Text size="lg" c="dimmed" ta="center">
                Register for an admin account to manage candidates
              </Text>
            </Stack>

            {/* Info Banner */}
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="Approval Required"
              color="yellow"
              variant="light"
            >
              Admin registrations require approval from our super admin team. You'll be notified via
              email once your account is approved.
            </Alert>

            {/* Registration Form */}
            <Paper shadow="xl" radius="lg" p="xl" withBorder>
              {error && (
                <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" mb="lg">
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap="md">
                  <TextInput
                    {...register('name')}
                    label="Full Name"
                    placeholder="John Doe"
                    leftSection={<IconUser size={16} />}
                    error={errors.name?.message}
                    required
                    size="md"
                  />

                  <TextInput
                    {...register('email')}
                    label="Email Address"
                    placeholder="admin@example.com"
                    leftSection={<IconMail size={16} />}
                    error={errors.email?.message}
                    required
                    size="md"
                    type="email"
                  />

                  <PasswordInput
                    {...register('password')}
                    label="Password"
                    placeholder="Min. 8 characters (A-Z, a-z, 0-9)"
                    leftSection={<IconLock size={16} />}
                    error={errors.password?.message}
                    required
                    size="md"
                  />

                  <PasswordInput
                    {...register('confirmPassword')}
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    leftSection={<IconLock size={16} />}
                    error={errors.confirmPassword?.message}
                    required
                    size="md"
                  />

                  <Button
                    type="submit"
                    size="lg"
                    leftSection={<IconUserPlus size={18} />}
                    loading={isLoading}
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'violet' }}
                    fullWidth
                    mt="md"
                  >
                    Register Admin Account
                  </Button>
                </Stack>
              </form>

              <Text size="sm" ta="center" mt="lg" c="dimmed">
                Already have an admin account?{' '}
                <Anchor component={Link} to="/admin/login" fw={600}>
                  Login here
                </Anchor>
              </Text>
            </Paper>

            {/* Benefits */}
            <Paper shadow="md" radius="lg" p="xl" withBorder>
              <Title order={3} size="h4" mb="lg">
                Admin Account Benefits
              </Title>
              <List
                spacing="sm"
                size="sm"
                icon={
                  <ThemeIcon size={20} radius="xl" variant="light" color="green">
                    <IconCircleCheck size={14} />
                  </ThemeIcon>
                }
              >
                <List.Item>Access to comprehensive candidate dashboard</List.Item>
                <List.Item>Advanced filtering and search capabilities</List.Item>
                <List.Item>Export candidate data to CSV</List.Item>
                <List.Item>View detailed analytics and tier distribution</List.Item>
                <List.Item>Manage and update candidate information</List.Item>
              </List>
            </Paper>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

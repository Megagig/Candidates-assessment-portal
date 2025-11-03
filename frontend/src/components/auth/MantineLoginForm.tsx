import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  TextInput,
  PasswordInput,
  Button,
  Checkbox,
  Anchor,
  Stack,
  Group,
  Alert,
} from '@mantine/core';
import { IconMail, IconLock, IconAlertCircle } from '@tabler/icons-react';
import { useLogin } from '../../hooks';
import type { ApiError } from '../../types';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const MantineLoginForm = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const { mutate: login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  const apiError = error as ApiError | null;
  const isPendingApproval = apiError?.message?.includes('pending approval');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="md">
        {apiError && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title={isPendingApproval ? 'Account Pending Approval' : 'Login Failed'}
            color={isPendingApproval ? 'yellow' : 'red'}
            variant="light"
          >
            <Stack gap="xs">
              <div>{apiError.message || 'An error occurred during login. Please try again.'}</div>
              {isPendingApproval && (
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                  Your account is awaiting approval from our admin team. You'll receive an email once approved.
                </div>
              )}
            </Stack>
          </Alert>
        )}

        <TextInput
          {...register('email')}
          label="Email Address"
          placeholder="admin@megahub.com"
          leftSection={<IconMail size={16} />}
          error={errors.email?.message}
          required
          size="md"
          autoComplete="email"
        />

        <PasswordInput
          {...register('password')}
          label="Password"
          placeholder="Enter your password"
          leftSection={<IconLock size={16} />}
          error={errors.password?.message}
          required
          size="md"
          autoComplete="current-password"
        />

        <Group justify="space-between">
          <Checkbox
            label="Remember me"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.currentTarget.checked)}
            size="sm"
          />
          <Anchor size="sm" c="dimmed">
            Forgot password?
          </Anchor>
        </Group>

        <Button
          type="submit"
          size="lg"
          loading={isPending}
          variant="gradient"
          gradient={{ from: 'blue', to: 'violet' }}
          fullWidth
        >
          Sign In
        </Button>
      </Stack>
    </form>
  );
};

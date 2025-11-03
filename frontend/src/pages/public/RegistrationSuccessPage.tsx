import { Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Stack,
  Box,
  ThemeIcon,
  Group,
} from '@mantine/core';
import { IconCheck, IconHome, IconMail } from '@tabler/icons-react';
import { Navigation } from '../../components/landing';

export const RegistrationSuccessPage = () => {
  return (
    <Box style={{ minHeight: '100vh', background: 'var(--mantine-color-body)' }}>
      <Navigation />
      <Box
        style={{
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, var(--mantine-color-blue-0) 0%, var(--mantine-color-violet-0) 100%)',
          padding: 'var(--mantine-spacing-md)',
        }}
      >
      <Container size="sm">
        <Paper shadow="xl" radius="lg" p="xl" withBorder>
          <Stack align="center" gap="xl">
            {/* Success Icon */}
            <ThemeIcon
              size={80}
              radius="xl"
              variant="gradient"
              gradient={{ from: 'green', to: 'teal', deg: 90 }}
            >
              <IconCheck size={48} stroke={3} />
            </ThemeIcon>

            {/* Message */}
            <Stack align="center" gap="md">
              <Title order={1} ta="center">
                Registration Successful!
              </Title>
              <Text size="lg" c="dimmed" ta="center">
                Thank you for completing the assessment. We've analyzed your responses and assigned you to a skill tier.
              </Text>
              <Paper p="md" radius="md" withBorder w="100%" style={{ background: 'var(--mantine-color-blue-0)' }}>
                <Group gap="sm">
                  <IconMail size={20} color="var(--mantine-color-blue-6)" />
                  <Text size="sm" c="dimmed">
                    Check your email for your tier assignment and next steps. We'll be in touch soon!
                  </Text>
                </Group>
              </Paper>
            </Stack>

            {/* Actions */}
            <Stack gap="sm" w="100%">
              <Button
                component={Link}
                to="/"
                size="lg"
                leftSection={<IconHome size={18} />}
                variant="gradient"
                gradient={{ from: 'blue', to: 'violet' }}
                fullWidth
              >
                Back to Home
              </Button>
              <Button
                component={Link}
                to="/contact"
                size="md"
                variant="default"
                fullWidth
              >
                Contact Support
              </Button>
            </Stack>

            {/* Additional Info */}
            <Text size="sm" c="dimmed" ta="center">
              Questions? Feel free to reach out to our support team.
            </Text>
          </Stack>
        </Paper>
      </Container>
    </Box>
    </Box>
  );
};

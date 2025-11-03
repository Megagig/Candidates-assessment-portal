import { Link } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Badge,
  SimpleGrid,
  Paper,
  Box,
  Stack,
  rem,
} from '@mantine/core';
import {
  IconSparkles,
  IconBolt,
  IconShield,
  IconTrendingUp,
  IconArrowRight,
} from '@tabler/icons-react';

export const HeroSection = () => {
  const stats = [
    { value: '5', label: 'Skill Tiers', icon: IconTrendingUp, color: 'blue' },
    { value: '10min', label: 'Assessment', icon: IconBolt, color: 'violet' },
    { value: '100%', label: 'Automated', icon: IconShield, color: 'pink' },
    { value: '24/7', label: 'Available', icon: IconSparkles, color: 'indigo' },
  ];

  return (
    <Box
      component="section"
      style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--mantine-color-body)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Blobs */}
      <Box
        style={{
          position: 'absolute',
          top: rem(80),
          left: rem(40),
          width: rem(400),
          height: rem(400),
          background: 'radial-gradient(circle, rgba(103, 126, 234, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <Box
        style={{
          position: 'absolute',
          top: rem(160),
          right: rem(40),
          width: rem(400),
          height: rem(400),
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      />

      <Container size="lg" style={{ position: 'relative', zIndex: 1 }} py={80}>
        <Stack align="center" gap="xl">
          {/* Badge */}
          <Badge
            size="lg"
            variant="gradient"
            gradient={{ from: 'blue', to: 'violet', deg: 90 }}
            leftSection={<IconSparkles size={16} />}
            style={{ animation: 'fadeInDown 0.6s ease-out' }}
          >
            AI-Powered Skill Assessment Platform
          </Badge>

          {/* Headline */}
          <Title
            order={1}
            ta="center"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 900,
              lineHeight: 1.2,
              animation: 'fadeInUp 0.8s ease-out',
            }}
          >
            Streamline Your{' '}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: 'blue', to: 'violet', deg: 90 }}
              inherit
            >
              Developer Hiring
            </Text>
            <br />
            Process
          </Title>

          {/* Subheadline */}
          <Text
            size="xl"
            c="dimmed"
            ta="center"
            maw={800}
            style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              lineHeight: 1.6,
              animation: 'fadeInUp 1s ease-out',
            }}
          >
            Automatically assess and categorize candidates into skill tiers with AI precision.
            Save hours of manual evaluation and make data-driven hiring decisions.
          </Text>

          {/* CTA Buttons */}
          <Group gap="md" style={{ animation: 'fadeInUp 1.2s ease-out' }}>
            <Button
              component={Link}
              to="/register"
              size="xl"
              variant="gradient"
              gradient={{ from: 'blue', to: 'violet', deg: 90 }}
              rightSection={<IconArrowRight size={20} />}
              style={{
                boxShadow: '0 8px 24px rgba(103, 126, 234, 0.3)',
              }}
            >
              Get Started Free
            </Button>
            <Button
              component={Link}
              to="/admin/login"
              size="xl"
              variant="default"
            >
              Admin Portal
            </Button>
          </Group>

          {/* Stats */}
          <SimpleGrid
            cols={{ base: 2, sm: 4 }}
            spacing="lg"
            mt="xl"
            w="100%"
            maw={1000}
            style={{ animation: 'fadeIn 1.4s ease-out' }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Paper
                  key={index}
                  p="xl"
                  radius="lg"
                  withBorder
                  style={{
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    ':hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 'var(--mantine-shadow-lg)',
                    },
                  }}
                >
                  <Stack align="center" gap="sm">
                    <Icon size={32} color={`var(--mantine-color-${stat.color}-6)`} />
                    <Text
                      size="2.5rem"
                      fw={900}
                      c={stat.color}
                      style={{ lineHeight: 1 }}
                    >
                      {stat.value}
                    </Text>
                    <Text size="sm" c="dimmed" fw={600} ta="center">
                      {stat.label}
                    </Text>
                  </Stack>
                </Paper>
              );
            })}
          </SimpleGrid>

          {/* Trust Indicators */}
          <Stack align="center" gap="sm" mt="xl">
            <Text size="sm" c="dimmed">
              Trusted by innovative companies worldwide
            </Text>
            <Group gap="xl">
              {['Tech', 'Startup', 'Enterprise', 'Agency'].map((company, i) => (
                <Text key={i} size="lg" fw={700} c="dimmed" opacity={0.5}>
                  {company}
                </Text>
              ))}
            </Group>
          </Stack>
        </Stack>
      </Container>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </Box>
  );
};

import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  ThemeIcon,
  Stack,
  Badge,
  Box,
  Group,
  rem,
} from '@mantine/core';
import {
  IconCircleCheck,
  IconChartBar,
  IconSearch,
  IconTrendingUp,
  IconDownload,
  IconShield,
} from '@tabler/icons-react';

export const Features = () => {
  const features = [
    {
      icon: IconCircleCheck,
      title: 'Automated Assessment',
      description: 'Comprehensive questionnaire covering all tech stacks with instant evaluation',
      color: 'blue',
      gradient: { from: 'blue', to: 'cyan' },
    },
    {
      icon: IconChartBar,
      title: 'Smart Categorization',
      description: 'AI-powered tier assignment from Tier 0 to Tier 4 based on performance',
      color: 'violet',
      gradient: { from: 'violet', to: 'pink' },
    },
    {
      icon: IconSearch,
      title: 'Advanced Search',
      description: 'Filter candidates by tier, skills, experience, and custom criteria',
      color: 'green',
      gradient: { from: 'green', to: 'teal' },
    },
    {
      icon: IconTrendingUp,
      title: 'Analytics Dashboard',
      description: 'Real-time insights and visual analytics on candidate distribution',
      color: 'yellow',
      gradient: { from: 'yellow', to: 'orange' },
    },
    {
      icon: IconDownload,
      title: 'Export Data',
      description: 'Export candidate data to CSV, Excel, or PDF with one click',
      color: 'pink',
      gradient: { from: 'pink', to: 'red' },
    },
    {
      icon: IconShield,
      title: 'Secure Access',
      description: 'Enterprise-grade security with role-based authentication',
      color: 'indigo',
      gradient: { from: 'indigo', to: 'violet' },
    },
  ];

  return (
    <Box
      component="section"
      py={80}
      style={{
        background: 'linear-gradient(180deg, var(--mantine-color-body) 0%, var(--mantine-color-gray-0) 100%)',
      }}
    >
      <Container size="lg">
        <Stack align="center" gap="xl" mb={60}>
          <Badge size="lg" variant="light" color="blue">
            Features
          </Badge>
          <Title
            order={2}
            ta="center"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900 }}
          >
            Powerful Features
          </Title>
          <Text size="xl" c="dimmed" ta="center" maw={700}>
            Everything you need to streamline your developer assessment and hiring process
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                shadow="sm"
                padding="xl"
                radius="lg"
                withBorder
                style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  ':hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 'var(--mantine-shadow-xl)',
                  },
                }}
              >
                {/* Gradient overlay on hover */}
                <Box
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(135deg, var(--mantine-color-${feature.color}-0) 0%, var(--mantine-color-${feature.color}-1) 100%)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                  }}
                />

                <Stack gap="md" style={{ position: 'relative', zIndex: 1 }}>
                  <ThemeIcon
                    size={60}
                    radius="md"
                    variant="gradient"
                    gradient={feature.gradient}
                  >
                    <Icon size={32} />
                  </ThemeIcon>
                  <Title order={3} size="h4" fw={700}>
                    {feature.title}
                  </Title>
                  <Text size="md" c="dimmed">
                    {feature.description}
                  </Text>
                </Stack>

                {/* Bottom accent line */}
                <Box
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: rem(4),
                    background: `linear-gradient(90deg, var(--mantine-color-${feature.color}-5), var(--mantine-color-${feature.color}-7))`,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </Card>
            );
          })}
        </SimpleGrid>

        {/* Additional Features */}
        <Stack align="center" gap="md" mt={60}>
          <Text size="lg" c="dimmed">
            And many more features to discover
          </Text>
          <Group gap="md">
            {['Real-time Updates', 'Mobile Responsive', 'API Access', 'Custom Branding'].map((item, i) => (
              <Badge key={i} size="lg" variant="light" radius="xl">
                {item}
              </Badge>
            ))}
          </Group>
        </Stack>
      </Container>
    </Box>
  );
};

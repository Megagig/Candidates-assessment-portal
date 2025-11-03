import {
  Container,
  Title,
  Text,
  Accordion,
  Badge,
  Stack,
  Box,
  ThemeIcon,
  Group,
  rem,
} from '@mantine/core';
import { IconAward, IconCheck, IconAlertTriangle } from '@tabler/icons-react';

export const TierShowcase = () => {
  const tiers = [
    {
      tier: 0,
      name: 'Beginner',
      color: 'gray',
      skills: 'HTML, CSS, Basic JavaScript',
      capabilities: 'Basic React/Next.js knowledge',
      limitations: 'Cannot build CRUD apps with databases',
    },
    {
      tier: 1,
      name: 'CRUD Developer',
      color: 'blue',
      skills: 'Next.js, Database integration',
      capabilities: 'Full CRUD applications',
      limitations: 'No authentication implementation',
    },
    {
      tier: 2,
      name: 'Full-Stack Next.js Developer',
      color: 'green',
      skills: 'Next.js, Authentication, Deployment',
      capabilities: 'Authenticated CRUD apps, Can deploy applications',
      limitations: 'No backend framework knowledge (Express/Hono)',
    },
    {
      tier: 3,
      name: 'Multi-Framework Developer',
      color: 'yellow',
      skills: 'Next.js, Express/Hono, Authentication',
      capabilities: 'Authenticated CRUD APIs with documentation',
      limitations: 'No Golang knowledge',
    },
    {
      tier: 4,
      name: 'Advanced Full-Stack Developer',
      color: 'violet',
      skills: 'Next.js, Express, Hono, Golang',
      capabilities: 'Full-stack development with Go APIs',
      limitations: 'None - Expert level',
    },
  ];

  return (
    <Box component="section" py={80} style={{ background: 'var(--mantine-color-body)' }}>
      <Container size="lg">
        <Stack align="center" gap="xl" mb={60}>
          <Badge
            size="lg"
            variant="light"
            color="violet"
            leftSection={<IconAward size={16} />}
          >
            5 Tier System
          </Badge>
          <Title
            order={2}
            ta="center"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900 }}
          >
            Our Skill Tier System
          </Title>
          <Text size="xl" c="dimmed" ta="center" maw={700}>
            We categorize developers into five distinct tiers based on their skills and experience
          </Text>
        </Stack>

        <Accordion
          variant="separated"
          radius="lg"
          defaultValue="0"
          styles={{
            item: {
              border: `${rem(2)} solid var(--mantine-color-default-border)`,
              transition: 'all 0.3s ease',
              '&[data-active]': {
                boxShadow: 'var(--mantine-shadow-lg)',
              },
            },
          }}
        >
          {tiers.map((tier) => (
            <Accordion.Item key={tier.tier} value={tier.tier.toString()}>
              <Accordion.Control>
                <Group gap="md">
                  <ThemeIcon
                    size={60}
                    radius="md"
                    variant="gradient"
                    gradient={{ from: tier.color, to: tier.color, deg: 90 }}
                  >
                    <Text size="xl" fw={900} c="white">
                      {tier.tier}
                    </Text>
                  </ThemeIcon>
                  <Box>
                    <Text size="xl" fw={700}>
                      Tier {tier.tier} - {tier.name}
                    </Text>
                    <Text size="md" c="dimmed">
                      {tier.skills}
                    </Text>
                  </Box>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack gap="lg" p="md">
                  <Box>
                    <Group gap="xs" mb="sm">
                      <IconCheck size={20} color="var(--mantine-color-green-6)" />
                      <Text size="lg" fw={700}>
                        Capabilities:
                      </Text>
                    </Group>
                    <Text size="md" c="dimmed" pl="xl">
                      {tier.capabilities}
                    </Text>
                  </Box>
                  <Box>
                    <Group gap="xs" mb="sm">
                      <IconAlertTriangle size={20} color="var(--mantine-color-yellow-6)" />
                      <Text size="lg" fw={700}>
                        Limitations:
                      </Text>
                    </Group>
                    <Text size="md" c="dimmed" pl="xl">
                      {tier.limitations}
                    </Text>
                  </Box>
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </Box>
  );
};

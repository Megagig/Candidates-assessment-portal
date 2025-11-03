import { Link } from 'react-router-dom';
import {
  Container,
  Group,
  ActionIcon,
  Text,
  Stack,
  SimpleGrid,
  Box,
  Divider,
} from '@mantine/core';
import {
  IconCode,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandGithub,
  IconHeart,
} from '@tabler/icons-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    quick: [
      { label: 'Home', to: '/' },
      { label: 'Register', to: '/register' },
      { label: 'Admin Login', to: '/admin/login' },
      { label: 'Contact', to: '/contact' },
    ],
    resources: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  };

  const socials = [
    { icon: IconBrandTwitter, href: 'https://twitter.com', label: 'Twitter', color: 'blue' },
    { icon: IconBrandLinkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'blue' },
    { icon: IconBrandGithub, href: 'https://github.com', label: 'GitHub', color: 'gray' },
  ];

  return (
    <Box
      component="footer"
      style={{
        background: 'linear-gradient(180deg, var(--mantine-color-dark-8) 0%, var(--mantine-color-dark-9) 100%)',
        color: 'var(--mantine-color-gray-4)',
      }}
    >
      <Container size="xl" py={60}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
          {/* Company Info */}
          <Stack gap="md">
            <Group gap="xs">
              <IconCode size={32} color="var(--mantine-color-blue-5)" />
              <Text
                size="xl"
                fw={900}
                variant="gradient"
                gradient={{ from: 'blue', to: 'violet', deg: 90 }}
              >
                MegaHub
              </Text>
            </Group>
            <Text size="sm" c="dimmed">
              Streamlining developer assessment and tier categorization for modern tech teams worldwide.
            </Text>
            <Group gap="xs">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <ActionIcon
                    key={social.label}
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    variant="light"
                    color={social.color}
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </ActionIcon>
                );
              })}
            </Group>
          </Stack>

          {/* Quick Links */}
          <Stack gap="md">
            <Text size="lg" fw={700} c="white">
              Quick Links
            </Text>
            <Stack gap="xs">
              {links.quick.map((link) => (
                <Text
                  key={link.to}
                  component={Link}
                  to={link.to}
                  size="sm"
                  c="dimmed"
                  style={{
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    ':hover': {
                      color: 'var(--mantine-color-white)',
                    },
                  }}
                >
                  {link.label}
                </Text>
              ))}
            </Stack>
          </Stack>

          {/* Resources */}
          <Stack gap="md">
            <Text size="lg" fw={700} c="white">
              Resources
            </Text>
            <Stack gap="xs">
              {links.resources.map((link) => (
                <Text
                  key={link.label}
                  component="a"
                  href={link.href}
                  size="sm"
                  c="dimmed"
                  style={{
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    ':hover': {
                      color: 'var(--mantine-color-white)',
                    },
                  }}
                >
                  {link.label}
                </Text>
              ))}
            </Stack>
          </Stack>

          {/* Contact */}
          <Stack gap="md">
            <Text size="lg" fw={700} c="white">
              Get in Touch
            </Text>
            <Stack gap="sm">
              <Group gap="xs">
                <IconMail size={18} color="var(--mantine-color-blue-5)" />
                <Text
                  component="a"
                  href="mailto:support@megahub.com"
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  support@megahub.com
                </Text>
              </Group>
              <Group gap="xs">
                <IconPhone size={18} color="var(--mantine-color-green-5)" />
                <Text
                  component="a"
                  href="tel:+2348060374755"
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  +234 806 037 4755
                </Text>
              </Group>
              <Group gap="xs">
                <IconMapPin size={18} color="var(--mantine-color-red-5)" />
                <Text size="sm" c="dimmed">
                  Lagos, Nigeria
                </Text>
              </Group>
            </Stack>
          </Stack>
        </SimpleGrid>

        <Divider my="xl" color="dark.5" />

        {/* Bottom Bar */}
        <Group justify="space-between" wrap="wrap">
          <Group gap="xs">
            <Text size="sm" c="dimmed">
              © {currentYear} MegaHub. Made with
            </Text>
            <IconHeart size={16} color="var(--mantine-color-red-5)" fill="currentColor" />
            <Text size="sm" c="dimmed">
              in Nigeria
            </Text>
          </Group>
          <Group gap="lg">
            <Text
              component="a"
              href="#"
              size="sm"
              c="dimmed"
              style={{ textDecoration: 'none' }}
            >
              Privacy
            </Text>
            <Text
              component="a"
              href="#"
              size="sm"
              c="dimmed"
              style={{ textDecoration: 'none' }}
            >
              Terms
            </Text>
            <Text
              component="a"
              href="#"
              size="sm"
              c="dimmed"
              style={{ textDecoration: 'none' }}
            >
              Cookies
            </Text>
          </Group>
        </Group>
      </Container>
    </Box>
  );
};

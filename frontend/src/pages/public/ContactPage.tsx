import { useState } from 'react';
import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  Stack,
  Box,
  SimpleGrid,
  ThemeIcon,
  Alert,
  Anchor,
} from '@mantine/core';
import {
  IconSend,
  IconBrandWhatsapp,
  IconMail,
  IconPhone,
  IconMapPin,
  IconCheck,
} from '@tabler/icons-react';
import { Navigation } from '../../components/landing';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const whatsappNumber = '+2348060374755';
  const whatsappMessage = encodeURIComponent("Hi! I'd like to get in touch about MegaHub.");

  const contactInfo = [
    {
      icon: IconMail,
      title: 'Email',
      value: 'support@megahub.com',
      href: 'mailto:support@megahub.com',
      color: 'blue',
    },
    {
      icon: IconPhone,
      title: 'Phone',
      value: '+234 806 037 4755',
      href: 'tel:+2348060374755',
      color: 'green',
    },
    {
      icon: IconMapPin,
      title: 'Location',
      value: 'Lagos, Nigeria',
      href: null,
      color: 'violet',
    },
  ];

  return (
    <Box style={{ minHeight: '100vh', background: 'var(--mantine-color-body)' }}>
      <Navigation />
      <Container size="lg" py="xl">
        {/* Header */}
        <Stack align="center" gap="md" mb={60}>
          <Title order={1} ta="center" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Get in Touch
          </Title>
          <Text size="xl" c="dimmed" ta="center">
            Have questions? We'd love to hear from you.
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          {/* Contact Form */}
          <Paper shadow="md" radius="lg" p="xl" withBorder>
            <Title order={2} size="h3" mb="lg">
              Send us a Message
            </Title>

            {isSubmitted && (
              <Alert
                icon={<IconCheck size={16} />}
                title="Success!"
                color="green"
                mb="lg"
                variant="light"
              >
                Thank you! Your message has been sent successfully.
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack gap="md">
                <TextInput
                  name="name"
                  label="Name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  size="md"
                />

                <TextInput
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  size="md"
                />

                <TextInput
                  name="subject"
                  label="Subject"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  size="md"
                />

                <Textarea
                  name="message"
                  label="Message"
                  placeholder="Tell us more..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minRows={5}
                  size="md"
                />

                <Button
                  type="submit"
                  size="lg"
                  leftSection={<IconSend size={18} />}
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'violet' }}
                  fullWidth
                >
                  Send Message
                </Button>
              </Stack>
            </form>
          </Paper>

          {/* Contact Information */}
          <Stack gap="lg">
            {/* Contact Details */}
            <Paper shadow="md" radius="lg" p="xl" withBorder>
              <Title order={2} size="h3" mb="lg">
                Contact Information
              </Title>

              <Stack gap="lg">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Group key={index} gap="md">
                      <ThemeIcon size={48} radius="md" variant="light" color={info.color}>
                        <Icon size={24} />
                      </ThemeIcon>
                      <Box>
                        <Text fw={600} size="sm" mb={4}>
                          {info.title}
                        </Text>
                        {info.href ? (
                          <Anchor href={info.href} c="dimmed" size="sm">
                            {info.value}
                          </Anchor>
                        ) : (
                          <Text c="dimmed" size="sm">
                            {info.value}
                          </Text>
                        )}
                      </Box>
                    </Group>
                  );
                })}
              </Stack>
            </Paper>

            {/* WhatsApp CTA */}
            <Paper
              shadow="md"
              radius="lg"
              p="xl"
              style={{
                background: 'linear-gradient(135deg, var(--mantine-color-green-6) 0%, var(--mantine-color-teal-6) 100%)',
                color: 'white',
              }}
            >
              <IconBrandWhatsapp size={48} style={{ marginBottom: 16 }} />
              <Title order={3} size="h4" mb="sm" c="white">
                Prefer WhatsApp?
              </Title>
              <Text mb="lg" opacity={0.9}>
                Get instant responses to your questions via WhatsApp
              </Text>
              <Button
                component="a"
                href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                leftSection={<IconBrandWhatsapp size={18} />}
                size="md"
                variant="white"
                color="green"
                fullWidth
              >
                Chat on WhatsApp
              </Button>
            </Paper>

            {/* Office Hours */}
            <Paper shadow="md" radius="lg" p="xl" withBorder>
              <Title order={3} size="h4" mb="lg">
                Office Hours
              </Title>
              <Stack gap="sm">
                {[
                  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                  { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                  { day: 'Sunday', hours: 'Closed' },
                ].map((schedule, index) => (
                  <Group key={index} justify="space-between">
                    <Text fw={500}>{schedule.day}</Text>
                    <Text c="dimmed">{schedule.hours}</Text>
                  </Group>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

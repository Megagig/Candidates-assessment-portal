import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  Grid,
  Paper,
  Group,
  Stack,
  Button,
  ActionIcon,
  Box,
  Loader,
  Center,
  Modal,
  Divider,
  ThemeIcon,
  Timeline,
  Alert,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconMail,
  IconPhone,
  IconMapPin,
  IconCalendar,
  IconTrash,
  IconSend,
  IconUser,
  IconAlertCircle,
  IconCheck,
  IconClock,
} from '@tabler/icons-react';
import { useCandidate, useDeleteCandidate, useResendNotification } from '../../hooks';
import { TierBadge } from '../../components/candidate';

export const CandidateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data: candidate, isLoading, error } = useCandidate(id!);
  const { mutate: deleteCandidate, isPending: isDeleting } = useDeleteCandidate();
  const { mutate: resendNotification, isPending: isResending } = useResendNotification();

  if (isLoading) {
    return (
      <Center h="80vh">
        <Stack align="center" gap="md">
          <Loader size="xl" />
          <Text c="dimmed">Loading candidate details...</Text>
        </Stack>
      </Center>
    );
  }

  if (error || !candidate) {
    return (
      <Container size="sm" py="xl">
        <Paper p="xl" radius="md" withBorder>
          <Stack align="center" gap="md">
            <ThemeIcon size={60} radius="xl" variant="light" color="red">
              <IconAlertCircle size={30} />
            </ThemeIcon>
            <Title order={3}>Candidate not found</Title>
            <Text c="dimmed" ta="center">
              The candidate you're looking for doesn't exist or has been removed.
            </Text>
            <Button variant="light" onClick={() => navigate('/admin/candidates')} leftSection={<IconArrowLeft size={16} />}>
              Back to Candidates
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  const handleDelete = () => {
    deleteCandidate(candidate._id, {
      onSuccess: () => {
        navigate('/admin/candidates');
      },
    });
  };

  const handleResendNotification = () => {
    resendNotification(candidate._id);
  };

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Group justify="space-between" align="flex-start">
          <Group gap="md">
            <ActionIcon variant="light" size="lg" onClick={() => navigate('/admin/candidates')}>
              <IconArrowLeft size={20} />
            </ActionIcon>
            <Box>
              <Group gap="sm" mb={4}>
                <Title order={2}>{candidate.name}</Title>
                <TierBadge tier={candidate.assignedTier} />
              </Group>
              <Group gap="xs">
                <IconMail size={16} />
                <Text c="dimmed" size="sm">
                  {candidate.email}
                </Text>
              </Group>
            </Box>
          </Group>
          <Button color="red" leftSection={<IconTrash size={18} />} onClick={() => setShowDeleteModal(true)}>
            Delete
          </Button>
        </Group>

        <Grid>
          {/* Personal Information */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper p="xl" radius="md" withBorder h="100%">
              <Group mb="xl">
                <ThemeIcon size={40} radius="md" variant="light" color="blue">
                  <IconUser size={20} />
                </ThemeIcon>
                <Title order={3}>Personal Information</Title>
              </Group>

              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <InfoField label="Full Name" value={candidate.name} icon={<IconUser size={16} />} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <InfoField label="Email" value={candidate.email} icon={<IconMail size={16} />} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <InfoField label="Phone" value={candidate.phone || 'Not provided'} icon={<IconPhone size={16} />} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <InfoField label="Location" value={candidate.location || 'Not provided'} icon={<IconMapPin size={16} />} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <InfoField
                    label="Registration Date"
                    value={new Date(candidate.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    icon={<IconCalendar size={16} />}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Group gap={6}>
                      <IconCheck size={16} color="var(--mantine-color-dimmed)" />
                      <Text size="sm" c="dimmed" fw={500}>
                        Assigned Tier
                      </Text>
                    </Group>
                    <TierBadge tier={candidate.assignedTier} size="lg" />
                  </Stack>
                </Grid.Col>
              </Grid>
            </Paper>
          </Grid.Col>

          {/* Notification Status */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper p="xl" radius="md" withBorder h="100%">
              <Group mb="xl">
                <ThemeIcon size={40} radius="md" variant="light" color={candidate.notificationSent ? 'green' : 'yellow'}>
                  {candidate.notificationSent ? <IconCheck size={20} /> : <IconClock size={20} />}
                </ThemeIcon>
                <Title order={3}>Notification</Title>
              </Group>

              <Stack gap="lg">
                <Alert
                  icon={candidate.notificationSent ? <IconCheck size={16} /> : <IconClock size={16} />}
                  color={candidate.notificationSent ? 'green' : 'yellow'}
                  variant="light"
                >
                  <Text size="sm" fw={500}>
                    Status: {candidate.notificationSent ? 'Sent' : 'Pending'}
                  </Text>
                </Alert>

                <Button
                  fullWidth
                  variant="light"
                  leftSection={<IconSend size={18} />}
                  onClick={handleResendNotification}
                  loading={isResending}
                >
                  {candidate.notificationSent ? 'Resend Email' : 'Send Email'}
                </Button>

                <Divider />

                <Stack gap="xs">
                  <Text size="sm" fw={500}>
                    Email Details
                  </Text>
                  <Text size="xs" c="dimmed">
                    The notification email contains the candidate's tier assignment and next steps.
                  </Text>
                </Stack>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>

        {/* Assessment Responses */}
        <Paper p="xl" radius="md" withBorder>
          <Group mb="xl">
            <ThemeIcon size={40} radius="md" variant="light" color="violet">
              <IconCheck size={20} />
            </ThemeIcon>
            <Box>
              <Title order={3}>Assessment Responses</Title>
              <Text c="dimmed" size="sm">
                {candidate.assessmentResponses.length} questions answered
              </Text>
            </Box>
          </Group>

          <Timeline active={candidate.assessmentResponses.length} bulletSize={24} lineWidth={2}>
            {candidate.assessmentResponses.map((response, index) => (
              <Timeline.Item
                key={response.questionId}
                bullet={<Text size="xs" fw={700}>{index + 1}</Text>}
                title={
                  <Text fw={500} size="sm">
                    {response.question}
                  </Text>
                }
              >
                <Paper p="md" mt="xs" radius="sm" withBorder bg="gray.0" style={{ borderLeft: '3px solid var(--mantine-color-violet-5)' }}>
                  <Text size="sm">{String(response.answer)}</Text>
                </Paper>
              </Timeline.Item>
            ))}
          </Timeline>
        </Paper>
      </Stack>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title={
          <Group gap="sm">
            <ThemeIcon color="red" variant="light">
              <IconTrash size={18} />
            </ThemeIcon>
            <Text fw={600}>Delete Candidate</Text>
          </Group>
        }
        centered
      >
        <Stack gap="lg">
          <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
            <Text size="sm">
              Are you sure you want to delete <strong>{candidate.name}</strong>? This action cannot be undone.
            </Text>
          </Alert>

          <Group justify="flex-end" gap="sm">
            <Button variant="light" onClick={() => setShowDeleteModal(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDelete} loading={isDeleting} leftSection={<IconTrash size={16} />}>
              Delete Candidate
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

interface InfoFieldProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value, icon }) => {
  return (
    <Stack gap={4}>
      <Group gap={6}>
        {icon}
        <Text size="sm" c="dimmed" fw={500}>
          {label}
        </Text>
      </Group>
      <Text size="sm" fw={500}>
        {value}
      </Text>
    </Stack>
  );
};

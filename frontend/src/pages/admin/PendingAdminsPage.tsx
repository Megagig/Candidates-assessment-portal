import React, { useState } from 'react';
import {
  Container,
  Title,
  Text,
  Paper,
  Table,
  Group,
  Stack,
  Badge,
  Button,
  ActionIcon,
  Tooltip,
  Loader,
  Center,
  Modal,
  Textarea,
  Checkbox,
  Box,
  ThemeIcon,
} from '@mantine/core';
import {
  IconCheck,
  IconX,
  IconUserCheck,
  IconUserX,
  IconClock,
  IconRefresh,
  IconAlertCircle,
} from '@tabler/icons-react';
import {
  usePendingAdmins,
  useApproveAdmin,
  useRejectAdmin,
  useBulkApproveAdmins,
  useBulkRejectAdmins,
} from '../../hooks';
import type { User } from '../../types';

export const PendingAdminsPage: React.FC = () => {
  const { data, isLoading, error, refetch } = usePendingAdmins();
  const approveAdmin = useApproveAdmin();
  const rejectAdmin = useRejectAdmin();
  const bulkApprove = useBulkApproveAdmins();
  const bulkReject = useBulkRejectAdmins();

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [bulkRejectModalOpen, setBulkRejectModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<User | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedAdmins, setSelectedAdmins] = useState<string[]>([]);

  const pendingAdmins = data?.data || [];

  const handleApprove = (adminId: string) => {
    approveAdmin.mutate(adminId);
  };

  const handleRejectClick = (admin: User) => {
    setSelectedAdmin(admin);
    setRejectReason('');
    setRejectModalOpen(true);
  };

  const handleRejectConfirm = () => {
    if (selectedAdmin && rejectReason.trim()) {
      rejectAdmin.mutate(
        { adminId: selectedAdmin._id, reason: rejectReason },
        {
          onSuccess: () => {
            setRejectModalOpen(false);
            setSelectedAdmin(null);
            setRejectReason('');
          },
        }
      );
    }
  };

  const handleBulkApprove = () => {
    if (selectedAdmins.length > 0) {
      bulkApprove.mutate(selectedAdmins, {
        onSuccess: () => {
          setSelectedAdmins([]);
        },
      });
    }
  };

  const handleBulkRejectClick = () => {
    if (selectedAdmins.length > 0) {
      setRejectReason('');
      setBulkRejectModalOpen(true);
    }
  };

  const handleBulkRejectConfirm = () => {
    if (selectedAdmins.length > 0 && rejectReason.trim()) {
      bulkReject.mutate(
        { adminIds: selectedAdmins, reason: rejectReason },
        {
          onSuccess: () => {
            setBulkRejectModalOpen(false);
            setSelectedAdmins([]);
            setRejectReason('');
          },
        }
      );
    }
  };

  const toggleSelectAdmin = (adminId: string) => {
    setSelectedAdmins((prev) =>
      prev.includes(adminId) ? prev.filter((id) => id !== adminId) : [...prev, adminId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedAdmins.length === pendingAdmins.length) {
      setSelectedAdmins([]);
    } else {
      setSelectedAdmins(pendingAdmins.map((admin) => admin._id));
    }
  };

  if (isLoading) {
    return (
      <Center h="80vh">
        <Stack align="center" gap="md">
          <Loader size="xl" />
          <Text c="dimmed">Loading pending admins...</Text>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return (
      <Container size="sm" py="xl">
        <Paper p="xl" radius="md" withBorder>
          <Stack align="center" gap="md">
            <ThemeIcon size={60} radius="xl" variant="light" color="red">
              <IconAlertCircle size={30} />
            </ThemeIcon>
            <Title order={3}>Failed to load pending admins</Title>
            <Text c="dimmed" ta="center">
              There was an error loading the data. Please try again.
            </Text>
            <Button onClick={() => refetch()} leftSection={<IconRefresh size={16} />}>
              Retry
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Group justify="space-between" align="flex-start">
          <Box>
            <Group gap="sm" mb="xs">
              <Title order={1}>Pending Admin Registrations</Title>
              <Badge size="lg" variant="dot" color={pendingAdmins.length > 0 ? 'orange' : 'gray'}>
                {pendingAdmins.length} Pending
              </Badge>
            </Group>
            <Text c="dimmed" size="sm">
              Review and approve or reject admin registration requests
            </Text>
          </Box>
          <Tooltip label="Refresh data">
            <ActionIcon variant="light" onClick={() => refetch()} size="lg">
              <IconRefresh size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>

        {/* Bulk Actions */}
        {selectedAdmins.length > 0 && (
          <Paper p="md" radius="md" withBorder bg="blue.0">
            <Group justify="space-between">
              <Text size="sm" fw={500}>
                {selectedAdmins.length} admin(s) selected
              </Text>
              <Group gap="xs">
                <Button
                  size="sm"
                  color="green"
                  leftSection={<IconUserCheck size={16} />}
                  onClick={handleBulkApprove}
                  loading={bulkApprove.isPending}
                >
                  Approve Selected
                </Button>
                <Button
                  size="sm"
                  color="red"
                  leftSection={<IconUserX size={16} />}
                  onClick={handleBulkRejectClick}
                  loading={bulkReject.isPending}
                >
                  Reject Selected
                </Button>
                <Button size="sm" variant="subtle" onClick={() => setSelectedAdmins([])}>
                  Clear Selection
                </Button>
              </Group>
            </Group>
          </Paper>
        )}

        {/* Table */}
        <Paper radius="md" withBorder>
          {pendingAdmins.length === 0 ? (
            <Center p="xl">
              <Stack align="center" gap="md">
                <ThemeIcon size={80} radius="xl" variant="light" color="gray">
                  <IconClock size={40} />
                </ThemeIcon>
                <Title order={3}>No Pending Registrations</Title>
                <Text c="dimmed" ta="center">
                  All admin registrations have been reviewed. New requests will appear here.
                </Text>
              </Stack>
            </Center>
          ) : (
            <Table.ScrollContainer minWidth={800}>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>
                      <Checkbox
                        checked={
                          selectedAdmins.length === pendingAdmins.length &&
                          pendingAdmins.length > 0
                        }
                        indeterminate={
                          selectedAdmins.length > 0 &&
                          selectedAdmins.length < pendingAdmins.length
                        }
                        onChange={toggleSelectAll}
                      />
                    </Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Email</Table.Th>
                    <Table.Th>Role</Table.Th>
                    <Table.Th>Registered</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {pendingAdmins.map((admin) => (
                    <Table.Tr key={admin._id}>
                      <Table.Td>
                        <Checkbox
                          checked={selectedAdmins.includes(admin._id)}
                          onChange={() => toggleSelectAdmin(admin._id)}
                        />
                      </Table.Td>
                      <Table.Td>
                        <Text fw={500}>{admin.name}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">
                          {admin.email}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge color="blue" variant="light">
                          {admin.role}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">
                          {new Date(admin.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <Tooltip label="Approve">
                            <ActionIcon
                              color="green"
                              variant="light"
                              onClick={() => handleApprove(admin._id)}
                              loading={approveAdmin.isPending}
                            >
                              <IconCheck size={16} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Reject">
                            <ActionIcon
                              color="red"
                              variant="light"
                              onClick={() => handleRejectClick(admin)}
                              loading={rejectAdmin.isPending}
                            >
                              <IconX size={16} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          )}
        </Paper>
      </Stack>

      {/* Reject Modal */}
      <Modal
        opened={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        title="Reject Admin Registration"
        centered
      >
        <Stack gap="md">
          <Text size="sm">
            You are about to reject the admin registration for{' '}
            <Text component="span" fw={600}>
              {selectedAdmin?.name}
            </Text>
            . Please provide a reason for rejection.
          </Text>
          <Textarea
            label="Rejection Reason"
            placeholder="Enter the reason for rejection..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            minRows={4}
            required
          />
          <Group justify="flex-end" gap="xs">
            <Button variant="subtle" onClick={() => setRejectModalOpen(false)}>
              Cancel
            </Button>
            <Button
              color="red"
              onClick={handleRejectConfirm}
              disabled={!rejectReason.trim()}
              loading={rejectAdmin.isPending}
            >
              Reject Admin
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Bulk Reject Modal */}
      <Modal
        opened={bulkRejectModalOpen}
        onClose={() => setBulkRejectModalOpen(false)}
        title="Bulk Reject Admin Registrations"
        centered
      >
        <Stack gap="md">
          <Text size="sm">
            You are about to reject {selectedAdmins.length} admin registration(s). Please provide a
            reason for rejection.
          </Text>
          <Textarea
            label="Rejection Reason"
            placeholder="Enter the reason for rejection..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            minRows={4}
            required
          />
          <Group justify="flex-end" gap="xs">
            <Button variant="subtle" onClick={() => setBulkRejectModalOpen(false)}>
              Cancel
            </Button>
            <Button
              color="red"
              onClick={handleBulkRejectConfirm}
              disabled={!rejectReason.trim()}
              loading={bulkReject.isPending}
            >
              Reject {selectedAdmins.length} Admin(s)
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

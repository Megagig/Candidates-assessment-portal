import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Text,
  Grid,
  Paper,
  Group,
  Stack,
  Button,
  TextInput,
  Select,
  Badge,
  ActionIcon,
  Box,
  Loader,
  Center,
  Pagination,
} from '@mantine/core';
import {
  IconSearch,
  IconFilter,
  IconDownload,
  IconX,
  IconCalendar,
  IconUsers,
  IconFilterOff,
} from '@tabler/icons-react';
import { useCandidates } from '../../hooks/useCandidates';
import { useExportCandidates } from '../../hooks/useExportCandidates';
import { useCandidateStore } from '../../stores';
import { CandidateTable } from '../../components/candidate';
import type { Tier } from '../../types';

export const CandidatesListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const { currentPage, setPage, clearFilters } = useCandidateStore();
  const { mutate: exportCandidates, isPending: isExporting } = useExportCandidates();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Build query params
  const queryParams = {
    page: currentPage,
    limit: 10,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(selectedTier && { tier: parseInt(selectedTier) as Tier }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  };

  const { data, isLoading, error } = useCandidates(queryParams);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTier('');
    setStartDate('');
    setEndDate('');
    clearFilters();
  };

  const handleExport = () => {
    exportCandidates(queryParams);
  };

  if (isLoading && !data) {
    return (
      <Center h="80vh">
        <Stack align="center" gap="md">
          <Loader size="xl" />
          <Text c="dimmed">Loading candidates...</Text>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return (
      <Container size="sm" py="xl">
        <Paper p="xl" radius="md" withBorder>
          <Stack align="center" gap="md">
            <Title order={3}>Failed to load candidates</Title>
            <Text c="dimmed" ta="center">
              There was an error loading the candidates. Please try again.
            </Text>
          </Stack>
        </Paper>
      </Container>
    );
  }

  const candidates = data?.data || [];
  const hasFilters = searchQuery || selectedTier || startDate || endDate;

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Group justify="space-between" align="flex-start">
          <Box>
            <Group gap="sm" mb="xs">
              <Title order={1}>Candidates</Title>
              <Badge size="lg" variant="light" color="blue" leftSection={<IconUsers size={14} />}>
                {data?.pagination.total || 0} Total
              </Badge>
              {hasFilters && (
                <Badge size="lg" variant="light" color="violet" leftSection={<IconFilter size={14} />}>
                  {candidates.length} Filtered
                </Badge>
              )}
            </Group>
            <Text c="dimmed" size="sm">
              Browse and manage all candidate registrations
            </Text>
          </Box>
          <Button
            leftSection={<IconDownload size={18} />}
            onClick={handleExport}
            loading={isExporting}
            variant="light"
          >
            Export CSV
          </Button>
        </Group>

        {/* Filters */}
        <Paper p="xl" radius="md" withBorder>
          <Group justify="space-between" mb="lg">
            <Group gap="sm">
              <IconFilter size={20} />
              <Title order={4}>Filters</Title>
            </Group>
            {hasFilters && (
              <Button
                variant="subtle"
                color="red"
                size="xs"
                leftSection={<IconFilterOff size={16} />}
                onClick={handleClearFilters}
              >
                Clear All
              </Button>
            )}
          </Group>

          <Grid>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <TextInput
                label="Search"
                placeholder="Name, email, phone..."
                leftSection={<IconSearch size={16} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                rightSection={
                  searchQuery && (
                    <ActionIcon variant="subtle" onClick={() => setSearchQuery('')}>
                      <IconX size={16} />
                    </ActionIcon>
                  )
                }
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Select
                label="Tier Filter"
                placeholder="All tiers"
                data={[
                  { value: '', label: 'All Tiers' },
                  { value: '0', label: 'Tier 0' },
                  { value: '1', label: 'Tier 1' },
                  { value: '2', label: 'Tier 2' },
                  { value: '3', label: 'Tier 3' },
                  { value: '4', label: 'Tier 4' },
                  { value: '5', label: 'Tier 5' },
                ]}
                value={selectedTier}
                onChange={(value) => setSelectedTier(value || '')}
                clearable
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <TextInput
                label="From Date"
                type="date"
                leftSection={<IconCalendar size={16} />}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <TextInput
                label="To Date"
                type="date"
                leftSection={<IconCalendar size={16} />}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Table */}
        <Paper radius="md" withBorder>
          {candidates.length > 0 ? (
            <>
              <Box style={{ overflowX: 'auto' }}>
                <CandidateTable candidates={candidates} />
              </Box>

              {/* Pagination */}
              {data && data.pagination.pages > 1 && (
                <Box p="lg" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
                  <Group justify="space-between" align="center">
                    <Text size="sm" c="dimmed">
                      Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, data.pagination.total)} of {data.pagination.total} results
                    </Text>
                    <Pagination
                      total={data.pagination.pages}
                      value={currentPage}
                      onChange={setPage}
                      size="sm"
                    />
                  </Group>
                </Box>
              )}
            </>
          ) : (
            <Box p="xl">
              <Stack align="center" gap="md" py="xl">
                <IconUsers size={64} stroke={1.5} color="var(--mantine-color-gray-4)" />
                <Title order={3} c="dimmed">
                  {hasFilters ? 'No candidates found' : 'No candidates yet'}
                </Title>
                <Text c="dimmed" ta="center" size="sm">
                  {hasFilters
                    ? 'Try adjusting your search or filters to find what you\'re looking for'
                    : 'New candidate registrations will appear here'}
                </Text>
                {hasFilters && (
                  <Button variant="light" onClick={handleClearFilters} leftSection={<IconFilterOff size={16} />}>
                    Clear Filters
                  </Button>
                )}
              </Stack>
            </Box>
          )}
        </Paper>
      </Stack>
    </Container>
  );
};

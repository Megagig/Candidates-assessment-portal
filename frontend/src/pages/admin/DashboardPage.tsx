import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  Grid,
  Paper,
  Group,
  Stack,
  ThemeIcon,
  Badge,
  ActionIcon,
  Tooltip,
  Box,
  Loader,
  Center,
} from '@mantine/core';
import {
  IconUsers,
  IconClock,
  IconChartBar,
  IconArrowUpRight,
  IconArrowDownRight,
  IconRefresh,
  IconEye,
  IconUserPlus,
  IconFileText,
} from '@tabler/icons-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { useCandidateStats } from '../../hooks';

const TIER_COLORS = ['#868e96', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

export const DashboardPage: React.FC = () => {
  const { data: stats, isLoading, error, refetch } = useCandidateStats();

  if (isLoading) {
    return (
      <Center h="80vh">
        <Stack align="center" gap="md">
          <Loader size="xl" />
          <Text c="dimmed">Loading dashboard...</Text>
        </Stack>
      </Center>
    );
  }

  if (error || !stats) {
    return (
      <Container size="sm" py="xl">
        <Paper p="xl" radius="md" withBorder>
          <Stack align="center" gap="md">
            <ThemeIcon size={60} radius="xl" variant="light" color="red">
              <IconChartBar size={30} />
            </ThemeIcon>
            <Title order={3}>Failed to load statistics</Title>
            <Text c="dimmed" ta="center">
              There was an error loading the dashboard data. Please try again.
            </Text>
          </Stack>
        </Paper>
      </Container>
    );
  }

  const pieData = stats.tierDistribution.map((tier) => ({
    name: `Tier ${tier.tier}`,
    value: tier.count,
    percentage: tier.percentage,
  }));

  const barData = stats.tierDistribution.map((tier) => ({
    tier: `T${tier.tier}`,
    count: tier.count,
  }));

  const lineData = stats.registrationsOverTime.map((item) => ({
    date: new Date(item._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    count: item.count,
  }));

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Group justify="space-between" align="flex-start">
          <Box>
            <Group gap="sm" mb="xs">
              <Title order={1}>Dashboard Overview</Title>
              <Badge size="lg" variant="dot" color="green">
                Live
              </Badge>
            </Group>
            <Text c="dimmed" size="sm">
              Real-time candidate analytics and insights
            </Text>
          </Box>
          <Group gap="xs">
            <Text c="dimmed" size="sm">
              {new Date().toLocaleTimeString()}
            </Text>
            <Tooltip label="Refresh data">
              <ActionIcon variant="light" onClick={() => refetch()}>
                <IconRefresh size={18} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        {/* Stats Cards */}
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <StatsCard
              title="Total Candidates"
              value={stats.totalCandidates}
              trend="+12.5%"
              trendUp={true}
              icon={<IconUsers size={24} />}
              color="blue"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <StatsCard
              title="Recent Registrations"
              value={stats.recentRegistrations}
              subtitle="Last 7 days"
              trend="+8.2%"
              trendUp={true}
              icon={<IconClock size={24} />}
              color="green"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <StatsCard
              title="Skill Tiers"
              value={6}
              subtitle="T0 to T5"
              icon={<IconChartBar size={24} />}
              color="violet"
            />
          </Grid.Col>
        </Grid>

        {/* Charts */}
        <Grid>
          {/* Pie Chart */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Paper p="xl" radius="md" withBorder h="100%">
              <Group justify="space-between" mb="xl">
                <Box>
                  <Title order={3} mb={4}>
                    Tier Distribution
                  </Title>
                  <Text c="dimmed" size="sm">
                    Candidate skill level breakdown
                  </Text>
                </Box>
                <ThemeIcon size={48} radius="md" variant="gradient" gradient={{ from: 'blue', to: 'violet' }}>
                  <IconChartBar size={24} />
                </ThemeIcon>
              </Group>
              {stats.totalCandidates > 0 ? (
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.percentage}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={800}
                    >
                      {pieData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={TIER_COLORS[index % TIER_COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Center h={320}>
                  <Stack align="center" gap="sm">
                    <IconChartBar size={48} stroke={1.5} color="var(--mantine-color-gray-4)" />
                    <Text c="dimmed">No data available</Text>
                  </Stack>
                </Center>
              )}
            </Paper>
          </Grid.Col>

          {/* Bar Chart */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Paper p="xl" radius="md" withBorder h="100%">
              <Group justify="space-between" mb="xl">
                <Box>
                  <Title order={3} mb={4}>
                    Candidates per Tier
                  </Title>
                  <Text c="dimmed" size="sm">
                    Distribution across skill tiers
                  </Text>
                </Box>
                <ThemeIcon size={48} radius="md" variant="gradient" gradient={{ from: 'green', to: 'teal' }}>
                  <IconChartBar size={24} />
                </ThemeIcon>
              </Group>
              {stats.totalCandidates > 0 ? (
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="tier" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="count" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} animationBegin={0} animationDuration={800} />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Center h={320}>
                  <Stack align="center" gap="sm">
                    <IconChartBar size={48} stroke={1.5} color="var(--mantine-color-gray-4)" />
                    <Text c="dimmed">No data available</Text>
                  </Stack>
                </Center>
              )}
            </Paper>
          </Grid.Col>
        </Grid>

        {/* Line Chart */}
        <Paper p="xl" radius="md" withBorder>
          <Group justify="space-between" mb="xl">
            <Box>
              <Title order={3} mb={4}>
                Registrations Over Time
              </Title>
              <Text c="dimmed" size="sm">
                Last 7 days trend
              </Text>
            </Box>
            <ThemeIcon size={48} radius="md" variant="gradient" gradient={{ from: 'violet', to: 'pink' }}>
              <IconUserPlus size={24} />
            </ThemeIcon>
          </Group>
          {lineData.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  name="Registrations"
                  dot={{ fill: '#8B5CF6', r: 6 }}
                  activeDot={{ r: 8 }}
                  animationBegin={0}
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <Center h={320}>
              <Stack align="center" gap="sm">
                <IconUserPlus size={48} stroke={1.5} color="var(--mantine-color-gray-4)" />
                <Text c="dimmed">No registrations in the last 7 days</Text>
              </Stack>
            </Center>
          )}
        </Paper>

        {/* Quick Actions */}
        <Paper p="xl" radius="md" withBorder>
          <Title order={3} mb="xl">
            Quick Actions
          </Title>
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <ActionCard
                to="/admin/candidates"
                icon={<IconUsers size={24} />}
                title="View All Candidates"
                description="Browse and manage candidates"
                color="blue"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <ActionCard
                to="/admin/candidates?filter=recent"
                icon={<IconClock size={24} />}
                title="Recent Submissions"
                description="View latest registrations"
                color="green"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <ActionCard
                to="/"
                icon={<IconFileText size={24} />}
                title="Application Form"
                description="View public registration page"
                color="violet"
              />
            </Grid.Col>
          </Grid>
        </Paper>
      </Stack>
    </Container>
  );
};

interface StatsCardProps {
  title: string;
  value: number;
  subtitle?: string;
  trend?: string;
  trendUp?: boolean;
  icon: React.ReactNode;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle, trend, trendUp, icon, color }) => {
  return (
    <Paper p="xl" radius="md" withBorder style={{ height: '100%' }}>
      <Group justify="space-between" align="flex-start">
        <Stack gap="xs" style={{ flex: 1 }}>
          <Text size="sm" c="dimmed" fw={500}>
            {title}
          </Text>
          <Title order={2}>{value.toLocaleString()}</Title>
          {subtitle && (
            <Text size="xs" c="dimmed">
              {subtitle}
            </Text>
          )}
          {trend && (
            <Group gap={4}>
              {trendUp ? <IconArrowUpRight size={16} color="var(--mantine-color-green-6)" /> : <IconArrowDownRight size={16} color="var(--mantine-color-red-6)" />}
              <Text size="sm" c={trendUp ? 'green' : 'red'} fw={500}>
                {trend}
              </Text>
            </Group>
          )}
        </Stack>
        <ThemeIcon size={56} radius="md" variant="light" color={color}>
          {icon}
        </ThemeIcon>
      </Group>
    </Paper>
  );
};

interface ActionCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ to, icon, title, description, color }) => {
  return (
    <Paper
      component={Link}
      to={to}
      p="lg"
      radius="md"
      withBorder
      style={{
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        height: '100%',
      }}
      className="hover-card"
    >
      <Group align="flex-start" gap="md">
        <ThemeIcon size={48} radius="md" variant="light" color={color}>
          {icon}
        </ThemeIcon>
        <Stack gap={4} style={{ flex: 1 }}>
          <Group justify="space-between">
            <Text fw={600} size="sm">
              {title}
            </Text>
            <IconEye size={16} color="var(--mantine-color-dimmed)" />
          </Group>
          <Text size="xs" c="dimmed">
            {description}
          </Text>
        </Stack>
      </Group>
    </Paper>
  );
};

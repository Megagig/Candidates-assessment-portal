import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Stepper,
  Group,
  Box,
  Stack,
} from '@mantine/core';
import { IconUser, IconMail, IconPhone, IconMapPin, IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import { Navigation } from '../../components/landing';
import { AssessmentForm } from '../../components';
import { useRegisterCandidate } from '../../hooks';
import { transformAssessmentAnswers } from '../../utils/assessmentTransform';

const personalInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  location: z.string().optional(),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoFormData | null>(null);
  const { mutate: registerCandidate, isPending } = useRegisterCandidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo || undefined,
  });

  const onPersonalInfoSubmit = (data: PersonalInfoFormData) => {
    setPersonalInfo(data);
    setActive(1);
  };

  const handleAssessmentSubmit = (answers: Record<string, string>) => {
    if (!personalInfo) return;

    const assessmentResponses = transformAssessmentAnswers(answers);

    registerCandidate(
      {
        ...personalInfo,
        assessmentResponses,
      },
      {
        onSuccess: () => {
          navigate('/registration-success');
        },
      }
    );
  };

  return (
    <Box style={{ minHeight: '100vh', background: 'var(--mantine-color-body)' }}>
      <Navigation />
      <Box
        style={{
          background: 'linear-gradient(135deg, var(--mantine-color-blue-0) 0%, var(--mantine-color-violet-0) 100%)',
          padding: 'var(--mantine-spacing-xl) var(--mantine-spacing-md)',
        }}
      >
      <Container size="md" py="xl">
        <Paper shadow="xl" radius="lg" p="xl" withBorder>
          {/* Header */}
          <Stack gap="md" mb="xl">
            <Title order={1} ta="center">
              Candidate Registration
            </Title>
            <Text size="lg" c="dimmed" ta="center">
              {active === 0 ? 'Tell us about yourself' : 'Complete the skill assessment'}
            </Text>
          </Stack>

          {/* Stepper */}
          <Stepper active={active} onStepClick={setActive} mb="xl" allowNextStepsSelect={false}>
            <Stepper.Step
              label="Personal Info"
              description="Your details"
              icon={<IconUser size={18} />}
            >
              <form onSubmit={handleSubmit(onPersonalInfoSubmit)}>
                <Stack gap="md" mt="xl">
                  <TextInput
                    {...register('name')}
                    label="Full Name"
                    placeholder="John Doe"
                    leftSection={<IconUser size={16} />}
                    error={errors.name?.message}
                    required
                    size="md"
                  />

                  <TextInput
                    {...register('email')}
                    label="Email Address"
                    placeholder="john@example.com"
                    leftSection={<IconMail size={16} />}
                    error={errors.email?.message}
                    required
                    size="md"
                    type="email"
                  />

                  <TextInput
                    {...register('phone')}
                    label="Phone Number"
                    placeholder="+1 (555) 123-4567"
                    leftSection={<IconPhone size={16} />}
                    error={errors.phone?.message}
                    size="md"
                  />

                  <TextInput
                    {...register('location')}
                    label="Location"
                    placeholder="City, Country"
                    leftSection={<IconMapPin size={16} />}
                    error={errors.location?.message}
                    size="md"
                  />

                  <Group justify="space-between" mt="xl">
                    <Button
                      variant="default"
                      onClick={() => navigate('/')}
                      size="md"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      rightSection={<IconArrowRight size={16} />}
                      size="md"
                      variant="gradient"
                      gradient={{ from: 'blue', to: 'violet' }}
                    >
                      Next: Assessment
                    </Button>
                  </Group>
                </Stack>
              </form>
            </Stepper.Step>

            <Stepper.Step
              label="Assessment"
              description="Skill evaluation"
              icon={<IconArrowRight size={18} />}
            >
              <Box mt="xl">
                <AssessmentForm onSubmit={handleAssessmentSubmit} isLoading={isPending} />
                <Group justify="center" mt="xl">
                  <Button
                    variant="default"
                    onClick={() => setActive(0)}
                    disabled={isPending}
                    leftSection={<IconArrowLeft size={16} />}
                    size="md"
                  >
                    Back to Personal Info
                  </Button>
                </Group>
              </Box>
            </Stepper.Step>
          </Stepper>
        </Paper>
      </Container>
    </Box>
    </Box>
  );
};

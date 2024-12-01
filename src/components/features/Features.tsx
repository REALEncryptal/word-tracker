import { IconDeviceFloppy, IconBrandGithub, IconUser } from '@tabler/icons-react';
import {
  Badge,
  Card,
  Container,
  Group,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import classes from './Features.module.css';

const mockdata = [
  {
    title: 'Open source',
    description:
      'Word Tracker is open source. You can see the code, run your own instance, or contribute to the project.',
    icon: IconBrandGithub,
  },
  {
    title: 'Privacy focused',
    description:
      'Your data is yours. We do not sell it.',
    icon: IconUser,
  },
  {
    title: 'Autosave',
    description:
      'Your writing is autosaved as you type. No need to worry about losing your work.',
    icon: IconDeviceFloppy,
  },
];

export function Features() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon size={50} stroke={2} color={theme.colors.blue[6]} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="md" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          OPEN SOURCE
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Get insights into your writing in real-time
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Word Tracker is a free, open-source tool that helps you write better.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
import { IconBrandGithub } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text } from '@mantine/core';
import Logo from '../Logo/Logo';
import classes from './Footer.module.css';

const data = [
  {
    title: 'About',
    links: [
      { label: 'Editor', link: '#editor' },
      { label: 'Features', link: '#features' },
      { label: 'FAQ', link: '#faq' },
    ],
  },
];

export function Footer() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Logo size={30} />
          <Text size="xs" c="dimmed" className={classes.description}>
            Get insights into your writing in real-time.
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2020 WordTracker.dev All rights reserved. <br />
          Made with ❤️ by <a href="https://github.com/REALEncryptal">Encryptal</a>
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandGithub size={18} stroke={1.5} onClick={() => window.open('https://github.com/REALEncryptal/word-tracker/', '_blank')}/>
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
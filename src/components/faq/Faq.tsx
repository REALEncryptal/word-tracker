import { Accordion, Container, Title } from '@mantine/core';
import classes from './Faq.module.css';

export function Faq() {
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        Frequently Asked Questions
      </Title>

      <Accordion variant="separated">

        <Accordion.Item className={classes.item} value="another-account">
          <Accordion.Control>What is Word Tracker?</Accordion.Control>
          <Accordion.Panel>Word Tracker is a free, open-source tool designed to help you improve your writing by providing real-time insights and analytics.</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="data-privacy">
          <Accordion.Control>Is my data private and secure?</Accordion.Control>
          <Accordion.Panel>Yes, your data is yours, and we do not sell it. Word Tracker is privacy-focused.</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="export-writing">
          <Accordion.Control>How can I export my writing?</Accordion.Control>
          <Accordion.Panel>You can export your document as Markdown using the export feature in the editor.</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="autosave">
          <Accordion.Control>Is my writing autosaved?</Accordion.Control>
          <Accordion.Panel>Yes, your writing is autosaved as you type.</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="open-source">
          <Accordion.Control>Is Word Tracker open source?</Accordion.Control>
          <Accordion.Panel>Yes, Word Tracker is open source. You can find the code on our GitHub repository.</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
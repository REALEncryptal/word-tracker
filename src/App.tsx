import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

import { MantineProvider } from '@mantine/core';

import Home from './pages/home/Home';

export default function App() {
  return <MantineProvider forceColorScheme='light'>{<Home />}</MantineProvider>;
}

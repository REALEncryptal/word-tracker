import { Divider } from '@mantine/core';
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { Editor } from '../../components/editor/Editor';
import { Features } from '../../components/features/Features';
import { Faq } from '../../components/faq/Faq';

import classes from './Home.module.css'

export default function Home() {
  return <div className={classes.root}>
    <Header />
    <Editor />
    <Divider mt={100} mb={20} />
    <Features />
    <Divider mt={20} mb={100} />
    <Faq />
    <Footer />
  </div>
}

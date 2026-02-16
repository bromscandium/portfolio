import { Helmet } from 'react-helmet';
import { useState } from 'react';
import {SectionScroller} from './components/SectionScroller';
import {Banner} from './sections/banner/Banner';
import {About} from './sections/about/About';
import {Skills} from './sections/skills/Skills';
import {Portfolio} from './sections/portfolio/Portfolio';
import {Contacts} from './sections/contacts/Contacts';
import './index.scss';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const PortfolioWithModal = () => <Portfolio onModalChange={setIsModalOpen} />;

  const sections = [Banner, About, Skills, PortfolioWithModal, Contacts];

  return (
    <>
      <Helmet>
        <title>Portfolio | Yaroslav Yeromenko</title>
      </Helmet>
      <SectionScroller sections={sections} isModalOpen={isModalOpen} />
    </>
  );
}
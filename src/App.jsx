import { Helmet } from 'react-helmet';
import { useState, useMemo } from 'react';
import { SectionScroller } from './components/SectionScroller';
import { Banner } from './sections/banner/Banner';
import { About } from './sections/about/About';
import { Skills } from './sections/skills/Skills';
import { Portfolio } from './sections/portfolio/Portfolio';
import { Contacts } from './sections/contacts/Contacts';
import './index.scss';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sections = useMemo(() => [
    Banner,
    About,
    Skills,
    function PortfolioWrapper(props) {
      return <Portfolio {...props} onModalChange={setIsModalOpen} />;
    },
    Contacts
  ], []);

  return (
    <>
      <Helmet>
        <title>Portfolio | Yaroslav Yeromenko</title>
      </Helmet>
      <SectionScroller sections={sections} isModalOpen={isModalOpen} />
    </>
  );
}
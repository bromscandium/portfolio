import {useRef} from "react";
import {Helmet} from 'react-helmet';
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import About from "../components/About/About.jsx";
import Skills from "../components/Skills/Skills.jsx";
import Portfolio from "../components/Portfolio/Portfolio.jsx";
import Footer from "../components/Footer/Footer";

function Home() {
    const bannerRef = useRef(null);
    const aboutRef = useRef(null);
    const skillsRef = useRef(null);
    const portfolioRef = useRef(null);
    const contactsRef = useRef(null);

    return (
        <>
            <Helmet>
                <title>Portfolio | Yaroslav Yeromenko</title>
            </Helmet>
            <Header
                triggerBannerHighlight={() => bannerRef.current && bannerRef.current()}
                triggerAboutHighlight={() => aboutRef.current && aboutRef.current()}
                triggerSkillsHighlight={() => skillsRef.current && skillsRef.current()}
                triggerPortfolioHighlight={() => portfolioRef.current && portfolioRef.current()}
                triggerContactsHighlight={() => contactsRef.current && contactsRef.current()}
            />

            <Banner onHighlightReady={(fn) => (bannerRef.current = fn)} triggerContactsHighlight={() => contactsRef.current && contactsRef.current()} triggerPortfolioHighlight={() => portfolioRef.current && portfolioRef.current()}/>
            <About onHighlightReady={(fn) => (aboutRef.current = fn)}/>
            <Skills onHighlightReady={(fn) => (skillsRef.current = fn)}/>
            <Portfolio onHighlightReady={(fn) => (portfolioRef.current = fn)}/>
            <Footer onHighlightReady={(fn) => (contactsRef.current = fn)}/>
        </>
    );
}

export default Home;

import { useRef } from "react";
import {Helmet} from 'react-helmet';
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import Introduction from "../components/Introduction/Introduction";
import List from "../components/List/List";
import Footer from "../components/Footer/Footer";

function Home() {
    const bannerRef = useRef(null);
    const introRef = useRef(null);
    const projectsRef = useRef(null);
    const footerRef = useRef(null);

    return (
        <>
            <Helmet>
                <title>Home | bromscandium</title>
            </Helmet>
            <Header
                triggerBannerHighlight={() => bannerRef.current && bannerRef.current()}
                triggerIntroHighlight={() => introRef.current && introRef.current()}
                triggerProjectsHighlight={() => projectsRef.current && projectsRef.current()}
                triggerFooterHighlight={() => footerRef.current && footerRef.current()}
            />

            <Banner onHighlightReady={(fn) => (bannerRef.current = fn)} />
            <Introduction onHighlightReady={(fn) => (introRef.current = fn)} />
            <List onHighlightReady={(fn) => (projectsRef.current = fn)} />
            <Footer onHighlightReady={(fn) => (footerRef.current = fn)} />
        </>
    );
}

export default Home;

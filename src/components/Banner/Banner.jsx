import {useEffect} from "react";
import {Link as ScrollLink} from "react-scroll";
import './Banner.sass';
import me3 from '/home/me3.png';
import {useHighlightAnimation} from "../../hooks/useHighlightAnimation";


function Banner({onHighlightReady, triggerPortfolioHighlight, triggerContactsHighlight}) {
    const [ref, isHighlighted, triggerHighlight] = useHighlightAnimation();

    useEffect(() => {
        if (onHighlightReady) {
            onHighlightReady(triggerHighlight);
        }
    }, [onHighlightReady, triggerHighlight]);

    return (
        <div ref={ref} className={`banner ${isHighlighted ? "highlight" : ""}`} id="home">
            <div className="banner-content">
                <h2>Hello, I'm</h2>
                <h1>Yaroslav Yeromenko</h1>
                <h2>Full-Stack developer</h2>
                <div className={`job-info`}>
                    <ScrollLink
                        to="portfolio"
                        smooth
                        duration={1500}
                        onClick={() => {
                            if (triggerPortfolioHighlight) {
                                setTimeout(() => triggerPortfolioHighlight(), 1600);
                            }
                        }}
                    >
                        <button className="portfolio-button">Check Portfolio</button>
                    </ScrollLink>
                    <ScrollLink
                        to="footer"
                        smooth
                        duration={1500}
                        onClick={() => {
                            if (triggerContactsHighlight) {
                                setTimeout(() => triggerContactsHighlight(), 1600);
                            }
                        }}
                    >
                        <button className="contact-button">Contact me</button>
                    </ScrollLink>
                </div>
            </div>
            <div className="pendulum">
                <img src={me3} alt="me3" className="me3"/>
                <div className="pendulum_box">
                    <div className="ball first"></div>
                    <div className="ball"></div>
                    <div className="ball"></div>
                    <div className="ball"></div>
                    <div className="ball last"></div>
                </div>
            </div>
        </div>
    );
}

export default Banner;

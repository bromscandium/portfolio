import React, {useEffect, useState} from "react";
import './Banner.sass';
import me3 from '/home/me3.png';
import {useHighlightAnimation} from "../../hooks/useHighlightAnimation";

function Banner({onHighlightReady}) {
    const [ref, isHighlighted, triggerHighlight] = useHighlightAnimation();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 1000);
    }, []);

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
                <h2>Full-Stack developer, student, self-taught guy</h2>
                <div className={`job-info ${isLoaded ? 'loaded' : ''}`}>
                    <h3>Currently looking for a job or an internship</h3>
                    <a href="mailto:kkmshbiu@protonmail.com">
                        <button className="contact-button">Contact me</button>
                    </a>
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

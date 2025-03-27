import React, {useEffect, useState} from "react";
import {introductionData} from "../../data/introductionData";
import me2 from "/home/me2.png";
import "./Introducion.sass";
import { useHighlightAnimation } from "../../hooks/useHighlightAnimation";

function Introduction({ onHighlightReady }) {
    const [ref, isHighlighted, triggerHighlight] = useHighlightAnimation();
    const [activeIndex, setActiveIndex] = useState(0);
    const [fade, setFade] = useState(true);

    const handleClick = (index) => {
        if (index === activeIndex) return;
        setFade(false);

        setTimeout(() => {
            setActiveIndex(index);
            setFade(true);
        }, 200);
    };

    useEffect(() => {
        if (onHighlightReady) {
            onHighlightReady(triggerHighlight);
        }
    }, [onHighlightReady, triggerHighlight]);

    useEffect(() => {
        if (onHighlightReady) {
            onHighlightReady(triggerHighlight);
        }
    }, [onHighlightReady, triggerHighlight]);

    return (
        <div ref={ref} className={`introduction ${isHighlighted ? "highlight" : ""}`} id="home">
            <div className="intro-container">
                <img src={me2} alt="me2" className="me2"/>
                <div className="intro-left">
                    <h1>About Me</h1>
                    <ul>
                        {introductionData.map((section, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handleClick(index)}
                                    className={activeIndex === index ? "active" : ""}
                                >
                                    {section.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={`intro-right ${fade ? "fade-in" : "fade-out"}`}>
                    <h2>{introductionData[activeIndex].heading}</h2>
                    <hr className="intro-divider"/>
                    {introductionData[activeIndex].text.map((paragraph, i) => (
                        <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
                    ))}
                </div>
            </div>

            <hr className="divider"/>
        </div>
    );
}

export default Introduction;

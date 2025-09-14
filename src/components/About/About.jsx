import {useEffect} from "react";
import "./About.sass";
import {useHighlightAnimation} from "../../hooks/useHighlightAnimation";

function About({onHighlightReady}) {
    const [ref, isHighlighted, triggerHighlight] = useHighlightAnimation();

    useEffect(() => {
        if (onHighlightReady) {
            onHighlightReady(triggerHighlight);
        }
    }, [onHighlightReady, triggerHighlight]);

    return (
        <div
            ref={ref}
            className={`about ${isHighlighted ? "highlight" : ""}`}
            id="home"
        >
            <div className="about-label">
                <h1>About Me</h1>
            </div>
            <div className="about__container">
                <div className="about__text">
                    <p>
                        I’m a Full-Stack Developer with experience in building modern web and
                        mobile applications. On the frontend I work with <b>React or Next.js</b>,
                        focusing on creating fast, responsive, and clean user interfaces.
                    </p>
                    <div className="divider"></div>
                    <p>
                        On the backend I use <b>Node.js, NestJS, Python (Django, FastAPI) and PostgreSQL as database</b>
                        to design APIs, manage data, and ensure scalable architectures. I’m
                        comfortable with the full development cycle - from database schema design
                        to deploying apps on VPS or cloud platforms.
                    </p>
                    <div className="divider"></div>
                    <p>
                        My projects range from news portals and expense trackers to custom CMS and
                        Telegram bots, where I integrate different technologies into solid,
                        production-ready solutions. I enjoy solving complex problems and delivering
                        software that is both practical and user-friendly.
                    </p>
                </div>


                <div className="about__info">
                    <ul>
                        <li>
                            <span className="label">Name:</span> Yaroslav Yeromenko
                        </li>
                        <li>
                            <span className="label">Email:</span>
                            <a href="mailto:kkmshbiu@protonmail.com">
                                kkmshbiu@protonmail.com
                            </a>
                        </li>
                        <li>
                            <span className="label">Location:</span> Remote, primarily EU and Ukraine
                        </li>
                        <li>
                            <span className="label">Languages:</span> Ukrainian (Native) | English (B2) | Slovak (B1) |
                            Czech (B1)
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default About;

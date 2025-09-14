import {Link as ScrollLink} from "react-scroll";
import './DesktopNavigation.sass';
import {useState} from "react";

function DesktopNavigation({
                               triggerBannerHighlight,
                               triggerAboutHighlight,
                               triggerSkillsHighlight,
                               triggerPortfolioHighlight,
                               triggerContactsHighlight
                           }) {
    const [lang, setLang] = useState("EN");

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setLang(newLang);
    };

    return (
        <header className="DesktopNavigation">
            <nav className="navbar">
                <h1 className="logo">Yaroslav Yeromenko</h1>
                <ul className="navlinks">
                    <li>
                        <ScrollLink
                            to="home"
                            smooth
                            duration={1500}
                            onClick={() => {
                                if (triggerBannerHighlight) {
                                    setTimeout(() => triggerBannerHighlight(), 1600);
                                }
                            }}
                        >
                            <button>Home</button>
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to="about"
                            smooth
                            duration={1500}
                            onClick={() => {
                                if (triggerAboutHighlight) {
                                    setTimeout(() => triggerAboutHighlight(), 1600);
                                }
                            }}
                        >
                            <button>About</button>
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to="skills"
                            smooth
                            duration={1500}
                            onClick={() => {
                                if (triggerSkillsHighlight) {
                                    setTimeout(() => triggerSkillsHighlight(), 1600);
                                }
                            }}
                        >
                            <button>Skills</button>
                        </ScrollLink>
                    </li>
                    <li>
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
                            <button>Portfolio</button>
                        </ScrollLink>
                    </li>
                    <li>
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
                            <button>Contacts</button>
                        </ScrollLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default DesktopNavigation;

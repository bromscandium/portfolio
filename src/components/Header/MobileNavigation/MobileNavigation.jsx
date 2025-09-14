import {useEffect, useState} from "react";
import {Link as ScrollLink} from "react-scroll";
import {FaBars, FaTimes, FaEnvelope, FaLinkedin, FaGithub} from "react-icons/fa";
import './MobileNavigation.sass';

function MobileNavigation({
                              triggerBannerHighlight,
                              triggerAboutHighlight,
                              triggerSkillsHighlight,
                              triggerPortfolioHighlight,
                              triggerContactsHighlight
                          }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
            document.documentElement.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
            document.documentElement.classList.remove('no-scroll');
        }
    }, [isOpen]);

    return (
        <header className="MobileNavigation">
            <nav className="navbar">
                <h1 className="logo">Yaroslav Yeromenko</h1>
                <div className="burger" onClick={toggleMenu}>
                    {isOpen ? <FaTimes size={30}/> : <FaBars size={30}/>}
                </div>
                <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
                <nav className={`navlinks ${isOpen ? 'open' : ''}`}>
                    <ul>
                        <li>
                            <ScrollLink
                                to="home"
                                smooth
                                duration={1500}
                                onClick={() => {
                                    setIsOpen(false);
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
                                    setIsOpen(false);
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
                                    setIsOpen(false);
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
                                    setIsOpen(false);
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
                                to="сontacts"
                                smooth
                                duration={1500}
                                onClick={() => {
                                    setIsOpen(false);
                                    if (triggerContactsHighlight) {
                                        setTimeout(() => triggerContactsHighlight(), 1600);
                                    }
                                }}
                            >
                                <button>Contacts</button>
                            </ScrollLink>
                        </li>
                    </ul>
                    <div className="social-icons">
                        <a href="mailto:kkmshbiu@protonmail.com" target="_blank" rel="noopener noreferrer"
                           className="contact-icon"><FaEnvelope size={32}/></a>
                        <a href="https://www.linkedin.com/in/yaroslav-yeromenko/" target="_blank"
                           rel="noopener noreferrer"
                           className="contact-icon"><FaLinkedin size={32}/></a>
                        <a href="https://github.com/bromscandium" target="_blank" rel="noopener noreferrer"
                           className="contact-icon"><FaGithub size={32}/></a>
                    </div>
                </nav>
            </nav>
        </header>

    );
}

export default MobileNavigation;

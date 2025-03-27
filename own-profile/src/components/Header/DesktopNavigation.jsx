import {Link as ScrollLink} from "react-scroll";
import './DesktopNavigation.sass';


function DesktopNavigation({
                               triggerBannerHighlight,
                               triggerIntroHighlight,
                               triggerProjectsHighlight,
                               triggerFooterHighlight
                           }) {
    return (
        <header className="DesktopNavigation">
            <nav className="navbar">
                <h1 className="logo">bromscandium</h1>
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
                            to="introduction"
                            smooth
                            duration={1500}
                            onClick={() => {
                                if (triggerIntroHighlight) {
                                    setTimeout(() => triggerIntroHighlight(), 1600);
                                }
                            }}
                        >
                            <button>About</button>
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to="list"
                            smooth
                            duration={1500}
                            onClick={() => {
                                if (triggerProjectsHighlight) {
                                    setTimeout(() => triggerProjectsHighlight(), 1600);
                                }
                            }}
                        >
                            <button>Projects</button>
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to="footer"
                            smooth
                            duration={1500}
                            onClick={() => {
                                if (triggerFooterHighlight) {
                                    setTimeout(() => triggerFooterHighlight(), 1600);
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

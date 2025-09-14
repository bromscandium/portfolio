import {useState, useEffect} from "react";
import DesktopNavigation from "./DesktopNavigation/DesktopNavigation.jsx";
import MobileNavigation from "./MobileNavigation/MobileNavigation.jsx";
import "./Header.sass";

function Header({
                    triggerBannerHighlight,
                    triggerAboutHighlight,
                    triggerSkillsHighlight,
                    triggerPortfolioHighlight,
                    triggerContactsHighlight
                }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1400);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1400);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
            setLastScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div className={`header ${isHidden ? "header--hidden" : ""}`}>
            {isMobile ? (
                <MobileNavigation
                    triggerBannerHighlight={triggerBannerHighlight}
                    triggerAboutHighlight={triggerAboutHighlight}
                    triggerSkillsHighlight={triggerSkillsHighlight}
                    triggerPortfolioHighlight={triggerPortfolioHighlight}
                    triggerContactsHighlight={triggerContactsHighlight}
                />
            ) : (
                <DesktopNavigation
                    triggerBannerHighlight={triggerBannerHighlight}
                    triggerAboutHighlight={triggerAboutHighlight}
                    triggerSkillsHighlight={triggerSkillsHighlight}
                    triggerPortfolioHighlight={triggerPortfolioHighlight}
                    triggerContactsHighlight={triggerContactsHighlight}
                />
            )}
        </div>
    );
}

export default Header;
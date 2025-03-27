import {useState, useEffect} from "react";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

function Header({
                    triggerBannerHighlight,
                    triggerIntroHighlight,
                    triggerProjectsHighlight,
                    triggerFooterHighlight
                }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            {isMobile ? (
                <MobileNavigation
                    triggerBannerHighlight={triggerBannerHighlight}
                    triggerIntroHighlight={triggerIntroHighlight}
                    triggerProjectsHighlight={triggerProjectsHighlight}
                    triggerFooterHighlight={triggerFooterHighlight}
                />
            ) : (
                <DesktopNavigation
                    triggerBannerHighlight={triggerBannerHighlight}
                    triggerIntroHighlight={triggerIntroHighlight}
                    triggerProjectsHighlight={triggerProjectsHighlight}
                    triggerFooterHighlight={triggerFooterHighlight}
                />
            )}
        </div>
    );
}

export default Header;
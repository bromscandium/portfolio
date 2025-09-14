import "./Footer.sass";
import me4 from '/home/me4.png';
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {

    return (
        <footer className="footer">
            <img src={me4} alt="me4" className="me4" />
            <div className="footer-content">
                <div className="contacts-section">
                    <h2>Yaroslav Yeromenko</h2>
                    <div className="divider"></div>
                    <p className="contacts-text">
                        Full-Stack developer
                    </p>
                </div>

                <div className="media">
                    <h4>Contacts</h4>
                    <div className="media-icons">
                        <a href="mailto:kkmshbiu@protonmail.com" target="_blank" rel="noopener noreferrer">
                            <FaEnvelope size={32} />
                            <span className="tooltip">Email me</span>
                        </a>
                        <a href="https://www.linkedin.com/in/yaroslav-yeromenko/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={32} />
                            <span className="tooltip">LinkedIn</span>
                        </a>
                        <a href="https://github.com/bromscandium" target="_blank" rel="noopener noreferrer">
                            <FaGithub size={32} />
                            <span className="tooltip">GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2025, Made by Yaroslav Yeromenko</p>
            </div>
        </footer>
    );
}

export default Footer;

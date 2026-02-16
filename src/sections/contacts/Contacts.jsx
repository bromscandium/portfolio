import { useState, useEffect } from "react";
import "./contacts.scss";
import { contacts } from "../../data/contacts.js";

export const Contacts = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="contacts">
      <div className={`contacts-content ${hasAnimated ? 'fade-down' : ''}`}>
        <div className="contacts-section">
          <h2>Yaroslav Yeromenko</h2>
          <div className="divider" style={{ margin: '20px auto' }}></div>
          <p className="contacts-text">
            Full-Stack developer
          </p>
        </div>

        <div className="media">
          <h4>Contacts</h4>
          <div className="media-icons">
            {contacts.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <item.Icon size={32} />
                <span className="tooltip">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={`contacts-bottom ${hasAnimated ? 'fade-down' : ''}`}>
        <p>© 2026 | Made by Yaroslav Yeromenko</p>
      </div>
    </div>
  );
}
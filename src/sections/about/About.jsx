import { useState, useEffect } from "react";
import { about } from "../../data/about.js";
import "./about.scss";

export const About = () => {
  const [, setHasAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="about">
      <div className="section-header">
        <h1>About Me</h1>
      </div>
      <div className="about__container">
        <div className="about__text">
          {about.paragraphs.map((paragraph, index) => (
            <div key={index}>
              <p>
                {paragraph.text.split(paragraph.highlight[0]).map((part, i) => (
                  i === 0 ? part : (
                    <span key={i}>
                      <b>{paragraph.highlight[0]}</b>{part}
                    </span>
                  )
                ))}
              </p>
              {index < about.paragraphs.length - 1 && (
                <div className="divider"></div>
              )}
            </div>
          ))}
        </div>

        <div className="about__info">
          <ul>
            {about.info.map((item, index) => (
              <li key={index}>
                <span className="label">{item.label}</span>
                {item.link ? (
                  <a href={item.link}>{item.value}</a>
                ) : (
                  item.value
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { skills } from "../../data/skills.js";
import "./skills.scss";

export const Skills = () => {
  const [, setHasAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="skills">
      <div className="section-header">
        <h1>Skills</h1>
      </div>

      <div className="skills__gallery-wrapper">
        <div className="skills__gallery">
          {skills.map((cat, index) => (
            <div
              className="skills__card"
              key={cat.title}
            >
              <div className="skills__card-header">
                <span className="skills__card-number">0{index + 1}</span>
                <h3 className="skills__card-title">{cat.title}</h3>
              </div>
              <ul className="skills__list">
                {cat.items.map((item) => (
                  <li key={item} className="skills__item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="skills__scroll-indicator">
          Scroll to explore
        </div>
      </div>
    </div>
  );
}
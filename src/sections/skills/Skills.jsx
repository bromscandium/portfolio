import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { skills } from "../../data/skills.js";
import "./Skills.scss";

export const Skills = () => {
  const [, setHasAnimated] = useState(false);

  const galleryRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const checkScroll = () => {
    if (galleryRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <div className="skills">
      <div className="section-header">
        <h1>Skills</h1>
      </div>

      <div className="skills__gallery-wrapper">
        <div className="gallery-divider"></div>
        <div
          className="skills__gallery"
          ref={galleryRef}
          onScroll={checkScroll}
        >
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
        <div className="gallery-divider"></div>

        <div className="gallery-navigation">
          <button
            className="nav-arrow"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            className="nav-arrow"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
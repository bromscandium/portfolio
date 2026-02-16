import { useState, useEffect } from 'react';
import './banner.scss';

export const Banner = () => {
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHasAnimated(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
      <div className="banner">
          <div className={`banner-content ${hasAnimated ? 'fade-up' : ''}`}>
              <h2>Hello, I'm</h2>
              <h1>Yaroslav Yeromenko</h1>
              <h2>Full-Stack developer</h2>
              <div className="job-info">
                  <button className="portfolio-button">
                      Check Portfolio
                  </button>
                  <button className="contact-button">
                      Contact me
                  </button>
              </div>
          </div>
          <div className={`pendulum ${hasAnimated ? 'fade-up' : ''}`} style={{ animationDelay: '0.3s' }}>
              <div className="pendulum_box">
                  <div className="ball first"></div>
                  <div className="ball"></div>
                  <div className="ball"></div>
                  <div className="ball"></div>
                  <div className="ball last"></div>
              </div>
          </div>
      </div>
    );
}
import './Banner.scss';

export const Banner = ({ scrollToSection }) => {
    return (
      <div className="banner">
          <div className="banner-content">
              <h2>Hello, I'm</h2>
              <h1>Yaroslav Yeromenko</h1>
              <h2>Full-Stack developer</h2>
              <div className="job-info">
                  <button className="portfolio-button" onClick={() => scrollToSection(3)}>
                      Check Portfolio
                  </button>
                  <button className="contact-button" onClick={() => scrollToSection(4)}>
                      Contact me
                  </button>
              </div>
          </div>
          <div className="pendulum">
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
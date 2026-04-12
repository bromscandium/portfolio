import { useState, useEffect, useRef } from 'react';

export const SectionScroller = ({ sections, isModalOpen }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const lastScrollTime = useRef(Date.now());
  const hintTimer = useRef(null);

  const scrollToSection = (index) => {
    if (!isTransitioning && !isModalOpen) {
      setIsTransitioning(true);
      setCurrentSection(index);
      lastScrollTime.current = Date.now();
      setTimeout(() => setIsTransitioning(false), 1500);
    }
  };

  useEffect(() => {
    clearTimeout(hintTimer.current);
    if (currentSection === 0) {
      hintTimer.current = setTimeout(() => setShowScrollHint(true), 3000);
    } else {
      setShowScrollHint(false);
    }
    return () => clearTimeout(hintTimer.current);
  }, [currentSection]);

  useEffect(() => {
    const handleWheelGlobal = (e) => {
      if (isModalOpen || isTransitioning) return;

      if (Date.now() - lastScrollTime.current > 1500) {
        if (e.deltaY > 0 && currentSection < sections.length - 1) {
          scrollToSection(currentSection + 1);
        } else if (e.deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheelGlobal, { passive: false });
    return () => window.removeEventListener('wheel', handleWheelGlobal);
  }, [currentSection, isTransitioning, isModalOpen, sections.length]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      background: '#000'
    }}>
      {sections.map((Section, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            opacity: currentSection === index ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            pointerEvents: currentSection === index ? 'auto' : 'none',
            overflow: 'hidden'
          }}
        >
          <Section scrollToSection={scrollToSection} />
        </div>
      ))}

      <div style={{
        position: 'fixed',
        left: '50px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              border: '2px solid #f8ad40',
              backgroundColor: currentSection === index ? '#f8ad40' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0
            }}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {showScrollHint && (
        <div style={{
          position: 'fixed',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: 'rgba(0,0,0,0.75)',
          border: '1px solid rgba(248,173,64,0.4)',
          borderRadius: '8px',
          padding: '12px 28px',
          color: '#f8ad40',
          fontFamily: 'Jura, sans-serif',
          fontSize: '16px',
          fontWeight: '500',
          letterSpacing: '1px',
          animation: 'fadeUp 0.5s ease-out forwards',
          pointerEvents: 'none'
        }}>
          Scroll down to see more
        </div>
      )}
    </div>
  );
};
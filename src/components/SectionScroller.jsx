import { useState, useEffect, useRef } from 'react';

export const SectionScroller = ({ sections, isModalOpen }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lastScrollTime = useRef(Date.now());
  const touchStartY = useRef(0);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isModalOpen) return;

      e.preventDefault();

      if (isTransitioning) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 1500) return;

      lastScrollTime.current = now;
      setIsTransitioning(true);

      if (e.deltaY > 0) {
        setCurrentSection(prev => (prev + 1) % sections.length);
      } else if (e.deltaY < 0) {
        setCurrentSection(prev => (prev - 1 + sections.length) % sections.length);
      }

      setTimeout(() => setIsTransitioning(false), 1500);
    };

    const handleTouchStart = (e) => {
      if (isModalOpen) return;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isModalOpen || isTransitioning) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 1500) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;

      if (Math.abs(diff) > 50) {
        lastScrollTime.current = now;
        setIsTransitioning(true);

        if (diff > 0) {
          setCurrentSection(prev => (prev + 1) % sections.length);
        } else {
          setCurrentSection(prev => (prev - 1 + sections.length) % sections.length);
        }

        setTimeout(() => setIsTransitioning(false), 1500);
      }
    };

    const handleKeyDown = (e) => {
      if (isModalOpen || isTransitioning) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 1500) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        lastScrollTime.current = now;
        setIsTransitioning(true);
        setCurrentSection(prev => (prev + 1) % sections.length);
        setTimeout(() => setIsTransitioning(false), 1500);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        lastScrollTime.current = now;
        setIsTransitioning(true);
        setCurrentSection(prev => (prev - 1 + sections.length) % sections.length);
        setTimeout(() => setIsTransitioning(false), 1500);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, sections.length, isTransitioning, isModalOpen]);

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
            overflow: 'auto'
          }}
        >
          <Section />
        </div>
      ))}

      <div style={{
        position: 'fixed',
        right: '30px',
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
            onClick={() => {
              if (!isTransitioning && !isModalOpen) {
                setIsTransitioning(true);
                setCurrentSection(index);
                lastScrollTime.current = Date.now();
                setTimeout(() => setIsTransitioning(false), 1500);
              }
            }}
            style={{
              width: '12px',
              height: '12px',
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
    </div>
  );
};
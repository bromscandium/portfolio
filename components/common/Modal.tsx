import { useEffect, useState, type ReactNode } from 'react';

interface Props {
  onClose: () => void;
  panelClassName?: string;
  z?: number;
  backdropClass?: string;
  closeOnBackdrop?: boolean;
  escAllowed?: () => boolean;
  children: ReactNode | ((close: () => void) => ReactNode);
}

export const Modal = ({
  onClose,
  panelClassName = '',
  z = 300,
  backdropClass = 'bg-black/[.82]',
  closeOnBackdrop = true,
  escAllowed,
  children,
}: Props) => {
  const [closing, setClosing] = useState(false);

  const close = () => {
    setClosing(true);
    setTimeout(onClose, 200);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (!escAllowed || escAllowed())) {
        e.preventDefault();
        e.stopPropagation();
        close();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      onClick={closeOnBackdrop ? close : undefined}
      className={`fixed inset-0 flex items-center justify-center p-5 ${backdropClass}`}
      style={{ zIndex: z, animation: closing ? 'fadeOutM .2s ease forwards' : 'overlayIn .18s ease forwards' }}
    >
      <div onClick={stop} className={panelClassName} style={{ animation: closing ? 'fadeOutM .2s ease forwards' : 'modalPop .22s ease-out forwards' }}>
        {typeof children === 'function' ? children(close) : children}
      </div>
    </div>
  );
};

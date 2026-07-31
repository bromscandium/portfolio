import type { Combo } from '@/lib/i18n';
import { MODE_META, splitCombo } from '@/lib/modes';
import { useState } from 'react';

interface Props {
  combo: Combo;
  active: boolean;
  label: string;
  isLast: boolean;
  onSelect: (t: Combo) => void;
  onConfirmClose: (t: Combo) => void;
  onActivateNeighbor: (t: Combo) => void;
  onRemove: (t: Combo) => void;
  onDragStart: (t: Combo) => void;
  onDragOver: (t: Combo) => void;
  onDragEnd: () => void;
}

export const Tab = ({ combo, active, label, isLast, onSelect, onConfirmClose, onActivateNeighbor, onRemove, onDragStart, onDragOver, onDragEnd }: Props) => {
  const [closing, setClosing] = useState(false);
  const select = () => onSelect(combo);

  const doClose = () => {
    if (closing) return;
    if (isLast) return onConfirmClose(combo);
    onActivateNeighbor(combo);
    setClosing(true);
    setTimeout(() => onRemove(combo), 230);
  };

  const middleClose = (e: React.MouseEvent) => {
    if (e.button !== 1) return;
    e.preventDefault();
    e.stopPropagation();
    doClose();
  };

  const dragStart = (e: React.DragEvent) => {
    onDragStart(combo);
    e.dataTransfer.effectAllowed = 'move';
  };

  const dragOver = (e: React.DragEvent) => {
    e.preventDefault();
    onDragOver(combo);
  };

  const preventDrop = (e: React.DragEvent) => e.preventDefault();

  const close = (e: React.MouseEvent) => {
    e.stopPropagation();
    doClose();
  };

  return (
    <div
      onClick={select}
      onMouseDown={middleClose}
      draggable
      onDragStart={dragStart}
      onDragOver={dragOver}
      onDrop={preventDrop}
      onDragEnd={onDragEnd}
      className={`mt-1 flex w-55 min-w-16 shrink cursor-pointer items-center gap-2.5 overflow-hidden whitespace-nowrap rounded-t-card border-black px-4 text-[12px] md:shrink-0 ${active ? 'border-r' : 'border-x'}`}
      style={{
        background: active ? '#0c0c0c' : '#131313',
        color: active ? '#bbb' : '#666',
        boxShadow: active ? 'inset 0 2px 0 rgba(248,173,64,.5)' : 'none',
        animation: closing ? 'tabOut .23s ease-in forwards' : 'tabIn .28s ease-out',
        pointerEvents: closing ? 'none' : undefined,
      }}
    >
      <span className="text-orange">{MODE_META[splitCombo(combo)[0]].icon}</span>
      <span className="truncate" style={{ animation: closing ? undefined : 'tabLabelIn .32s ease .1s both' }}>
        {label}
      </span>
      <span onClick={close} className="ml-auto cursor-pointer text-fg-6 transition-colors hover:text-fg">
        ✕
      </span>
    </div>
  );
};
